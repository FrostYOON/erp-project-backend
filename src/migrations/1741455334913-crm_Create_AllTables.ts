import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrmCreateAllTables1741455334913 implements MigrationInterface {
  name = 'CrmCreateAllTables1741455334913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer_segments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "priority" integer NOT NULL DEFAULT '0', "colorCode" character varying, "criteria" json, "tags" json, CONSTRAINT "UQ_66ab5f255871de0eedb827aa977" UNIQUE ("code"), CONSTRAINT "PK_1509398a6c472bfecd14d9d3152" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customer_activities_type_enum" AS ENUM('call', 'email', 'meeting', 'task', 'note', 'visit', 'social', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customer_activities_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customer_activities_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer_activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "public"."customer_activities_type_enum" NOT NULL, "status" "public"."customer_activities_status_enum" NOT NULL DEFAULT 'planned', "priority" "public"."customer_activities_priority_enum" NOT NULL DEFAULT 'medium', "title" character varying NOT NULL, "description" text, "customerId" uuid NOT NULL, "contactId" uuid, "assignedToUserId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "scheduledStartAt" TIMESTAMP NOT NULL, "scheduledEndAt" TIMESTAMP, "actualStartAt" TIMESTAMP, "actualEndAt" TIMESTAMP, "location" character varying, "result" text, "nextAction" text, "nextActionDate" date, "reminderMinutes" integer, "isRecurring" boolean NOT NULL DEFAULT false, "recurrenceRule" json, "tags" json, "attachments" json, CONSTRAINT "PK_359c4a3763df0f71a998ae7cdf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer_notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customerId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "importance" integer NOT NULL DEFAULT '0', "tags" json, "attachments" json, CONSTRAINT "PK_8a41bce1fe0094bd7a9c5266cc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_opportunity_stages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "sequence" integer NOT NULL, "defaultProbability" double precision NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "colorCode" character varying, "icon" character varying, CONSTRAINT "UQ_18e425d282f8d28c94a0d9195c2" UNIQUE ("code"), CONSTRAINT "PK_7051c3aa54fd1b4381a0495ca7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_opportunity_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "opportunityId" uuid NOT NULL, "productId" uuid NOT NULL, "unitId" uuid NOT NULL, "quantity" double precision NOT NULL, "unitPrice" numeric(15,2) NOT NULL, "discountPercentage" double precision NOT NULL DEFAULT '0', "discountAmount" numeric(15,2) NOT NULL DEFAULT '0', "taxPercentage" double precision NOT NULL DEFAULT '0', "taxAmount" numeric(15,2) NOT NULL DEFAULT '0', "subtotal" numeric(15,2) NOT NULL, "total" numeric(15,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'KRW', "description" text, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_74732f583d9f52ee2888a11a5b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_opportunities_status_enum" AS ENUM('open', 'won', 'lost', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_opportunities_priority_enum" AS ENUM('low', 'medium', 'high', 'critical')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_opportunities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" "public"."sales_opportunities_status_enum" NOT NULL DEFAULT 'open', "priority" "public"."sales_opportunities_priority_enum" NOT NULL DEFAULT 'medium', "customerId" uuid NOT NULL, "assignedToUserId" uuid NOT NULL, "stageId" uuid NOT NULL, "expectedAmount" numeric(15,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'KRW', "probability" double precision NOT NULL DEFAULT '0', "expectedCloseDate" date NOT NULL, "actualCloseDate" date, "source" character varying, "campaignId" character varying, "description" text, "lostReason" character varying, "competitors" character varying, "nextStep" character varying, "nextContactDate" date, "tags" json, "attachments" json, CONSTRAINT "UQ_27ae8ec255547e29eb10324e4dc" UNIQUE ("code"), CONSTRAINT "PK_2b68eb30800eee563e17ade4dcc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marketing_campaigns_type_enum" AS ENUM('email', 'sms', 'social', 'event', 'webinar', 'advertisement', 'directMail', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marketing_campaigns_status_enum" AS ENUM('draft', 'planned', 'active', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "marketing_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "type" "public"."marketing_campaigns_type_enum" NOT NULL, "status" "public"."marketing_campaigns_status_enum" NOT NULL DEFAULT 'draft', "ownerId" uuid NOT NULL, "segmentId" uuid, "startDate" date NOT NULL, "endDate" date NOT NULL, "budget" numeric(15,2) NOT NULL DEFAULT '0', "actualCost" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "expectedResponseRate" double precision NOT NULL DEFAULT '0', "actualResponseRate" double precision NOT NULL DEFAULT '0', "expectedROI" double precision NOT NULL DEFAULT '0', "actualROI" double precision NOT NULL DEFAULT '0', "targetCount" integer NOT NULL DEFAULT '0', "reachedCount" integer NOT NULL DEFAULT '0', "responseCount" integer NOT NULL DEFAULT '0', "successCount" integer NOT NULL DEFAULT '0', "description" text, "objectives" character varying, "message" text, "channel" character varying, "tags" json, "attachments" json, CONSTRAINT "UQ_fa937ce486d31531057d977afba" UNIQUE ("code"), CONSTRAINT "PK_2601ceb29654c2a8adfddf2abbf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marketing_campaign_targets_status_enum" AS ENUM('pending', 'sent', 'delivered', 'opened', 'clicked', 'responded', 'converted', 'bounced', 'unsubscribed', 'failed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "marketing_campaign_targets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "campaignId" uuid NOT NULL, "customerId" uuid NOT NULL, "contactId" uuid, "status" "public"."marketing_campaign_targets_status_enum" NOT NULL DEFAULT 'pending', "sentAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "openedAt" TIMESTAMP, "clickedAt" TIMESTAMP, "respondedAt" TIMESTAMP, "convertedAt" TIMESTAMP, "bouncedAt" TIMESTAMP, "unsubscribedAt" TIMESTAMP, "failedAt" TIMESTAMP, "failureReason" character varying, "responseData" json, "notes" text, CONSTRAINT "PK_57ac610119859a72f461a1fbbf2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "taxId"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "creditLimit"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "fax"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "paymentTerms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "deliveryTerms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "taxId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "fax" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "paymentTerms" integer NOT NULL DEFAULT '30'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "deliveryTerms" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "creditLimit" numeric(15,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "fax" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "city" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "state" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "country" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "postalCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "birthDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "preferredContactMethod" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "lastContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "socialProfiles" json`,
    );
    await queryRunner.query(`ALTER TABLE "customer_contacts" ADD "tags" json`);
    await queryRunner.query(
      `CREATE TYPE "public"."customers_status_enum" AS ENUM('active', 'inactive', 'lead', 'prospect', 'customer', 'former')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "status" "public"."customers_status_enum" NOT NULL DEFAULT 'lead'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "businessNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "industry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "employeeCount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "annualRevenue" numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "addressDetail" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "latitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "longitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "accountManagerId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "customers" ADD "segmentId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "acquisitionChannel" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "acquisitionDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "customerLifetimeValue" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "satisfactionScore" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "lastContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "nextContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "notes"`,
    );
    await queryRunner.query(`ALTER TABLE "customer_contacts" ADD "notes" text`);
    await queryRunner.query(
      `ALTER TYPE "public"."customers_type_enum" RENAME TO "customers_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_type_enum" AS ENUM('individual', 'company', 'government', 'nonProfit', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" TYPE "public"."customers_type_enum" USING "type"::"text"::"public"."customers_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" SET DEFAULT 'company'`,
    );
    await queryRunner.query(`DROP TYPE "public"."customers_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "customer_activities" ADD CONSTRAINT "FK_f28a98d65acca98259cb985752d" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" ADD CONSTRAINT "FK_672a93bc474ffb479f5e26ab3ef" FOREIGN KEY ("contactId") REFERENCES "customer_contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" ADD CONSTRAINT "FK_db39a530f256635516c9dfaa066" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" ADD CONSTRAINT "FK_88a892e8216fcb0fc8736bbf2b6" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_notes" ADD CONSTRAINT "FK_136ae1445ffdcbb1e0014349b23" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_notes" ADD CONSTRAINT "FK_86824ef4f20b3115df44dff1cfd" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_820375374e7f627622d18ae9e57" FOREIGN KEY ("accountManagerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_fee42ad77ae11993729483467d2" FOREIGN KEY ("segmentId") REFERENCES "customer_segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" ADD CONSTRAINT "FK_8e3708246f1994c22c1c1d1c9f5" FOREIGN KEY ("opportunityId") REFERENCES "sales_opportunities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" ADD CONSTRAINT "FK_33c1213eafedc4bc88299b458a8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" ADD CONSTRAINT "FK_62754d5972da2c33d4bccb831d7" FOREIGN KEY ("unitId") REFERENCES "units_of_measure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" ADD CONSTRAINT "FK_9d25ce17dce2a1b623477a22319" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" ADD CONSTRAINT "FK_d9a056daf6234e56f2cbb906833" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" ADD CONSTRAINT "FK_e5715399439ad73a036b1ba99fd" FOREIGN KEY ("stageId") REFERENCES "sales_opportunity_stages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaigns" ADD CONSTRAINT "FK_e7bd9a1a47eb78c4d6d697f54e4" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaigns" ADD CONSTRAINT "FK_dd3f22a91f63835ab53a8f0ae10" FOREIGN KEY ("segmentId") REFERENCES "customer_segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" ADD CONSTRAINT "FK_4f5e8bf83b9bcc02b2285b39738" FOREIGN KEY ("campaignId") REFERENCES "marketing_campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" ADD CONSTRAINT "FK_91b1a7e1e2eab34279a96c4167c" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" ADD CONSTRAINT "FK_a3e11f0eb2fcc573f0cc72f643c" FOREIGN KEY ("contactId") REFERENCES "customer_contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" DROP CONSTRAINT "FK_a3e11f0eb2fcc573f0cc72f643c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" DROP CONSTRAINT "FK_91b1a7e1e2eab34279a96c4167c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaign_targets" DROP CONSTRAINT "FK_4f5e8bf83b9bcc02b2285b39738"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaigns" DROP CONSTRAINT "FK_dd3f22a91f63835ab53a8f0ae10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marketing_campaigns" DROP CONSTRAINT "FK_e7bd9a1a47eb78c4d6d697f54e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" DROP CONSTRAINT "FK_e5715399439ad73a036b1ba99fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" DROP CONSTRAINT "FK_d9a056daf6234e56f2cbb906833"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunities" DROP CONSTRAINT "FK_9d25ce17dce2a1b623477a22319"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" DROP CONSTRAINT "FK_62754d5972da2c33d4bccb831d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" DROP CONSTRAINT "FK_33c1213eafedc4bc88299b458a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_opportunity_products" DROP CONSTRAINT "FK_8e3708246f1994c22c1c1d1c9f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_fee42ad77ae11993729483467d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_820375374e7f627622d18ae9e57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_notes" DROP CONSTRAINT "FK_86824ef4f20b3115df44dff1cfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_notes" DROP CONSTRAINT "FK_136ae1445ffdcbb1e0014349b23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" DROP CONSTRAINT "FK_88a892e8216fcb0fc8736bbf2b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" DROP CONSTRAINT "FK_db39a530f256635516c9dfaa066"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" DROP CONSTRAINT "FK_672a93bc474ffb479f5e26ab3ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_activities" DROP CONSTRAINT "FK_f28a98d65acca98259cb985752d"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_type_enum_old" AS ENUM('individual', 'company', 'government', 'nonprofit')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" TYPE "public"."customers_type_enum_old" USING "type"::"text"::"public"."customers_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "type" SET DEFAULT 'company'`,
    );
    await queryRunner.query(`DROP TYPE "public"."customers_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."customers_type_enum_old" RENAME TO "customers_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "notes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "notes" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "nextContactDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "lastContactDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "satisfactionScore"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "customerLifetimeValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "acquisitionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "acquisitionChannel"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "segmentId"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "accountManagerId"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "addressDetail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "annualRevenue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "employeeCount"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "industry"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "businessNumber"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."customers_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "tags"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "socialProfiles"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "lastContactDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "preferredContactMethod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "birthDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "postalCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "country"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "city"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "fax"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "creditLimit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "deliveryTerms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "paymentTerms"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "fax"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "taxId"`);
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "deliveryTerms" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "paymentTerms" integer NOT NULL DEFAULT '30'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "fax" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "creditLimit" numeric(15,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "taxId" character varying`,
    );
    await queryRunner.query(`DROP TABLE "marketing_campaign_targets"`);
    await queryRunner.query(
      `DROP TYPE "public"."marketing_campaign_targets_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "marketing_campaigns"`);
    await queryRunner.query(
      `DROP TYPE "public"."marketing_campaigns_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marketing_campaigns_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "sales_opportunities"`);
    await queryRunner.query(
      `DROP TYPE "public"."sales_opportunities_priority_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."sales_opportunities_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "sales_opportunity_products"`);
    await queryRunner.query(`DROP TABLE "sales_opportunity_stages"`);
    await queryRunner.query(`DROP TABLE "customer_notes"`);
    await queryRunner.query(`DROP TABLE "customer_activities"`);
    await queryRunner.query(
      `DROP TYPE "public"."customer_activities_priority_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."customer_activities_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."customer_activities_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "customer_segments"`);
  }
}
