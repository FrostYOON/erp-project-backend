import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManufacturingCreateAllTables1741454526097
  implements MigrationInterface
{
  name = 'ManufacturingCreateAllTables1741454526097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "work_centers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "departmentId" uuid, "location" character varying, "isActive" boolean NOT NULL DEFAULT true, "workHoursPerDay" double precision NOT NULL DEFAULT '8', "workDaysPerWeek" integer NOT NULL DEFAULT '5', "capacityPerHour" double precision, "capacityUnit" character varying, "costPerHour" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "notes" character varying, "tags" json, CONSTRAINT "UQ_5e7628bc8644765564ee02db15a" UNIQUE ("code"), CONSTRAINT "PK_efd461c689b6b2894c3ab1c930a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_stations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "workCenterId" uuid NOT NULL, "location" character varying, "isActive" boolean NOT NULL DEFAULT true, "capacityPerHour" double precision, "capacityUnit" character varying, "costPerHour" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "equipment" character varying, "notes" character varying, "tags" json, CONSTRAINT "UQ_981b0949d49c87032c2579fdde3" UNIQUE ("code"), CONSTRAINT "PK_28325776b4d1dbfc247f36b61d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bom_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "bomId" uuid NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "scrapPercentage" double precision NOT NULL DEFAULT '0', "description" character varying, "position" character varying, "isSubstitutable" boolean NOT NULL DEFAULT false, "substituteProductIds" json, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_f88a851d4f3c46533a354229e15" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."boms_status_enum" AS ENUM('draft', 'active', 'obsolete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "boms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "status" "public"."boms_status_enum" NOT NULL DEFAULT 'draft', "productId" uuid NOT NULL, "version" character varying NOT NULL DEFAULT '1.0', "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "effectiveStartDate" date NOT NULL, "effectiveEndDate" date, "quantity" double precision NOT NULL DEFAULT '1', "notes" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_b493864434cf7f0fc1560eb8082" UNIQUE ("code"), CONSTRAINT "PK_59659fde3f22d3869fee0f78822" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "routing_operations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "routingId" uuid NOT NULL, "operationNumber" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "workCenterId" uuid NOT NULL, "workStationId" uuid, "sequence" integer NOT NULL, "setupTime" double precision NOT NULL DEFAULT '0', "operationTime" double precision NOT NULL DEFAULT '0', "waitTime" double precision NOT NULL DEFAULT '0', "moveTime" double precision NOT NULL DEFAULT '0', "instructions" text, "requiresInspection" boolean NOT NULL DEFAULT false, "inspectionInstructions" text, "requiredSkills" character varying, "requiredTools" character varying, "notes" character varying, "attachments" json, CONSTRAINT "PK_f462c7607db9899f203f4d68064" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."routings_status_enum" AS ENUM('draft', 'active', 'obsolete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "routings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "status" "public"."routings_status_enum" NOT NULL DEFAULT 'draft', "productId" uuid NOT NULL, "version" character varying NOT NULL DEFAULT '1.0', "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "effectiveStartDate" date NOT NULL, "effectiveEndDate" date, "quantity" double precision NOT NULL DEFAULT '1', "totalOperationTime" double precision NOT NULL DEFAULT '0', "totalSetupTime" double precision NOT NULL DEFAULT '0', "notes" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_ee8bc199cb38bd92fee46cae65e" UNIQUE ("code"), CONSTRAINT "PK_4d414cfafdc1d9a189a9989e30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."production_orders_status_enum" AS ENUM('draft', 'planned', 'released', 'inProgress', 'completed', 'closed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."production_orders_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "production_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "status" "public"."production_orders_status_enum" NOT NULL DEFAULT 'draft', "priority" "public"."production_orders_priority_enum" NOT NULL DEFAULT 'medium', "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "plannedQuantity" double precision NOT NULL, "producedQuantity" double precision NOT NULL DEFAULT '0', "rejectedQuantity" double precision NOT NULL DEFAULT '0', "bomId" uuid NOT NULL, "routingId" uuid NOT NULL, "salesOrderId" uuid, "warehouseId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "plannedStartDate" date NOT NULL, "plannedEndDate" date NOT NULL, "actualStartDate" date, "actualEndDate" date, "estimatedCost" numeric(15,2) NOT NULL DEFAULT '0', "actualCost" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "notes" text, "tags" json, "attachments" json, CONSTRAINT "UQ_95941cd3171ce211861f673f80d" UNIQUE ("number"), CONSTRAINT "PK_44d72e026027e3448b5d655e16e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."work_order_operations_status_enum" AS ENUM('pending', 'inProgress', 'completed', 'paused', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_order_operations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workOrderId" uuid NOT NULL, "operationNumber" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "status" "public"."work_order_operations_status_enum" NOT NULL DEFAULT 'pending', "sequence" integer NOT NULL, "assignedToUserId" uuid, "plannedStartDate" date, "plannedEndDate" date, "actualStartDate" date, "actualEndDate" date, "plannedSetupTime" double precision NOT NULL DEFAULT '0', "actualSetupTime" double precision NOT NULL DEFAULT '0', "plannedOperationTime" double precision NOT NULL DEFAULT '0', "actualOperationTime" double precision NOT NULL DEFAULT '0', "instructions" text, "notes" text, "attachments" json, CONSTRAINT "PK_8610d0dbf2b2145d9933bad5263" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."work_orders_status_enum" AS ENUM('planned', 'released', 'inProgress', 'completed', 'closed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "status" "public"."work_orders_status_enum" NOT NULL DEFAULT 'planned', "productionOrderId" uuid NOT NULL, "routingOperationId" uuid NOT NULL, "workCenterId" uuid NOT NULL, "workStationId" uuid, "assignedToUserId" uuid, "plannedStartDate" date NOT NULL, "plannedEndDate" date NOT NULL, "actualStartDate" date, "actualEndDate" date, "plannedSetupTime" double precision NOT NULL DEFAULT '0', "actualSetupTime" double precision NOT NULL DEFAULT '0', "plannedOperationTime" double precision NOT NULL DEFAULT '0', "actualOperationTime" double precision NOT NULL DEFAULT '0', "plannedQuantity" double precision NOT NULL, "completedQuantity" double precision NOT NULL DEFAULT '0', "rejectedQuantity" double precision NOT NULL DEFAULT '0', "instructions" text, "notes" text, "attachments" json, CONSTRAINT "UQ_220071f1ff980b208220860c176" UNIQUE ("number"), CONSTRAINT "PK_29f6c1884082ee6f535aed93660" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspection_items_result_enum" AS ENUM('pending', 'passed', 'failed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_inspection_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "qualityInspectionId" uuid NOT NULL, "name" character varying NOT NULL, "description" text, "inspectionMethod" character varying, "minValue" double precision, "maxValue" double precision, "targetValue" double precision, "measuredValue" double precision, "unit" character varying, "result" "public"."quality_inspection_items_result_enum" NOT NULL DEFAULT 'pending', "resultNotes" text, "correctiveActions" text, "sequence" integer NOT NULL DEFAULT '0', "isMandatory" boolean NOT NULL DEFAULT true, "attachments" json, CONSTRAINT "PK_e9e0ddd824b566d2beac45c9b78" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_type_enum" AS ENUM('incoming', 'inProcess', 'final', 'outgoing')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_result_enum" AS ENUM('pending', 'passed', 'failed', 'conditionallyPassed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_inspections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "type" "public"."quality_inspections_type_enum" NOT NULL, "status" "public"."quality_inspections_status_enum" NOT NULL DEFAULT 'planned', "result" "public"."quality_inspections_result_enum" NOT NULL DEFAULT 'pending', "productId" uuid NOT NULL, "productionOrderId" uuid, "workOrderId" uuid, "inspectionQuantity" double precision NOT NULL, "passedQuantity" double precision NOT NULL DEFAULT '0', "failedQuantity" double precision NOT NULL DEFAULT '0', "inspectedByUserId" uuid NOT NULL, "plannedInspectionDate" date NOT NULL, "actualInspectionDate" date, "resultSummary" text, "correctiveActions" text, "notes" text, "attachments" json, CONSTRAINT "UQ_e01e2b12fc35ec2414c5e5c9d80" UNIQUE ("number"), CONSTRAINT "PK_95d9caed0d2abaff779a8fd4300" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_centers" ADD CONSTRAINT "FK_cf46fc48093ffad427314d7f6e8" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_stations" ADD CONSTRAINT "FK_50734a4730ce43fbc280fc58f9a" FOREIGN KEY ("workCenterId") REFERENCES "work_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" ADD CONSTRAINT "FK_43b33894ec24ad195df83376d5f" FOREIGN KEY ("bomId") REFERENCES "boms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" ADD CONSTRAINT "FK_1cc39cd1d3b9e8020a8de5dd0be" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" ADD CONSTRAINT "FK_08457dc4a809ab6c9bcde8de793" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" ADD CONSTRAINT "FK_aa572bae154904a33a982c0a539" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" ADD CONSTRAINT "FK_a7825faed1425bb34fa1b5b948b" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" ADD CONSTRAINT "FK_951e679ebf36d1964564c9119c0" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" ADD CONSTRAINT "FK_ac3b091b72dc57c59845bc0542b" FOREIGN KEY ("routingId") REFERENCES "routings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" ADD CONSTRAINT "FK_75dcf9dfcd3b17a88b4e8576a1e" FOREIGN KEY ("workCenterId") REFERENCES "work_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" ADD CONSTRAINT "FK_e8a8b73c97a694686b67ddf2a73" FOREIGN KEY ("workStationId") REFERENCES "work_stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" ADD CONSTRAINT "FK_82efe6ec1d41ecede7de496c5de" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" ADD CONSTRAINT "FK_94c461f932ea1c3a2a3013c219d" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" ADD CONSTRAINT "FK_27547b0180278c841ddc9b5745b" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_8584be8f232016b2c24a4e12589" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_8b948a981f6062d74d5de3624db" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_e01ab106eaf872aef04cddc858e" FOREIGN KEY ("bomId") REFERENCES "boms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_48d98f087c541728e89af61a019" FOREIGN KEY ("routingId") REFERENCES "routings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_1fc7b0bbd091048ef393ffbd73d" FOREIGN KEY ("salesOrderId") REFERENCES "sales_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_99e1c4fbdc4c2ad3834fa2ad5dd" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_9087bb3618a80a40b6f3f5c676c" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" ADD CONSTRAINT "FK_fad68107b556a5548805d6d4e0d" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_order_operations" ADD CONSTRAINT "FK_0669fdfc8d8c6f0a62a17e3316c" FOREIGN KEY ("workOrderId") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_order_operations" ADD CONSTRAINT "FK_2a54c3d961430c61ea247e220a8" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" ADD CONSTRAINT "FK_b3c6da5a81db1b91122a492c01f" FOREIGN KEY ("productionOrderId") REFERENCES "production_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" ADD CONSTRAINT "FK_82b86aad5ccb9b17650e2a03227" FOREIGN KEY ("routingOperationId") REFERENCES "routing_operations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" ADD CONSTRAINT "FK_b9c1a1105aa48ffe2ca31811d1b" FOREIGN KEY ("workCenterId") REFERENCES "work_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" ADD CONSTRAINT "FK_0cf811ae12df1856d5aeab07d1b" FOREIGN KEY ("workStationId") REFERENCES "work_stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" ADD CONSTRAINT "FK_ef54a3394c7ddcc197f21e9d360" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspection_items" ADD CONSTRAINT "FK_904b785add547a123e4d046c85d" FOREIGN KEY ("qualityInspectionId") REFERENCES "quality_inspections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_c2db54dc6c1d55827f2370e40cb" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_5771a300d03069e77cce8582636" FOREIGN KEY ("productionOrderId") REFERENCES "production_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_18eeb740be4f78357369f9f5f7b" FOREIGN KEY ("workOrderId") REFERENCES "work_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_30105502e7561b7336524d7dcdb" FOREIGN KEY ("inspectedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_30105502e7561b7336524d7dcdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_18eeb740be4f78357369f9f5f7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_5771a300d03069e77cce8582636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_c2db54dc6c1d55827f2370e40cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspection_items" DROP CONSTRAINT "FK_904b785add547a123e4d046c85d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" DROP CONSTRAINT "FK_ef54a3394c7ddcc197f21e9d360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" DROP CONSTRAINT "FK_0cf811ae12df1856d5aeab07d1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" DROP CONSTRAINT "FK_b9c1a1105aa48ffe2ca31811d1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" DROP CONSTRAINT "FK_82b86aad5ccb9b17650e2a03227"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_orders" DROP CONSTRAINT "FK_b3c6da5a81db1b91122a492c01f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_order_operations" DROP CONSTRAINT "FK_2a54c3d961430c61ea247e220a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_order_operations" DROP CONSTRAINT "FK_0669fdfc8d8c6f0a62a17e3316c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_fad68107b556a5548805d6d4e0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_9087bb3618a80a40b6f3f5c676c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_99e1c4fbdc4c2ad3834fa2ad5dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_1fc7b0bbd091048ef393ffbd73d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_48d98f087c541728e89af61a019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_e01ab106eaf872aef04cddc858e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_8b948a981f6062d74d5de3624db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "production_orders" DROP CONSTRAINT "FK_8584be8f232016b2c24a4e12589"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" DROP CONSTRAINT "FK_27547b0180278c841ddc9b5745b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" DROP CONSTRAINT "FK_94c461f932ea1c3a2a3013c219d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routings" DROP CONSTRAINT "FK_82efe6ec1d41ecede7de496c5de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" DROP CONSTRAINT "FK_e8a8b73c97a694686b67ddf2a73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" DROP CONSTRAINT "FK_75dcf9dfcd3b17a88b4e8576a1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routing_operations" DROP CONSTRAINT "FK_ac3b091b72dc57c59845bc0542b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" DROP CONSTRAINT "FK_951e679ebf36d1964564c9119c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" DROP CONSTRAINT "FK_a7825faed1425bb34fa1b5b948b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boms" DROP CONSTRAINT "FK_aa572bae154904a33a982c0a539"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" DROP CONSTRAINT "FK_08457dc4a809ab6c9bcde8de793"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" DROP CONSTRAINT "FK_1cc39cd1d3b9e8020a8de5dd0be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bom_items" DROP CONSTRAINT "FK_43b33894ec24ad195df83376d5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_stations" DROP CONSTRAINT "FK_50734a4730ce43fbc280fc58f9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_centers" DROP CONSTRAINT "FK_cf46fc48093ffad427314d7f6e8"`,
    );
    await queryRunner.query(`DROP TABLE "quality_inspections"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_result_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "quality_inspection_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspection_items_result_enum"`,
    );
    await queryRunner.query(`DROP TABLE "work_orders"`);
    await queryRunner.query(`DROP TYPE "public"."work_orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "work_order_operations"`);
    await queryRunner.query(
      `DROP TYPE "public"."work_order_operations_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "production_orders"`);
    await queryRunner.query(
      `DROP TYPE "public"."production_orders_priority_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."production_orders_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "routings"`);
    await queryRunner.query(`DROP TYPE "public"."routings_status_enum"`);
    await queryRunner.query(`DROP TABLE "routing_operations"`);
    await queryRunner.query(`DROP TABLE "boms"`);
    await queryRunner.query(`DROP TYPE "public"."boms_status_enum"`);
    await queryRunner.query(`DROP TABLE "bom_items"`);
    await queryRunner.query(`DROP TABLE "work_stations"`);
    await queryRunner.query(`DROP TABLE "work_centers"`);
  }
}
