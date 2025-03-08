import { MigrationInterface, QueryRunner } from 'typeorm';

export class InventoryCreateAllTables1741452513206
  implements MigrationInterface
{
  name = 'InventoryCreateAllTables1741452513206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "code" character varying NOT NULL, "parentId" uuid, "isActive" boolean NOT NULL DEFAULT true, "imageUrl" character varying, "level" integer NOT NULL DEFAULT '1', "sortOrder" integer NOT NULL DEFAULT '0', "tags" json, CONSTRAINT "UQ_03fac833e3bd77ac88846805305" UNIQUE ("code"), CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "units_of_measure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "abbreviation" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL DEFAULT true, "isBaseUnit" boolean NOT NULL DEFAULT false, "type" character varying, "conversionFactor" double precision NOT NULL DEFAULT '1', CONSTRAINT "PK_ce93a9c86be10704b5415ca4bee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_type_enum" AS ENUM('product', 'rawMaterial', 'semiFinished', 'service')`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."products_type_enum" NOT NULL DEFAULT 'product', "barcode" character varying, "sku" character varying, "categoryId" uuid NOT NULL, "baseUnitId" uuid NOT NULL, "salesUnitId" uuid, "purchaseUnitId" uuid, "salesPrice" numeric(15,2) NOT NULL DEFAULT '0', "purchasePrice" numeric(15,2) NOT NULL DEFAULT '0', "minStockLevel" double precision NOT NULL DEFAULT '0', "maxStockLevel" double precision NOT NULL DEFAULT '0', "reorderPoint" double precision NOT NULL DEFAULT '0', "reorderQuantity" double precision NOT NULL DEFAULT '0', "leadTimeDays" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "isSellable" boolean NOT NULL DEFAULT true, "isPurchasable" boolean NOT NULL DEFAULT true, "isStockTracked" boolean NOT NULL DEFAULT true, "imageUrl" character varying, "weight" double precision, "volume" double precision, "dimensions" json, "tags" json, "attributes" json, CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stock_levels_status_enum" AS ENUM('available', 'reserved', 'damaged', 'expired', 'quarantine')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock_levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" uuid NOT NULL, "warehouseId" uuid NOT NULL, "locationId" uuid, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL DEFAULT '0', "reservedQuantity" double precision NOT NULL DEFAULT '0', "availableQuantity" double precision NOT NULL DEFAULT '0', "status" "public"."stock_levels_status_enum" NOT NULL DEFAULT 'available', "lotNumber" character varying, "serialNumber" character varying, "manufactureDate" date, "expiryDate" date, "lastInventoryDate" date, "note" character varying, "tags" json, CONSTRAINT "PK_ee416fdf2f5696dff16fd0c1c90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warehouse_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "warehouseId" uuid NOT NULL, "parentId" uuid, "isActive" boolean NOT NULL DEFAULT true, "locationType" character varying, "barcode" character varying, "maxCapacity" double precision, "currentUsage" double precision NOT NULL DEFAULT '0', "coordinates" json, CONSTRAINT "PK_03d900f32f1fcd299452d9eee7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warehouses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "contactNumber" character varying, "email" character varying, "isActive" boolean NOT NULL DEFAULT true, "isDefault" boolean NOT NULL DEFAULT false, "latitude" double precision, "longitude" double precision, "tags" json, CONSTRAINT "UQ_d8b96d60ff9a288f5ed862280d9" UNIQUE ("code"), CONSTRAINT "PK_56ae21ee2432b2270b48867e4be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stock_movements_type_enum" AS ENUM('receipt', 'issue', 'transfer', 'adjustment', 'return', 'scrap')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "type" "public"."stock_movements_type_enum" NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "sourceWarehouseId" uuid, "sourceLocationId" uuid, "destinationWarehouseId" uuid, "destinationLocationId" uuid, "referenceType" character varying, "referenceId" character varying, "referenceNumber" character varying, "lotNumber" character varying, "serialNumber" character varying, "manufactureDate" date, "expiryDate" date, "unitCost" numeric(15,2), "totalCost" numeric(15,2), "createdByUserId" uuid NOT NULL, "note" character varying, "tags" json, CONSTRAINT "UQ_64cb31973ad0e22ebc3fcebc5f5" UNIQUE ("number"), CONSTRAINT "PK_57a26b190618550d8e65fb860e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory_adjustment_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "adjustmentId" uuid NOT NULL, "productId" uuid NOT NULL, "locationId" uuid, "unitId" uuid NOT NULL, "systemQuantity" double precision NOT NULL, "actualQuantity" double precision NOT NULL, "differenceQuantity" double precision NOT NULL, "lotNumber" character varying, "serialNumber" character varying, "manufactureDate" date, "expiryDate" date, "unitCost" numeric(15,2), "totalCost" numeric(15,2), "note" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ae7d53c0494c1f03e134d3cc95b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."inventory_adjustments_status_enum" AS ENUM('draft', 'pending', 'approved', 'posted', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."inventory_adjustments_type_enum" AS ENUM('physicalCount', 'damage', 'expiry', 'theft', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory_adjustments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "description" character varying, "status" "public"."inventory_adjustments_status_enum" NOT NULL DEFAULT 'draft', "type" "public"."inventory_adjustments_type_enum" NOT NULL, "warehouseId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "referenceNumber" character varying, "note" character varying, "tags" json, CONSTRAINT "UQ_f5e1d1076764106d307836304cb" UNIQUE ("number"), CONSTRAINT "PK_67a6cd67ec23f212ac3d124325e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" ADD CONSTRAINT "FK_cbf04073e03d8873ae0662053a3" FOREIGN KEY ("parentId") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_8f02492cd2cba26de537ffd6b98" FOREIGN KEY ("baseUnitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_525c1c5f0541d5b5c25150b0e9e" FOREIGN KEY ("salesUnitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9ac2ab69b92853c1c7a988aa79c" FOREIGN KEY ("purchaseUnitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" ADD CONSTRAINT "FK_875faa3d8407d502b7f123e94f2" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" ADD CONSTRAINT "FK_eaadbdcdebe3748847e8d212d9c" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" ADD CONSTRAINT "FK_5f268ba6658e075c5172c108fa6" FOREIGN KEY ("locationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" ADD CONSTRAINT "FK_45e931e460966e2156152c094e0" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_locations" ADD CONSTRAINT "FK_ac9f8443edc269de2443e3bf25b" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_locations" ADD CONSTRAINT "FK_6434cece5162ca770139f4ff96a" FOREIGN KEY ("parentId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_a3acb59db67e977be45e382fc56" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_52df7a75d8e6703ff7544035064" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_fcbe59d62b9ebe9a507c41f47bd" FOREIGN KEY ("sourceWarehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_ba206a0726ffed1be484bd1e0bb" FOREIGN KEY ("sourceLocationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_78e2ed4e7c08da14cadc19ea1b2" FOREIGN KEY ("destinationWarehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_146b19065574b8961cc4dd90ee3" FOREIGN KEY ("destinationLocationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_1b050a639e023e0d806be50395f" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" ADD CONSTRAINT "FK_e2947c52608ef689582751f0e62" FOREIGN KEY ("adjustmentId") REFERENCES "inventory_adjustments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" ADD CONSTRAINT "FK_ce3ca9090074846299e8bd6feae" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" ADD CONSTRAINT "FK_40f172a65a3539f36b4e978ad93" FOREIGN KEY ("locationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" ADD CONSTRAINT "FK_bd4bbadf2c0bbf7ff5b330d9298" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "FK_098288896b743608e8eb590ba88" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "FK_e51f3e4b071df738da7f6e2519a" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "FK_dc3ab7aaa073882f800228f96c5" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" DROP CONSTRAINT "FK_dc3ab7aaa073882f800228f96c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" DROP CONSTRAINT "FK_e51f3e4b071df738da7f6e2519a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustments" DROP CONSTRAINT "FK_098288896b743608e8eb590ba88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" DROP CONSTRAINT "FK_bd4bbadf2c0bbf7ff5b330d9298"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" DROP CONSTRAINT "FK_40f172a65a3539f36b4e978ad93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" DROP CONSTRAINT "FK_ce3ca9090074846299e8bd6feae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory_adjustment_items" DROP CONSTRAINT "FK_e2947c52608ef689582751f0e62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_1b050a639e023e0d806be50395f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_146b19065574b8961cc4dd90ee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_78e2ed4e7c08da14cadc19ea1b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_ba206a0726ffed1be484bd1e0bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_fcbe59d62b9ebe9a507c41f47bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_52df7a75d8e6703ff7544035064"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_a3acb59db67e977be45e382fc56"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_locations" DROP CONSTRAINT "FK_6434cece5162ca770139f4ff96a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_locations" DROP CONSTRAINT "FK_ac9f8443edc269de2443e3bf25b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" DROP CONSTRAINT "FK_45e931e460966e2156152c094e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" DROP CONSTRAINT "FK_5f268ba6658e075c5172c108fa6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" DROP CONSTRAINT "FK_eaadbdcdebe3748847e8d212d9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_levels" DROP CONSTRAINT "FK_875faa3d8407d502b7f123e94f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9ac2ab69b92853c1c7a988aa79c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_525c1c5f0541d5b5c25150b0e9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_8f02492cd2cba26de537ffd6b98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" DROP CONSTRAINT "FK_cbf04073e03d8873ae0662053a3"`,
    );
    await queryRunner.query(`DROP TABLE "inventory_adjustments"`);
    await queryRunner.query(
      `DROP TYPE "public"."inventory_adjustments_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."inventory_adjustments_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "inventory_adjustment_items"`);
    await queryRunner.query(`DROP TABLE "stock_movements"`);
    await queryRunner.query(`DROP TYPE "public"."stock_movements_type_enum"`);
    await queryRunner.query(`DROP TABLE "warehouses"`);
    await queryRunner.query(`DROP TABLE "warehouse_locations"`);
    await queryRunner.query(`DROP TABLE "stock_levels"`);
    await queryRunner.query(`DROP TYPE "public"."stock_levels_status_enum"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "public"."products_type_enum"`);
    await queryRunner.query(`DROP TABLE "units_of_measure"`);
    await queryRunner.query(`DROP TABLE "product_categories"`);
  }
}
