import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserSession } from '../users/entities/user-session.entity';
import { UserSecurity } from '../users/entities/user-security.entity';
import { LoginDto, RefreshTokenDto } from './dto/create-auth.dto';
import { AuthResponseDto, TokenResponseDto } from './dto/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { comparePassword } from '../../common/utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>,
    @InjectRepository(UserSecurity)
    private userSecurityRepository: Repository<UserSecurity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * 사용자 로그인
   * @param loginDto 로그인 DTO
   * @returns 인증 응답 DTO
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    // 토큰 생성
    const tokens = await this.generateTokens(user);

    // 세션 저장
    await this.saveSession(user.id, tokens.refreshToken);

    // 마지막 로그인 정보 업데이트
    await this.updateLastLogin(user.id);

    // 응답 생성
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: parseInt(
        this.configService.get<string>('JWT_EXPIRES_IN') || '86400',
      ),
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.firstName + ' ' + user.profile?.lastName || '',
        roles: user.roles?.map((role) => role.name) || [],
      },
    };
  }

  /**
   * 토큰 갱신
   * @param refreshTokenDto 리프레시 토큰 DTO
   * @returns 토큰 응답 DTO
   */
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    // 리프레시 토큰 검증
    const session = await this.userSessionRepository.findOne({
      where: { token: refreshTokenDto.refreshToken, isValid: true },
      relations: ['user', 'user.roles'],
    });

    if (!session || new Date() > session.expiresAt) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    // 새 토큰 생성
    const tokens = await this.generateTokens(session.user);

    // 기존 세션 무효화
    await this.invalidateSession(session.id);

    // 새 세션 저장
    await this.saveSession(session.user.id, tokens.refreshToken);

    // 응답 생성
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: parseInt(
        this.configService.get<string>('JWT_EXPIRES_IN') || '86400',
      ),
    };
  }

  /**
   * 로그아웃
   * @param userId 사용자 ID
   * @param refreshToken 리프레시 토큰
   * @returns 성공 여부
   */
  async logout(userId: string, refreshToken: string): Promise<boolean> {
    const session = await this.userSessionRepository.findOne({
      where: { userId, token: refreshToken, isValid: true },
    });

    if (session) {
      await this.invalidateSession(session.id);
    }

    return true;
  }

  /**
   * 사용자 인증 검증
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 검증된 사용자 정보
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'profile', 'security'],
    });

    if (!user) {
      return null;
    }

    // 비밀번호 검증 - 유틸리티 함수 사용
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      // 로그인 실패 횟수 증가
      if (user.security) {
        user.security.failedLoginAttempts += 1;
        await this.userSecurityRepository.save(user.security);
      }
      return null;
    }

    // 로그인 실패 횟수 초기화
    if (user.security) {
      user.security.failedLoginAttempts = 0;
      await this.userSecurityRepository.save(user.security);
    }

    // 비밀번호 제외하고 반환
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * 토큰 생성
   * @param user 사용자 정보
   * @returns 액세스 토큰과 리프레시 토큰
   */
  private async generateTokens(user: any) {
    const payload = { email: user.email, sub: user.id };

    // 액세스 토큰 옵션
    const accessTokenOptions = {
      expiresIn:
        this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m',
      issuer: this.configService.get<string>('JWT_ISSUER') || 'nestjs-api',
      audience: this.configService.get<string>('JWT_AUDIENCE') || 'user',
    };

    // 리프레시 토큰 옵션
    const refreshTokenOptions = {
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
      issuer: this.configService.get<string>('JWT_ISSUER') || 'nestjs-api',
    };

    // 토큰 생성
    const accessToken = this.jwtService.sign(payload, accessTokenOptions);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);

    // 리프레시 토큰 저장
    await this.saveSession(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * 세션 저장
   * @param userId 사용자 ID
   * @param token 리프레시 토큰
   */
  private async saveSession(userId: string, token: string) {
    const expiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
    const expiresInMs = expiresIn.endsWith('d')
      ? parseInt(expiresIn) * 24 * 60 * 60 * 1000
      : parseInt(expiresIn) * 1000;

    const session = this.userSessionRepository.create({
      userId,
      token,
      expiresAt: new Date(Date.now() + expiresInMs),
      ipAddress: '127.0.0.1', // 실제 구현에서는 요청의 IP 주소를 사용
      userAgent: 'Unknown', // 실제 구현에서는 요청의 User-Agent를 사용
      isValid: true,
    });

    await this.userSessionRepository.save(session);
  }

  /**
   * 세션 무효화
   * @param sessionId 세션 ID
   */
  private async invalidateSession(sessionId: string) {
    await this.userSessionRepository.update(sessionId, { isValid: false });
  }

  /**
   * 마지막 로그인 정보 업데이트
   * @param userId 사용자 ID
   */
  private async updateLastLogin(userId: string) {
    const security = await this.userSecurityRepository.findOne({
      where: { userId },
    });

    if (security) {
      security.lastLoginAt = new Date();
      security.lastLoginIp = '127.0.0.1'; // 실제 구현에서는 요청의 IP 주소를 사용
      await this.userSecurityRepository.save(security);
    }
  }
}
