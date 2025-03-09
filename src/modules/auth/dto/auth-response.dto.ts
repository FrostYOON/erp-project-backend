import { ApiProperty } from '@nestjs/swagger';

/**
 * 토큰 응답 DTO
 */
export class TokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: '액세스 토큰',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: '리프레시 토큰',
  })
  refreshToken: string;

  @ApiProperty({ example: 'Bearer', description: '토큰 타입', required: false })
  tokenType?: string;

  @ApiProperty({
    example: 3600,
    description: '토큰 만료 시간(초)',
    required: false,
  })
  expiresIn?: number;
}

/**
 * 인증 응답 DTO
 */
export class AuthResponseDto extends TokenResponseDto {
  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'user@example.com',
      name: 'John Doe',
      roles: ['user'],
    },
    description: '사용자 정보',
  })
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
}
