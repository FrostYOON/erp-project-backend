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
    UsersModule,
    RolesModule,
    OrganizationModule,
    HrModule,
    FinanceModule,
    InventoryModule,
    ProcurementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
