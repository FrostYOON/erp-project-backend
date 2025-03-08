import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesCreateAllTables1741453588076 implements MigrationInterface {
  name = 'SalesCreateAllTables1741453588076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customerId" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "jobTitle" character varying, "email" character varying, "phone" character varying, "mobile" character varying, "isPrimary" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "notes" character varying, "department" character varying, CONSTRAINT "PK_bde619dbcb45a3e4d542e137bd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotation_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quotationId" uuid NOT NULL, "productId" uuid, "description" character varying, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "unitPrice" numeric(15,2) NOT NULL, "taxRate" double precision NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "discountRate" double precision NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "subtotal" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a5ff0786836b65d12bafd0ac91e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum" AS ENUM('draft', 'sent', 'accepted', 'rejected', 'expired', 'converted', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "title" character varying NOT NULL, "status" "public"."quotations_status_enum" NOT NULL DEFAULT 'draft', "customerId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "validityPeriod" integer NOT NULL DEFAULT '30', "expiryDate" date NOT NULL, "subtotal" numeric(15,2) NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "total" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "paymentTerms" character varying, "deliveryTerms" character varying, "notes" text, "tags" json, "attachments" json, CONSTRAINT "UQ_7f5e93568b20c949b3b4bac5717" UNIQUE ("number"), CONSTRAINT "PK_6c00eb8ba181f28c21ffba7ecb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_type_enum" AS ENUM('individual', 'company', 'government', 'nonprofit')`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "type" "public"."customers_type_enum" NOT NULL DEFAULT 'company', "taxId" character varying, "website" character varying, "email" character varying, "phone" character varying, "fax" character varying, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "paymentTerms" integer NOT NULL DEFAULT '30', "deliveryTerms" character varying, "currency" character varying NOT NULL DEFAULT 'KRW', "creditLimit" numeric(15,2) NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "notes" text, "tags" json, CONSTRAINT "UQ_f2eee14aa1fe3e956fe193c142f" UNIQUE ("code"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_order_items_status_enum" AS ENUM('pending', 'partial', 'shipped', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "salesOrderId" uuid NOT NULL, "productId" uuid, "description" character varying, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "unitPrice" numeric(15,2) NOT NULL, "taxRate" double precision NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "discountRate" double precision NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "subtotal" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "status" "public"."sales_order_items_status_enum" NOT NULL DEFAULT 'pending', "requestedDeliveryDate" date, "expectedDeliveryDate" date, "shippedQuantity" double precision NOT NULL DEFAULT '0', "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a5f8d983ae4db44dcc923faf2ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_orders_status_enum" AS ENUM('draft', 'confirmed', 'processing', 'partial', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "status" "public"."sales_orders_status_enum" NOT NULL DEFAULT 'draft', "customerId" uuid NOT NULL, "quotationId" uuid, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "requestedDeliveryDate" date, "expectedDeliveryDate" date, "deliveryAddress" character varying, "deliveryCity" character varying, "deliveryState" character varying, "deliveryCountry" character varying, "deliveryPostalCode" character varying, "paymentTerms" character varying, "deliveryTerms" character varying, "subtotal" numeric(15,2) NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "shippingCost" numeric(15,2) NOT NULL DEFAULT '0', "total" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "customerReference" character varying, "notes" text, "tags" json, "attachments" json, CONSTRAINT "UQ_43765e904d5e8909a3bde3843fc" UNIQUE ("number"), CONSTRAINT "PK_5328297e067ca929fbe7cf989dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."shipment_items_status_enum" AS ENUM('pending', 'picked', 'packed', 'shipped')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipment_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "shipmentId" uuid NOT NULL, "salesOrderItemId" uuid NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "locationId" uuid, "orderedQuantity" double precision NOT NULL, "shippedQuantity" double precision NOT NULL, "status" "public"."shipment_items_status_enum" NOT NULL DEFAULT 'pending', "lotNumber" character varying, "serialNumber" character varying, "manufactureDate" date, "expiryDate" date, "unitPrice" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "weight" double precision, "volume" double precision, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_7dfc873be1417190f0e5e001dd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_status_enum" AS ENUM('draft', 'pending', 'approved', 'picked', 'packed', 'shipped', 'delivered', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "status" "public"."shipments_status_enum" NOT NULL DEFAULT 'draft', "salesOrderId" uuid NOT NULL, "warehouseId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "deliveryAddress" character varying NOT NULL, "deliveryCity" character varying NOT NULL, "deliveryState" character varying, "deliveryCountry" character varying NOT NULL, "deliveryPostalCode" character varying NOT NULL, "contactName" character varying NOT NULL, "contactPhone" character varying NOT NULL, "contactEmail" character varying, "shippingMethod" character varying, "carrier" character varying, "trackingNumber" character varying, "expectedDeliveryDate" date, "actualDeliveryDate" date, "totalWeight" double precision, "totalVolume" double precision, "packageCount" integer NOT NULL DEFAULT '1', "notes" text, "tags" json, "attachments" json, CONSTRAINT "UQ_75221939d6a308d152f4ad5899f" UNIQUE ("number"), CONSTRAINT "PK_6deda4532ac542a93eab214b564" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_territory_customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "territoryId" uuid NOT NULL, "customerId" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "startDate" date, "endDate" date, "notes" character varying, CONSTRAINT "PK_37ea4b036b442ceedd678ad4ac3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_territories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "code" character varying NOT NULL, "region" character varying, "country" character varying, "state" character varying, "city" character varying, "postalCodeRange" json, "salesRepresentativeId" uuid NOT NULL, "managerId" uuid, "isActive" boolean NOT NULL DEFAULT true, "annualTarget" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "notes" character varying, "tags" json, CONSTRAINT "UQ_7d7e36fc28a252f26c5c0523965" UNIQUE ("code"), CONSTRAINT "PK_96ee1433fb5a0895450fed8fa3c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_list_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceListId" uuid NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "price" numeric(15,2) NOT NULL, "minimumQuantity" double precision NOT NULL DEFAULT '1', "maximumQuantity" double precision, "startDate" date, "endDate" date, "isActive" boolean NOT NULL DEFAULT true, "notes" character varying, CONSTRAINT "PK_cdb44449658589feac39de86695" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."price_lists_type_enum" AS ENUM('sale', 'purchase', 'special')`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "type" "public"."price_lists_type_enum" NOT NULL DEFAULT 'sale', "currency" character varying NOT NULL DEFAULT 'KRW', "startDate" date NOT NULL, "endDate" date, "isActive" boolean NOT NULL DEFAULT true, "isDefault" boolean NOT NULL DEFAULT false, "customerGroup" character varying, "minimumOrderAmount" numeric(15,2), "notes" character varying, "tags" json, CONSTRAINT "PK_fd66ee20b065696da25c97fa45a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD CONSTRAINT "FK_d8275ed306525c0d1cddcaee904" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_daed37b90fdb61300eabb8e2743" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_8e92de26635dda771136a35863d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_c5f36602d7a26ad6a61526827db" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_116e4084cf9a95beea7e502ac0d" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_4c41e134f09315f18e1bce97f14" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_b17015415bb84371502c5e8501c" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" ADD CONSTRAINT "FK_6b67146a69ed5fe5fe7f3224d31" FOREIGN KEY ("salesOrderId") REFERENCES "sales_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" ADD CONSTRAINT "FK_95836cf122ca5a4eb2e40ea552c" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" ADD CONSTRAINT "FK_9a7e85c476c27b4ad587f6edec2" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" ADD CONSTRAINT "FK_9978ca165b4c0f27571f3d1d924" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" ADD CONSTRAINT "FK_01722fa36be5da34ca66c3d88ff" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" ADD CONSTRAINT "FK_afecc38d5a94e394d8f938a7921" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" ADD CONSTRAINT "FK_93ee4a22a8cbf3bf1fbada23216" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_eeef177e88218449410bbb3af44" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_02d2e28c0343599337a2e5580c4" FOREIGN KEY ("salesOrderItemId") REFERENCES "sales_order_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_4adc7d31b2e34803fb8b0d7ec7f" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_653479075f78f0f71b272b50260" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_7b241dd9660448149898898fa8e" FOREIGN KEY ("locationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD CONSTRAINT "FK_d3ed4f18bb7377e36c8ed45cf68" FOREIGN KEY ("salesOrderId") REFERENCES "sales_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD CONSTRAINT "FK_512e1dde412cee17ee4ae9e3314" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD CONSTRAINT "FK_050a4e25f4e8dff3429b8b15863" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD CONSTRAINT "FK_d91aaa41c6d59f395b1954e40f6" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territory_customers" ADD CONSTRAINT "FK_8db86a90fddea0ab687cb70f219" FOREIGN KEY ("territoryId") REFERENCES "sales_territories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territory_customers" ADD CONSTRAINT "FK_c41c036d5cc16030140e108a7fc" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territories" ADD CONSTRAINT "FK_749af910d724ae83c06e2fa8b8f" FOREIGN KEY ("salesRepresentativeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territories" ADD CONSTRAINT "FK_bdde6e1ee66e9a3bf216a71cd61" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_items" ADD CONSTRAINT "FK_97f080960141255e54eecb9bdbd" FOREIGN KEY ("priceListId") REFERENCES "price_lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_items" ADD CONSTRAINT "FK_f4460b6ee8677a87247e107e2b7" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_items" ADD CONSTRAINT "FK_2600145fd1a927c3349635c89a1" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "price_list_items" DROP CONSTRAINT "FK_2600145fd1a927c3349635c89a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_items" DROP CONSTRAINT "FK_f4460b6ee8677a87247e107e2b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_items" DROP CONSTRAINT "FK_97f080960141255e54eecb9bdbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territories" DROP CONSTRAINT "FK_bdde6e1ee66e9a3bf216a71cd61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territories" DROP CONSTRAINT "FK_749af910d724ae83c06e2fa8b8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territory_customers" DROP CONSTRAINT "FK_c41c036d5cc16030140e108a7fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_territory_customers" DROP CONSTRAINT "FK_8db86a90fddea0ab687cb70f219"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" DROP CONSTRAINT "FK_d91aaa41c6d59f395b1954e40f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" DROP CONSTRAINT "FK_050a4e25f4e8dff3429b8b15863"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" DROP CONSTRAINT "FK_512e1dde412cee17ee4ae9e3314"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" DROP CONSTRAINT "FK_d3ed4f18bb7377e36c8ed45cf68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_7b241dd9660448149898898fa8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_653479075f78f0f71b272b50260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_4adc7d31b2e34803fb8b0d7ec7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_02d2e28c0343599337a2e5580c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_eeef177e88218449410bbb3af44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" DROP CONSTRAINT "FK_93ee4a22a8cbf3bf1fbada23216"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" DROP CONSTRAINT "FK_afecc38d5a94e394d8f938a7921"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" DROP CONSTRAINT "FK_01722fa36be5da34ca66c3d88ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_orders" DROP CONSTRAINT "FK_9978ca165b4c0f27571f3d1d924"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" DROP CONSTRAINT "FK_9a7e85c476c27b4ad587f6edec2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" DROP CONSTRAINT "FK_95836cf122ca5a4eb2e40ea552c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_order_items" DROP CONSTRAINT "FK_6b67146a69ed5fe5fe7f3224d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_b17015415bb84371502c5e8501c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_4c41e134f09315f18e1bce97f14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_116e4084cf9a95beea7e502ac0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_c5f36602d7a26ad6a61526827db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_8e92de26635dda771136a35863d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_daed37b90fdb61300eabb8e2743"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP CONSTRAINT "FK_d8275ed306525c0d1cddcaee904"`,
    );
    await queryRunner.query(`DROP TABLE "price_lists"`);
    await queryRunner.query(`DROP TYPE "public"."price_lists_type_enum"`);
    await queryRunner.query(`DROP TABLE "price_list_items"`);
    await queryRunner.query(`DROP TABLE "sales_territories"`);
    await queryRunner.query(`DROP TABLE "sales_territory_customers"`);
    await queryRunner.query(`DROP TABLE "shipments"`);
    await queryRunner.query(`DROP TYPE "public"."shipments_status_enum"`);
    await queryRunner.query(`DROP TABLE "shipment_items"`);
    await queryRunner.query(`DROP TYPE "public"."shipment_items_status_enum"`);
    await queryRunner.query(`DROP TABLE "sales_orders"`);
    await queryRunner.query(`DROP TYPE "public"."sales_orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "sales_order_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."sales_order_items_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TYPE "public"."customers_type_enum"`);
    await queryRunner.query(`DROP TABLE "quotations"`);
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum"`);
    await queryRunner.query(`DROP TABLE "quotation_items"`);
    await queryRunner.query(`DROP TABLE "customer_contacts"`);
  }
}
