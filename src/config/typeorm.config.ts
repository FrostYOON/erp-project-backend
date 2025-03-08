import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DbConfigService } from './db/config.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

// 환경 변수 로드
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}.local` });
dotenv.config({ path: `.env.${nodeEnv}` });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// 설정 서비스 생성
const dbConfigService = new DbConfigService(new ConfigService());

const entities = [join(__dirname, '../**/*.entity.{js,ts}')];
const migrations = [join(__dirname, '../migrations/*.{js,ts}')];

// 데이터 소스 설정
export const typeOrmConfig = new DataSource({
  type: 'postgres', // 또는 사용 중인 DB 타입
  host: dbConfigService.dbHost,
  port: dbConfigService.dbPort,
  username: dbConfigService.dbUsername,
  password: dbConfigService.dbPassword,
  database: dbConfigService.dbName,
  entities,
  migrations,
  synchronize: dbConfigService.dbSynchronize,
  logging: dbConfigService.dbLogging,
});
