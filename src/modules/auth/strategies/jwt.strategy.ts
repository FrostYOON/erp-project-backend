import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * JWT 페이로드 인터페이스
 */
interface JwtPayload {
  sub: string;
  email: string;
}

/**
 * JWT 인증 전략
 * JWT 토큰을 검증하고 사용자 정보를 추출하는 전략입니다.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
      issuer: configService.get<string>('JWT_ISSUER') || 'nestjs-api',
      audience: configService.get<string>('JWT_AUDIENCE') || 'user',
    });
  }

  /**
   * JWT 토큰 검증 후 호출되는 메서드
   * @param payload JWT 페이로드
   * @returns 인증된 사용자 정보
   */
  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 사용자 정보에서 민감한 정보 제거
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
