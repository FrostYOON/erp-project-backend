import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 인증 생성 기본 DTO
 */
export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: '사용자 비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * 로그인 DTO
 */
export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password1!', description: '사용자 비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * 회원가입 DTO
 */
export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password1!',
    description:
      '사용자 비밀번호 (최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John', description: '사용자 이름' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: '사용자 성' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '사용자 전화번호',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: true,
    description: '이용약관 동의 여부',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  agreeToTerms?: boolean = false;

  @ApiProperty({
    example: false,
    description: '뉴스레터 구독 여부',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  subscribeToNewsletter?: boolean = false;
}

/**
 * 토큰 갱신 DTO
 */
export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: '리프레시 토큰',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
