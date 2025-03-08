import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService } from './config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // 환경별 개인 설정 (git에 포함되지 않음)
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        // 환경별 기본 설정 (git에 포함)
        `.env.${process.env.NODE_ENV || 'development'}`,
        // 모든 환경의 개인 설정 (git에 포함되지 않음)
        '.env.local',
        // 모든 환경의 기본 설정 (git에 포함되지 않음)
        '.env',
      ],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SYNCHRONIZE: Joi.boolean().required(),
      }),
    }),
  ],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
