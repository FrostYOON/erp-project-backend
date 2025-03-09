import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 프로필 업데이트 DTO
 */
export class UpdateProfileDto {
  @ApiProperty({ example: 'John', description: '이름', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: '성', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
    required: false,
  })
  @IsPhoneNumber('KR')
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: '생년월일 (YYYY-MM-DD)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '프로필 이미지 URL',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty({
    example: '서울시 강남구',
    description: '주소',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ example: '개발자', description: '직업', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  occupation?: string;

  @ApiProperty({
    example: '안녕하세요, 저는 개발자입니다.',
    description: '자기소개',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;
}
