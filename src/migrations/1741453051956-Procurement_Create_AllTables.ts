import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProcurementCreateAllTables1741453051956
  implements MigrationInterface
{
  name = 'ProcurementCreateAllTables1741453051956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "supplier_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "supplierId" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "jobTitle" character varying, "email" character varying, "phone" character varying, "mobile" character varying, "isPrimary" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "notes" character varying, "department" character varying, CONSTRAINT "PK_f2aee15a54abcc155a5d7f37dc2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_requisitions_status_enum" AS ENUM('draft', 'pending', 'approved', 'rejected', 'ordered', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_requisitions_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_requisitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."purchase_requisitions_status_enum" NOT NULL DEFAULT 'draft', "priority" "public"."purchase_requisitions_priority_enum" NOT NULL DEFAULT 'medium', "requestedByUserId" uuid NOT NULL, "departmentId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "requiredDate" date NOT NULL, "estimatedTotal" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "notes" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_5edac4665f01836e2846d002cbb" UNIQUE ("number"), CONSTRAINT "PK_498c368a925013267fce72a3dfe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_requisition_items_status_enum" AS ENUM('pending', 'ordered', 'partial', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_requisition_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "requisitionId" uuid NOT NULL, "productId" uuid, "description" character varying, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "estimatedUnitPrice" numeric(15,2), "estimatedTotal" numeric(15,2), "status" "public"."purchase_requisition_items_status_enum" NOT NULL DEFAULT 'pending', "requiredDate" date, "orderedQuantity" double precision NOT NULL DEFAULT '0', "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_4d7ac4d98eb592d0f631c0445bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_order_items_status_enum" AS ENUM('pending', 'partial', 'received', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "purchaseOrderId" uuid NOT NULL, "productId" uuid, "description" character varying, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "unitPrice" numeric(15,2) NOT NULL, "taxRate" double precision NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "discountRate" double precision NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "subtotal" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "status" "public"."purchase_order_items_status_enum" NOT NULL DEFAULT 'pending', "expectedDeliveryDate" date, "receivedQuantity" double precision NOT NULL DEFAULT '0', "requisitionItemId" uuid, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e8b7568d25c41e3290db596b312" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."purchase_orders_status_enum" AS ENUM('draft', 'sent', 'confirmed', 'partial', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "status" "public"."purchase_orders_status_enum" NOT NULL DEFAULT 'draft', "supplierId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "expectedDeliveryDate" date, "deliveryAddress" character varying, "paymentTerms" character varying, "deliveryTerms" character varying, "subtotal" numeric(15,2) NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "shippingCost" numeric(15,2) NOT NULL DEFAULT '0', "otherCosts" numeric(15,2) NOT NULL DEFAULT '0', "total" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "notes" text, "supplierReference" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_ec2230564d163f5f921aacd5829" UNIQUE ("number"), CONSTRAINT "PK_05148947415204a897e8beb2553" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."suppliers_type_enum" AS ENUM('product', 'service', 'both')`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "type" "public"."suppliers_type_enum" NOT NULL DEFAULT 'product', "taxId" character varying, "website" character varying, "email" character varying, "phone" character varying, "fax" character varying, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "paymentTerms" integer NOT NULL DEFAULT '30', "deliveryTerms" character varying, "currency" character varying NOT NULL DEFAULT 'KRW', "isActive" boolean NOT NULL DEFAULT true, "notes" text, "rating" double precision, "tags" json, CONSTRAINT "UQ_6f01a03dcb1aa33822e19534cd6" UNIQUE ("code"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "supplier_evaluation_criteria" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "evaluationId" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "category" character varying, "weight" double precision NOT NULL DEFAULT '0', "maxScore" double precision NOT NULL, "actualScore" double precision NOT NULL, "weightedScore" double precision NOT NULL, "comments" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_5c6241a958ee2a59d640b328c46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."supplier_evaluations_status_enum" AS ENUM('draft', 'completed', 'approved', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "supplier_evaluations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."supplier_evaluations_status_enum" NOT NULL DEFAULT 'draft', "supplierId" uuid NOT NULL, "evaluatedByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "periodStartDate" date NOT NULL, "periodEndDate" date NOT NULL, "totalScore" double precision NOT NULL DEFAULT '0', "maxPossibleScore" double precision NOT NULL DEFAULT '0', "scorePercentage" double precision NOT NULL DEFAULT '0', "grade" character varying, "conclusion" text, "improvementAreas" text, "notes" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_b2644a7da590d412df2454e1a70" UNIQUE ("number"), CONSTRAINT "PK_48bf0f081e44aca7439d23d2011" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."goods_receipt_items_status_enum" AS ENUM('pending', 'inspected', 'accepted', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goods_receipt_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "goodsReceiptId" uuid NOT NULL, "purchaseOrderItemId" uuid NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "locationId" uuid, "orderedQuantity" double precision NOT NULL, "receivedQuantity" double precision NOT NULL, "acceptedQuantity" double precision NOT NULL DEFAULT '0', "rejectedQuantity" double precision NOT NULL DEFAULT '0', "status" "public"."goods_receipt_items_status_enum" NOT NULL DEFAULT 'pending', "lotNumber" character varying, "serialNumber" character varying, "manufactureDate" date, "expiryDate" date, "unitPrice" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3773489ac01faa49777eed0a14f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."goods_receipts_status_enum" AS ENUM('draft', 'pending', 'approved', 'posted', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goods_receipts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "status" "public"."goods_receipts_status_enum" NOT NULL DEFAULT 'draft', "purchaseOrderId" uuid NOT NULL, "warehouseId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "supplierInvoiceNumber" character varying, "supplierDeliveryNumber" character varying, "notes" text, "tags" json, "attachments" json, CONSTRAINT "UQ_38b2262e5577e35df134005efbc" UNIQUE ("number"), CONSTRAINT "PK_f8cac411be0211f923e1be8534f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contract_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "contractId" uuid NOT NULL, "productId" uuid, "description" character varying, "unitId" uuid, "quantity" double precision, "unitPrice" numeric(15,2), "total" numeric(15,2), "minimumOrderQuantity" double precision, "leadTimeDays" integer, "notes" character varying, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_490c7394f3b09ee92c41668a156" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contracts_status_enum" AS ENUM('draft', 'pending', 'active', 'expired', 'terminated', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contracts_type_enum" AS ENUM('purchase', 'service', 'framework', 'blanket')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."contracts_status_enum" NOT NULL DEFAULT 'draft', "type" "public"."contracts_type_enum" NOT NULL, "supplierId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "startDate" date NOT NULL, "endDate" date NOT NULL, "amount" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "paymentTerms" character varying, "deliveryTerms" character varying, "renewalNoticeDays" integer NOT NULL DEFAULT '30', "autoRenew" boolean NOT NULL DEFAULT false, "notes" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_7f9a578e633d6521bcc2d9cc8cb" UNIQUE ("number"), CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_contacts" ADD CONSTRAINT "FK_ba7afffa71a351a921a9b9ece76" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" ADD CONSTRAINT "FK_01c53630b9f108ad9dcb8adad62" FOREIGN KEY ("requestedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" ADD CONSTRAINT "FK_97c2876a6c03ea7632b114aaa43" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" ADD CONSTRAINT "FK_7b1612323f328b0af8ff417abba" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" ADD CONSTRAINT "FK_537b9b9d4f4e4d64b9c09e4c55e" FOREIGN KEY ("requisitionId") REFERENCES "purchase_requisitions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" ADD CONSTRAINT "FK_f97d2a263031a7e93ff12926418" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" ADD CONSTRAINT "FK_5c90f801dbbd2fcdd912ad4a13d" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" ADD CONSTRAINT "FK_1de7eb246940b05765d2c99a7ec" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" ADD CONSTRAINT "FK_f87b1b82a3aff16d1cb5e49a656" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" ADD CONSTRAINT "FK_9d57fbe59e84ec047e0f1796230" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" ADD CONSTRAINT "FK_d47ab2009ef2fd040c485ef4564" FOREIGN KEY ("requisitionItemId") REFERENCES "purchase_requisition_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" ADD CONSTRAINT "FK_0c3ff892a9f2ed16f59d31cccae" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" ADD CONSTRAINT "FK_5e0069b01003c73a904f0e4d97b" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" ADD CONSTRAINT "FK_379e010103b61e63b4d12525190" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluation_criteria" ADD CONSTRAINT "FK_8afa4b2c3f2082dd664aca66e13" FOREIGN KEY ("evaluationId") REFERENCES "supplier_evaluations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" ADD CONSTRAINT "FK_f85d369e5d36b73af50d1f74d6b" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" ADD CONSTRAINT "FK_78c5c7b5e5a0379a27ee07f026b" FOREIGN KEY ("evaluatedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" ADD CONSTRAINT "FK_da714e880deec686a9f90ed8677" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "FK_d1c1d80926f6e0eedd7b1473635" FOREIGN KEY ("goodsReceiptId") REFERENCES "goods_receipts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "FK_d30dc64bd7e7c1171cb3fcabe10" FOREIGN KEY ("purchaseOrderItemId") REFERENCES "purchase_order_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "FK_e9dc7bf6f358e36e53fd7ec6438" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "FK_1e3fee3efca7d4db2b716d972de" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "FK_25f15649e15b3bb664f86543f23" FOREIGN KEY ("locationId") REFERENCES "warehouse_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" ADD CONSTRAINT "FK_edf0f2be9e5b2d67313461ac11c" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" ADD CONSTRAINT "FK_142420efaa301b518d3b3fe5822" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" ADD CONSTRAINT "FK_50200616d8a18b0633ebb1b465e" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" ADD CONSTRAINT "FK_dbdfb570848df96267523fe40cc" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" ADD CONSTRAINT "FK_723bb41a536a5deb9a78971437f" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" ADD CONSTRAINT "FK_1e8640f606c860e72ddf5358f3f" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" ADD CONSTRAINT "FK_7ee8fa892f16893f00a9e1733f8" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_690b42c3ec45394fb4ede7f956c" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_70b8a7aefbbce9f6d62940a9caa" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_55df4a702fffd5e8f051ece0b34" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP CONSTRAINT "FK_55df4a702fffd5e8f051ece0b34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP CONSTRAINT "FK_70b8a7aefbbce9f6d62940a9caa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP CONSTRAINT "FK_690b42c3ec45394fb4ede7f956c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" DROP CONSTRAINT "FK_7ee8fa892f16893f00a9e1733f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" DROP CONSTRAINT "FK_1e8640f606c860e72ddf5358f3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_items" DROP CONSTRAINT "FK_723bb41a536a5deb9a78971437f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" DROP CONSTRAINT "FK_dbdfb570848df96267523fe40cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" DROP CONSTRAINT "FK_50200616d8a18b0633ebb1b465e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" DROP CONSTRAINT "FK_142420efaa301b518d3b3fe5822"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipts" DROP CONSTRAINT "FK_edf0f2be9e5b2d67313461ac11c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" DROP CONSTRAINT "FK_25f15649e15b3bb664f86543f23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" DROP CONSTRAINT "FK_1e3fee3efca7d4db2b716d972de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" DROP CONSTRAINT "FK_e9dc7bf6f358e36e53fd7ec6438"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" DROP CONSTRAINT "FK_d30dc64bd7e7c1171cb3fcabe10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goods_receipt_items" DROP CONSTRAINT "FK_d1c1d80926f6e0eedd7b1473635"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" DROP CONSTRAINT "FK_da714e880deec686a9f90ed8677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" DROP CONSTRAINT "FK_78c5c7b5e5a0379a27ee07f026b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluations" DROP CONSTRAINT "FK_f85d369e5d36b73af50d1f74d6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_evaluation_criteria" DROP CONSTRAINT "FK_8afa4b2c3f2082dd664aca66e13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" DROP CONSTRAINT "FK_379e010103b61e63b4d12525190"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" DROP CONSTRAINT "FK_5e0069b01003c73a904f0e4d97b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_orders" DROP CONSTRAINT "FK_0c3ff892a9f2ed16f59d31cccae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" DROP CONSTRAINT "FK_d47ab2009ef2fd040c485ef4564"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" DROP CONSTRAINT "FK_9d57fbe59e84ec047e0f1796230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" DROP CONSTRAINT "FK_f87b1b82a3aff16d1cb5e49a656"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_items" DROP CONSTRAINT "FK_1de7eb246940b05765d2c99a7ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" DROP CONSTRAINT "FK_5c90f801dbbd2fcdd912ad4a13d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" DROP CONSTRAINT "FK_f97d2a263031a7e93ff12926418"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisition_items" DROP CONSTRAINT "FK_537b9b9d4f4e4d64b9c09e4c55e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" DROP CONSTRAINT "FK_7b1612323f328b0af8ff417abba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" DROP CONSTRAINT "FK_97c2876a6c03ea7632b114aaa43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_requisitions" DROP CONSTRAINT "FK_01c53630b9f108ad9dcb8adad62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier_contacts" DROP CONSTRAINT "FK_ba7afffa71a351a921a9b9ece76"`,
    );
    await queryRunner.query(`DROP TABLE "contracts"`);
    await queryRunner.query(`DROP TYPE "public"."contracts_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."contracts_status_enum"`);
    await queryRunner.query(`DROP TABLE "contract_items"`);
    await queryRunner.query(`DROP TABLE "goods_receipts"`);
    await queryRunner.query(`DROP TYPE "public"."goods_receipts_status_enum"`);
    await queryRunner.query(`DROP TABLE "goods_receipt_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."goods_receipt_items_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "supplier_evaluations"`);
    await queryRunner.query(
      `DROP TYPE "public"."supplier_evaluations_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "supplier_evaluation_criteria"`);
    await queryRunner.query(`DROP TABLE "suppliers"`);
    await queryRunner.query(`DROP TYPE "public"."suppliers_type_enum"`);
    await queryRunner.query(`DROP TABLE "purchase_orders"`);
    await queryRunner.query(`DROP TYPE "public"."purchase_orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "purchase_order_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."purchase_order_items_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "purchase_requisition_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."purchase_requisition_items_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "purchase_requisitions"`);
    await queryRunner.query(
      `DROP TYPE "public"."purchase_requisitions_priority_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."purchase_requisitions_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "supplier_contacts"`);
  }
}
