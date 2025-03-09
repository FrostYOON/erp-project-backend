import { MigrationInterface, QueryRunner } from 'typeorm';

export class FinanceCreateAllTables1741451779528 implements MigrationInterface {
  name = 'FinanceCreateAllTables1741451779528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."fiscal_periods_status_enum" AS ENUM('open', 'closed', 'adjusting')`,
    );
    await queryRunner.query(
      `CREATE TABLE "fiscal_periods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "year" integer NOT NULL, "period" integer NOT NULL, "name" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "status" "public"."fiscal_periods_status_enum" NOT NULL DEFAULT 'open', "closedDate" date, "note" character varying, "quarter" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9bb1e4e84a0d820b943e116888d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accounts_type_enum" AS ENUM('asset', 'liability', 'equity', 'revenue', 'expense')`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" "public"."accounts_type_enum" NOT NULL, "parentId" uuid, "isActive" boolean NOT NULL DEFAULT true, "balanceDirection" character varying NOT NULL, "currentBalance" numeric(15,2) NOT NULL DEFAULT '0', "budgetAmount" numeric(15,2) NOT NULL DEFAULT '0', "tags" json, "level" integer NOT NULL DEFAULT '1', "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_490319656e54a7957dc1fed027c" UNIQUE ("code"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."journal_items_type_enum" AS ENUM('debit', 'credit')`,
    );
    await queryRunner.query(
      `CREATE TABLE "journal_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "journalId" uuid NOT NULL, "accountId" uuid NOT NULL, "type" "public"."journal_items_type_enum" NOT NULL, "amount" numeric(15,2) NOT NULL, "description" character varying, "sortOrder" integer NOT NULL DEFAULT '0', "reference" json, CONSTRAINT "PK_7f57d83b2bf253dfe9150b4b190" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."journals_status_enum" AS ENUM('draft', 'posted', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."journals_type_enum" AS ENUM('normal', 'adjustment', 'closing', 'opening')`,
    );
    await queryRunner.query(
      `CREATE TABLE "journals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "description" character varying, "reference" character varying, "status" "public"."journals_status_enum" NOT NULL DEFAULT 'draft', "type" "public"."journals_type_enum" NOT NULL DEFAULT 'normal', "amount" numeric(15,2) NOT NULL DEFAULT '0', "fiscalPeriodId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "documentUrl" character varying, "tags" json, CONSTRAINT "UQ_49e70321872c5209b010fcee67a" UNIQUE ("number"), CONSTRAINT "PK_157a30136385dd81cdd19111380" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_type_enum" AS ENUM('income', 'expense', 'transfer', 'adjustment')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('pending', 'completed', 'failed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "date" date NOT NULL, "description" character varying, "type" "public"."transactions_type_enum" NOT NULL, "amount" numeric(15,2) NOT NULL, "status" "public"."transactions_status_enum" NOT NULL DEFAULT 'pending', "reference" character varying, "journalId" uuid, "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "note" character varying, "tags" json, "documentUrl" character varying, CONSTRAINT "UQ_23368dc6dbdbe92f83c8bb1fd88" UNIQUE ("number"), CONSTRAINT "REL_43ad97842d60f8808c80c23e15" UNIQUE ("journalId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "budget_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "budgetId" uuid NOT NULL, "accountId" uuid NOT NULL, "amount" numeric(15,2) NOT NULL, "description" character varying, "monthlyDistribution" json, "actualAmount" numeric(15,2) NOT NULL DEFAULT '0', "variance" numeric(15,2) NOT NULL DEFAULT '0', "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_9eb705f406c83a1167ef575cd7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."budgets_status_enum" AS ENUM('draft', 'approved', 'active', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "budgets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "year" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "status" "public"."budgets_status_enum" NOT NULL DEFAULT 'draft', "totalAmount" numeric(15,2) NOT NULL DEFAULT '0', "createdByUserId" uuid NOT NULL, "approvedByUserId" uuid, "approvedDate" date, "note" character varying, "departmentId" character varying, "projectId" character varying, CONSTRAINT "PK_9c8a51748f82387644b773da482" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_e1496dabea319842640e45fb3ed" FOREIGN KEY ("parentId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_items" ADD CONSTRAINT "FK_5c54049e4de247f6a440b4de312" FOREIGN KEY ("journalId") REFERENCES "journals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_items" ADD CONSTRAINT "FK_2bff453e894282047f433b8f6c0" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_9942371d9031d61066847b26763" FOREIGN KEY ("fiscalPeriodId") REFERENCES "fiscal_periods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_045303cc92572a116fadfd3c2c5" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_57c28462bddf8e2e1d65995aefb" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_43ad97842d60f8808c80c23e15a" FOREIGN KEY ("journalId") REFERENCES "journals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_719fbfb8f177c22ce1984a570d7" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_f2b02fd7623424dfe5be2d4ef72" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget_items" ADD CONSTRAINT "FK_1160fb85bb3cb492ac954b491a9" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget_items" ADD CONSTRAINT "FK_23bdbcb2cd2858cd4d708323032" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_92ee5bc42d72fd09e29a66b7efd" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_da623fa3fb192491b8939a9ef30" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_da623fa3fb192491b8939a9ef30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_92ee5bc42d72fd09e29a66b7efd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget_items" DROP CONSTRAINT "FK_23bdbcb2cd2858cd4d708323032"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget_items" DROP CONSTRAINT "FK_1160fb85bb3cb492ac954b491a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_f2b02fd7623424dfe5be2d4ef72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_719fbfb8f177c22ce1984a570d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_43ad97842d60f8808c80c23e15a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_57c28462bddf8e2e1d65995aefb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_045303cc92572a116fadfd3c2c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_9942371d9031d61066847b26763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_items" DROP CONSTRAINT "FK_2bff453e894282047f433b8f6c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_items" DROP CONSTRAINT "FK_5c54049e4de247f6a440b4de312"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_e1496dabea319842640e45fb3ed"`,
    );
    await queryRunner.query(`DROP TABLE "budgets"`);
    await queryRunner.query(`DROP TYPE "public"."budgets_status_enum"`);
    await queryRunner.query(`DROP TABLE "budget_items"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    await queryRunner.query(`DROP TABLE "journals"`);
    await queryRunner.query(`DROP TYPE "public"."journals_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."journals_status_enum"`);
    await queryRunner.query(`DROP TABLE "journal_items"`);
    await queryRunner.query(`DROP TYPE "public"."journal_items_type_enum"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_type_enum"`);
    await queryRunner.query(`DROP TABLE "fiscal_periods"`);
    await queryRunner.query(`DROP TYPE "public"."fiscal_periods_status_enum"`);
  }
}
