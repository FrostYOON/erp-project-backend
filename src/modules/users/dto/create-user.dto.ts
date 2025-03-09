import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MinLength,
} from 'class-validator';

/**
 * 사용자 생성 DTO
 */
export class CreateUserDto {
  /**
   * 사용자 이메일
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * 사용자 비밀번호
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  /**
   * 사용자 프로필 정보
   */
  @IsOptional()
  profile?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  };

  /**
   * 사용자 환경설정
   */
  @IsOptional()
  preferences?: {
    agreeToTerms?: boolean;
    subscribeToNewsletter?: boolean;
  };

  /**
   * 사용자 역할 ID 목록
   */
  @IsOptional()
  roleIds?: string[];
}
