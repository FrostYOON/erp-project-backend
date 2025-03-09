import { MigrationInterface, QueryRunner } from 'typeorm';

export class HRCreateAllTables1741451211233 implements MigrationInterface {
  name = 'HRCreateAllTables1741451211233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."work_schedules_type_enum" AS ENUM('regular', 'shift', 'flexible')`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "userId" uuid, "departmentId" uuid, "type" "public"."work_schedules_type_enum" NOT NULL DEFAULT 'regular', "startDate" date NOT NULL, "endDate" date, "workDays" json NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "breakMinutes" integer NOT NULL DEFAULT '60', "totalWorkMinutes" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_f5251879700e5ca0d2e353fa34f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."goals_status_enum" AS ENUM('draft', 'active', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text, "userId" uuid NOT NULL, "performanceId" uuid, "startDate" date NOT NULL, "endDate" date NOT NULL, "weight" double precision NOT NULL DEFAULT '0', "progress" double precision NOT NULL DEFAULT '0', "status" "public"."goals_status_enum" NOT NULL DEFAULT 'draft', "selfScore" double precision, "managerScore" double precision, "finalScore" double precision, "selfComment" text, "managerComment" text, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."performances_period_enum" AS ENUM('quarterly', 'semiAnnual', 'annual')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."performances_status_enum" AS ENUM('pending', 'selfEvaluation', 'managerReview', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "performances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "evaluatorUserId" uuid NOT NULL, "title" character varying NOT NULL, "period" "public"."performances_period_enum" NOT NULL DEFAULT 'annual', "year" integer NOT NULL, "periodNumber" integer, "startDate" date NOT NULL, "endDate" date NOT NULL, "selfScore" double precision, "managerScore" double precision, "finalScore" double precision, "grade" character varying, "selfEvaluation" text, "managerEvaluation" text, "status" "public"."performances_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "PK_7399cb1c8328315f371412d2312" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payroll_items_type_enum" AS ENUM('earning', 'deduction', 'benefit', 'tax')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payroll_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "payrollId" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" "public"."payroll_items_type_enum" NOT NULL, "amount" numeric(15,2) NOT NULL, "calculationType" character varying NOT NULL DEFAULT 'fixed', "percentageValue" double precision, "isTaxable" boolean NOT NULL DEFAULT true, "displayOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c03d4c6f2f5fb77fc771c9c0ba4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payrolls_status_enum" AS ENUM('draft', 'calculated', 'approved', 'paid', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payrolls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "baseSalary" numeric(15,2) NOT NULL, "grossAmount" numeric(15,2) NOT NULL, "totalDeductions" numeric(15,2) NOT NULL, "netAmount" numeric(15,2) NOT NULL, "paymentDate" date, "status" "public"."payrolls_status_enum" NOT NULL DEFAULT 'draft', "note" character varying, "approverUserId" uuid, CONSTRAINT "PK_4fc19dcf3522661435565b5ecf3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "leave_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "code" character varying, "defaultDays" double precision NOT NULL DEFAULT '0', "isPaid" boolean NOT NULL DEFAULT true, "requiresDocumentation" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "minimumUnit" double precision NOT NULL DEFAULT '0.5', "advanceNoticeDays" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e41bb9537ef5e65ee2de2cfa81a" UNIQUE ("name"), CONSTRAINT "PK_359223e0755d19711813cd07394" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."leave_requests_status_enum" AS ENUM('pending', 'approved', 'rejected', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "leave_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "leaveTypeId" uuid NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "days" double precision NOT NULL, "reason" character varying, "status" "public"."leave_requests_status_enum" NOT NULL DEFAULT 'pending', "approverUserId" uuid, "actionDate" TIMESTAMP, "comment" character varying, "documentUrl" character varying, "halfDayType" character varying, CONSTRAINT "PK_d3abcf9a16cef1450129e06fa9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "leave_balances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "leaveTypeId" uuid NOT NULL, "year" integer NOT NULL, "totalDays" double precision NOT NULL, "usedDays" double precision NOT NULL DEFAULT '0', "remainingDays" double precision NOT NULL, "expiryDate" date NOT NULL, "isCarryOver" boolean NOT NULL DEFAULT false, "maxCarryOverDays" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_a1d90dff48fb2bfd23a7163d077" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attendances_type_enum" AS ENUM('normal', 'late', 'earlyLeave', 'absent', 'businessTrip', 'remoteWork', 'overtime')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "workDate" date NOT NULL, "clockInTime" TIMESTAMP, "clockOutTime" TIMESTAMP, "workMinutes" integer, "overtimeMinutes" integer NOT NULL DEFAULT '0', "type" "public"."attendances_type_enum" NOT NULL DEFAULT 'normal', "note" character varying, "ipAddress" character varying, "latitude" double precision, "longitude" double precision, "isApproved" boolean NOT NULL DEFAULT true, "approverUserId" uuid, CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_schedules" ADD CONSTRAINT "FK_3fe6d7c73fd1e4a077955ffcf9d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_schedules" ADD CONSTRAINT "FK_7318d28a203bee8863929575eec" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_4f53a0926f4c873616a0014a231" FOREIGN KEY ("performanceId") REFERENCES "performances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "performances" ADD CONSTRAINT "FK_da6079c6acc00eaaf8ea6a9c779" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "performances" ADD CONSTRAINT "FK_36d94b44634a1253cce18765bab" FOREIGN KEY ("evaluatorUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_items" ADD CONSTRAINT "FK_694657853d5f9bb1abe71901226" FOREIGN KEY ("payrollId") REFERENCES "payrolls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payrolls" ADD CONSTRAINT "FK_c6fa44f3cd1c8b36e3c296dce62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payrolls" ADD CONSTRAINT "FK_3cf536728f7f96516dcfc438dcb" FOREIGN KEY ("approverUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" ADD CONSTRAINT "FK_0cd010879e155a6611f00dc456e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" ADD CONSTRAINT "FK_1a15bd6c14a42bb91c53712a5f4" FOREIGN KEY ("leaveTypeId") REFERENCES "leave_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" ADD CONSTRAINT "FK_b6a449facf6aced91e4f8f5392c" FOREIGN KEY ("approverUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_balances" ADD CONSTRAINT "FK_aae940169a5f4c5df2c79d0e080" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_balances" ADD CONSTRAINT "FK_98f067848742e213d1a55445379" FOREIGN KEY ("leaveTypeId") REFERENCES "leave_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_4619dca922cb64262f312ce0d0c" FOREIGN KEY ("approverUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_4619dca922cb64262f312ce0d0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_balances" DROP CONSTRAINT "FK_98f067848742e213d1a55445379"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_balances" DROP CONSTRAINT "FK_aae940169a5f4c5df2c79d0e080"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_b6a449facf6aced91e4f8f5392c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_1a15bd6c14a42bb91c53712a5f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_0cd010879e155a6611f00dc456e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payrolls" DROP CONSTRAINT "FK_3cf536728f7f96516dcfc438dcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payrolls" DROP CONSTRAINT "FK_c6fa44f3cd1c8b36e3c296dce62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_items" DROP CONSTRAINT "FK_694657853d5f9bb1abe71901226"`,
    );
    await queryRunner.query(
      `ALTER TABLE "performances" DROP CONSTRAINT "FK_36d94b44634a1253cce18765bab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "performances" DROP CONSTRAINT "FK_da6079c6acc00eaaf8ea6a9c779"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" DROP CONSTRAINT "FK_4f53a0926f4c873616a0014a231"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" DROP CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_schedules" DROP CONSTRAINT "FK_7318d28a203bee8863929575eec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_schedules" DROP CONSTRAINT "FK_3fe6d7c73fd1e4a077955ffcf9d"`,
    );
    await queryRunner.query(`DROP TABLE "attendances"`);
    await queryRunner.query(`DROP TYPE "public"."attendances_type_enum"`);
    await queryRunner.query(`DROP TABLE "leave_balances"`);
    await queryRunner.query(`DROP TABLE "leave_requests"`);
    await queryRunner.query(`DROP TYPE "public"."leave_requests_status_enum"`);
    await queryRunner.query(`DROP TABLE "leave_types"`);
    await queryRunner.query(`DROP TABLE "payrolls"`);
    await queryRunner.query(`DROP TYPE "public"."payrolls_status_enum"`);
    await queryRunner.query(`DROP TABLE "payroll_items"`);
    await queryRunner.query(`DROP TYPE "public"."payroll_items_type_enum"`);
    await queryRunner.query(`DROP TABLE "performances"`);
    await queryRunner.query(`DROP TYPE "public"."performances_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."performances_period_enum"`);
    await queryRunner.query(`DROP TABLE "goals"`);
    await queryRunner.query(`DROP TYPE "public"."goals_status_enum"`);
    await queryRunner.query(`DROP TABLE "work_schedules"`);
    await queryRunner.query(`DROP TYPE "public"."work_schedules_type_enum"`);
  }
}
