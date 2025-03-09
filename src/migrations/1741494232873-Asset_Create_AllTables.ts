import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssetCreateAllTables1741494232873 implements MigrationInterface {
  name = 'AssetCreateAllTables1741494232873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "parentId" uuid, "depreciationMethod" character varying, "defaultLifespan" integer, "defaultResidualRate" double precision, "sortOrder" integer NOT NULL DEFAULT '0', "icon" character varying, "colorCode" character varying, "isActive" boolean NOT NULL DEFAULT true, "tags" json, CONSTRAINT "UQ_2787593ee8afad9f185bdf3f472" UNIQUE ("code"), CONSTRAINT "PK_d21442187e7b0237566389805a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "parentId" uuid, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "latitude" double precision, "longitude" double precision, "building" character varying, "floor" character varying, "room" character varying, "sortOrder" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "tags" json, CONSTRAINT "UQ_20e5e2e28c9ac9eb5016eeff2c3" UNIQUE ("code"), CONSTRAINT "PK_46ae4382ba27cc95e93b0517cdb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_statuses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "colorCode" character varying, "icon" character varying, "sortOrder" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "isUsable" boolean NOT NULL DEFAULT true, "needsMaintenance" boolean NOT NULL DEFAULT false, "tags" json, CONSTRAINT "UQ_7e3b79b0f32c052a76d4c3b9561" UNIQUE ("code"), CONSTRAINT "PK_dae2d3d501cc6eb234554f3763e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_maintenances_type_enum" AS ENUM('preventive', 'corrective', 'predictive', 'inspection', 'calibration', 'upgrade', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_maintenances_status_enum" AS ENUM('scheduled', 'inProgress', 'completed', 'cancelled', 'deferred')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_maintenances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."asset_maintenances_type_enum" NOT NULL DEFAULT 'preventive', "status" "public"."asset_maintenances_status_enum" NOT NULL DEFAULT 'scheduled', "assignedToUserId" uuid, "performedByUserId" uuid, "scheduledDate" date NOT NULL, "startDate" date, "completionDate" date, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "supplier" character varying, "orderNumber" character varying, "result" text, "nextMaintenanceDate" date, "notes" text, "attachments" json, CONSTRAINT "PK_6af14ce16fe98b64069ab12a3d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_depreciations_method_enum" AS ENUM('straightLine', 'decliningBalance', 'sumOfYearsDigits', 'unitsOfProduction', 'custom')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_depreciations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "period" character varying NOT NULL, "method" "public"."asset_depreciations_method_enum" NOT NULL DEFAULT 'straightLine', "startDate" date NOT NULL, "endDate" date NOT NULL, "initialValue" numeric(15,2) NOT NULL, "residualValue" numeric(15,2) NOT NULL, "depreciationAmount" numeric(15,2) NOT NULL, "accumulatedDepreciation" numeric(15,2) NOT NULL, "bookValue" numeric(15,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'KRW', "calculatedByUserId" uuid NOT NULL, "calculationDate" date NOT NULL, "notes" text, "attachments" json, CONSTRAINT "PK_883381751d81a7a81933910d46a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_assignments_type_enum" AS ENUM('user', 'department', 'project', 'location', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_assignments_status_enum" AS ENUM('pending', 'active', 'returned', 'overdue', 'lost', 'damaged')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "type" "public"."asset_assignments_type_enum" NOT NULL DEFAULT 'user', "status" "public"."asset_assignments_status_enum" NOT NULL DEFAULT 'pending', "assignedToUserId" uuid, "assignedToDepartmentId" uuid, "assignedToProjectId" character varying, "assignedToLocation" character varying, "assignedToOther" character varying, "assignedByUserId" uuid NOT NULL, "assignedDate" date NOT NULL, "expectedReturnDate" date, "actualReturnDate" date, "returnedToUserId" uuid, "returnCondition" character varying, "notes" text, "attachments" json, CONSTRAINT "PK_20629cd9ab403e64604ce5e36b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "componentAssetId" uuid, "name" character varying NOT NULL, "description" text, "quantity" integer NOT NULL DEFAULT '1', "serialNumber" character varying, "model" character varying, "manufacturer" character varying, "installationDate" date, "warrantyEndDate" date, "replacementCycle" integer, "nextReplacementDate" date, "price" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "importance" integer NOT NULL DEFAULT '0', "status" character varying, "notes" text, "attachments" json, CONSTRAINT "PK_c62beff90e6cad5acf4e4147ec0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_attachments_type_enum" AS ENUM('image', 'document', 'invoice', 'warranty', 'manual', 'contract', 'certificate', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."asset_attachments_type_enum" NOT NULL DEFAULT 'other', "fileName" character varying NOT NULL, "fileSize" bigint NOT NULL, "fileType" character varying NOT NULL, "fileExtension" character varying NOT NULL, "fileUrl" character varying NOT NULL, "thumbnailUrl" character varying, "uploadedByUserId" uuid NOT NULL, "tags" json, CONSTRAINT "PK_ac587667d0c92f005540a811a98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assets_type_enum" AS ENUM('tangible', 'intangible', 'digital', 'software', 'license', 'component')`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "type" "public"."assets_type_enum" NOT NULL DEFAULT 'tangible', "categoryId" uuid NOT NULL, "locationId" uuid NOT NULL, "statusId" uuid NOT NULL, "departmentId" uuid, "managerId" uuid, "manufacturer" character varying, "model" character varying, "serialNumber" character varying, "barcode" character varying, "rfidTag" character varying, "purchaseDate" date, "purchasePrice" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "supplier" character varying, "orderNumber" character varying, "warrantyStartDate" date, "warrantyEndDate" date, "lifespan" integer, "residualValue" numeric(15,2), "depreciationMethod" character varying, "currentValue" numeric(15,2), "disposalDate" date, "disposalMethod" character varying, "disposalPrice" numeric(15,2), "lastInspectionDate" date, "nextInspectionDate" date, "lastMaintenanceDate" date, "nextMaintenanceDate" date, "notes" text, "customFields" json, "tags" json, "parentAssetId" uuid, CONSTRAINT "UQ_bff60c1b89bff7edff592d85ea4" UNIQUE ("code"), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."asset_insurances_type_enum" AS ENUM('property', 'liability', 'casualty', 'comprehensive', 'specialized', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset_insurances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "assetId" uuid NOT NULL, "policyNumber" character varying NOT NULL, "provider" character varying NOT NULL, "type" "public"."asset_insurances_type_enum" NOT NULL DEFAULT 'property', "description" text, "startDate" date NOT NULL, "endDate" date NOT NULL, "renewalDate" date, "coverageAmount" numeric(15,2) NOT NULL, "premium" numeric(15,2) NOT NULL, "deductible" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "policyholder" character varying, "contactPerson" character varying, "contactPhone" character varying, "contactEmail" character varying, "managedByUserId" uuid, "notificationsEnabled" boolean NOT NULL DEFAULT true, "notificationDays" integer NOT NULL DEFAULT '30', "notes" text, "attachments" json, CONSTRAINT "PK_67be49ea3e1ab96085b64488050" PRIMARY KEY ("id"))`,
    );

    // 외래 키 제약 조건 추가
    await queryRunner.query(
      `ALTER TABLE "asset_categories" ADD CONSTRAINT "FK_asset_categories_parent" FOREIGN KEY ("parentId") REFERENCES "asset_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_locations" ADD CONSTRAINT "FK_asset_locations_parent" FOREIGN KEY ("parentId") REFERENCES "asset_locations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_category" FOREIGN KEY ("categoryId") REFERENCES "asset_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_location" FOREIGN KEY ("locationId") REFERENCES "asset_locations"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_status" FOREIGN KEY ("statusId") REFERENCES "asset_statuses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_department" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_manager" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_parent" FOREIGN KEY ("parentAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" ADD CONSTRAINT "FK_asset_maintenances_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" ADD CONSTRAINT "FK_asset_maintenances_assigned_to" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" ADD CONSTRAINT "FK_asset_maintenances_performed_by" FOREIGN KEY ("performedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_depreciations" ADD CONSTRAINT "FK_asset_depreciations_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_depreciations" ADD CONSTRAINT "FK_asset_depreciations_calculated_by" FOREIGN KEY ("calculatedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" ADD CONSTRAINT "FK_asset_assignments_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" ADD CONSTRAINT "FK_asset_assignments_assigned_to_user" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" ADD CONSTRAINT "FK_asset_assignments_assigned_to_department" FOREIGN KEY ("assignedToDepartmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" ADD CONSTRAINT "FK_asset_assignments_assigned_by" FOREIGN KEY ("assignedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" ADD CONSTRAINT "FK_asset_assignments_returned_to" FOREIGN KEY ("returnedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_components" ADD CONSTRAINT "FK_asset_components_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_components" ADD CONSTRAINT "FK_asset_components_component_asset" FOREIGN KEY ("componentAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_attachments" ADD CONSTRAINT "FK_asset_attachments_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_attachments" ADD CONSTRAINT "FK_asset_attachments_uploaded_by" FOREIGN KEY ("uploadedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_insurances" ADD CONSTRAINT "FK_asset_insurances_asset" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_insurances" ADD CONSTRAINT "FK_asset_insurances_managed_by" FOREIGN KEY ("managedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래 키 제약 조건 제거
    await queryRunner.query(
      `ALTER TABLE "asset_insurances" DROP CONSTRAINT "FK_asset_insurances_managed_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_insurances" DROP CONSTRAINT "FK_asset_insurances_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_attachments" DROP CONSTRAINT "FK_asset_attachments_uploaded_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_attachments" DROP CONSTRAINT "FK_asset_attachments_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_components" DROP CONSTRAINT "FK_asset_components_component_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_components" DROP CONSTRAINT "FK_asset_components_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" DROP CONSTRAINT "FK_asset_assignments_returned_to"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" DROP CONSTRAINT "FK_asset_assignments_assigned_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" DROP CONSTRAINT "FK_asset_assignments_assigned_to_department"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" DROP CONSTRAINT "FK_asset_assignments_assigned_to_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_assignments" DROP CONSTRAINT "FK_asset_assignments_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_depreciations" DROP CONSTRAINT "FK_asset_depreciations_calculated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_depreciations" DROP CONSTRAINT "FK_asset_depreciations_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" DROP CONSTRAINT "FK_asset_maintenances_performed_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" DROP CONSTRAINT "FK_asset_maintenances_assigned_to"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_maintenances" DROP CONSTRAINT "FK_asset_maintenances_asset"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_parent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_manager"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_department"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_assets_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_locations" DROP CONSTRAINT "FK_asset_locations_parent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset_categories" DROP CONSTRAINT "FK_asset_categories_parent"`,
    );

    // 테이블 제거
    await queryRunner.query(`DROP TABLE "asset_insurances"`);
    await queryRunner.query(`DROP TYPE "public"."asset_insurances_type_enum"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TYPE "public"."assets_type_enum"`);
    await queryRunner.query(`DROP TABLE "asset_attachments"`);
    await queryRunner.query(`DROP TYPE "public"."asset_attachments_type_enum"`);
    await queryRunner.query(`DROP TABLE "asset_components"`);
    await queryRunner.query(`DROP TABLE "asset_assignments"`);
    await queryRunner.query(
      `DROP TYPE "public"."asset_assignments_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."asset_assignments_type_enum"`);
    await queryRunner.query(`DROP TABLE "asset_depreciations"`);
    await queryRunner.query(
      `DROP TYPE "public"."asset_depreciations_method_enum"`,
    );
    await queryRunner.query(`DROP TABLE "asset_maintenances"`);
    await queryRunner.query(
      `DROP TYPE "public"."asset_maintenances_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."asset_maintenances_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "asset_statuses"`);
    await queryRunner.query(`DROP TABLE "asset_locations"`);
    await queryRunner.query(`DROP TABLE "asset_categories"`);
  }
}
