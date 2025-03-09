import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponseDto, TokenResponseDto } from './dto/auth-response.dto';
import { UsersService } from '../users/users.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

/**
 * 인증 컨트롤러
 * 인증 관련 API 엔드포인트를 처리합니다.
 */
@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * 로그인 API
   * @param loginDto 로그인 DTO
   * @returns 인증 응답 DTO
   */
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Body() loginDto: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  /**
   * 회원가입 API
   * @param registerDto 회원가입 DTO
   * @returns 인증 응답 DTO
   */
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자 계정을 생성합니다.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    // UserService를 통해 사용자 생성
    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      profile: {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phoneNumber: registerDto.phoneNumber,
      },
      preferences: {
        agreeToTerms: registerDto.agreeToTerms,
        subscribeToNewsletter: registerDto.subscribeToNewsletter,
      },
    });

    // 생성된 사용자로 로그인 처리
    return this.authService.login({
      email: registerDto.email,
      password: registerDto.password,
    });
  }

  /**
   * 토큰 갱신 API
   * @param refreshTokenDto 리프레시 토큰 DTO
   * @returns 토큰 응답 DTO
   */
  @ApiOperation({
    summary: '토큰 갱신',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: '토큰 갱신 성공',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  /**
   * 로그아웃 API
   * @param user 현재 사용자
   * @param body 리프레시 토큰
   * @returns 로그아웃 성공 여부
   */
  @ApiOperation({
    summary: '로그아웃',
    description: '현재 사용자의 세션을 종료합니다.',
  })
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
    schema: { properties: { success: { type: 'boolean' } } },
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CurrentUser() user: User,
    @Body() body: { refreshToken: string },
  ): Promise<{ success: boolean }> {
    const result = await this.authService.logout(user.id, body.refreshToken);
    return { success: result };
  }

  /**
   * 프로필 조회 API
   * @param user 현재 사용자
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: '프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
