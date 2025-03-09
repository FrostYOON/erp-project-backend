import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';

import { User } from '../users/entities/user.entity';
import { UserSession } from '../users/entities/user-session.entity';
import { UserSecurity } from '../users/entities/user-security.entity';

/**
 * 인증 모듈
 * 인증 관련 기능을 제공하는 모듈입니다.
 */
@Module({
  imports: [
    // 사용자 모듈 가져오기
    UsersModule,

    // Passport 모듈 설정
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JWT 모듈 설정
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
        },
      }),
    }),

    // TypeORM 엔티티 등록
    TypeOrmModule.forFeature([User, UserSession, UserSecurity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
