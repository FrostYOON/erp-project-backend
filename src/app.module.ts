import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { HrModule } from './modules/hr/hr.module';
import { FinanceModule } from './modules/finance/finance.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { SalesModule } from './modules/sales/sales.module';
import { ProjectModule } from './modules/project/project.module';
import { ManufacturingModule } from './modules/manufacturing/manufacturing.module';
import { CrmModule } from './modules/crm/crm.module';
import { DocumentModule } from './modules/document/document.module';
import { AssetModule } from './modules/asset/asset.module';
import { QualityModule } from './modules/quality/quality.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env.local',
        '.env',
      ],
    }),
    TypeOrmModule.forRoot(typeOrmConfig.options),
    AuthModule,
    UsersModule,
    RolesModule,
    FilesModule,
    OrganizationModule,
    HrModule,
    FinanceModule,
    InventoryModule,
    ProcurementModule,
    SalesModule,
    ProjectModule,
    ManufacturingModule,
    CrmModule,
    DocumentModule,
    AssetModule,
    QualityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 전역 JWT 인증 가드 설정
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 전역 역할 기반 접근 제어 가드 설정
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
