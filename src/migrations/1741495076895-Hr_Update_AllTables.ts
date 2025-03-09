import { MigrationInterface, QueryRunner } from 'typeorm';

export class HrUpdateAllTables1741495076895 implements MigrationInterface {
  name = 'HrUpdateAllTables1741495076895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_titles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "departmentId" character varying, "responsibilities" text, "qualifications" text, "requiredSkills" json, "isActive" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_f53460dc5c379fd92e9f3f7df4e" UNIQUE ("code"), CONSTRAINT "PK_09ddf4ace4b8a6a11ba4ce439e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employees_employmenttype_enum" AS ENUM('fullTime', 'partTime', 'contract', 'temporary', 'intern', 'consultant')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employees_status_enum" AS ENUM('active', 'probation', 'leaveOfAbsence', 'suspended', 'terminated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "employeeNumber" character varying NOT NULL, "departmentId" uuid, "positionId" uuid, "jobTitleId" uuid, "employmentType" "public"."employees_employmenttype_enum" NOT NULL DEFAULT 'fullTime', "status" "public"."employees_status_enum" NOT NULL DEFAULT 'active', "hireDate" date NOT NULL, "terminationDate" date, "probationEndDate" date, "managerId" uuid, "baseSalary" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "payPeriod" character varying NOT NULL DEFAULT 'monthly', "bankName" character varying, "accountNumber" character varying, "accountHolderName" character varying, "emergencyContactName" character varying, "emergencyContactPhone" character varying, "emergencyContactRelationship" character varying, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_1de36734659e4fb0b941bd4b6e4" UNIQUE ("employeeNumber"), CONSTRAINT "REL_737991e10350d9626f592894ce" UNIQUE ("userId"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trainings_type_enum" AS ENUM('onboarding', 'technical', 'softSkills', 'compliance', 'leadership', 'safety', 'certification', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trainings_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trainings_method_enum" AS ENUM('online', 'offline', 'hybrid', 'selfStudy', 'onTheJob')`,
    );
    await queryRunner.query(
      `CREATE TABLE "trainings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."trainings_type_enum" NOT NULL DEFAULT 'other', "status" "public"."trainings_status_enum" NOT NULL DEFAULT 'planned', "method" "public"."trainings_method_enum" NOT NULL DEFAULT 'offline', "instructorId" uuid, "startDate" date NOT NULL, "endDate" date NOT NULL, "durationHours" integer NOT NULL DEFAULT '0', "location" character varying, "url" character varying, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "maxParticipants" integer, "currentParticipants" integer NOT NULL DEFAULT '0', "targetDepartmentId" uuid, "materialsUrl" character varying, "evaluationMethod" character varying, "completionCriteria" character varying, "certificateProvided" boolean NOT NULL DEFAULT false, "isMandatory" boolean NOT NULL DEFAULT false, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_8b63c672544976e707cab1dadf8" UNIQUE ("code"), CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recruitments_status_enum" AS ENUM('draft', 'open', 'inProgress', 'onHold', 'closed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recruitments_type_enum" AS ENUM('fullTime', 'partTime', 'contract', 'temporary', 'intern', 'consultant')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recruitments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."recruitments_status_enum" NOT NULL DEFAULT 'draft', "type" "public"."recruitments_type_enum" NOT NULL DEFAULT 'fullTime', "departmentId" uuid, "positionId" uuid, "jobTitleId" uuid, "recruiterId" uuid, "headcount" integer NOT NULL DEFAULT '1', "startDate" date NOT NULL, "endDate" date, "minSalary" numeric(15,2), "maxSalary" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "isNegotiable" boolean NOT NULL DEFAULT false, "location" character varying, "isRemote" boolean NOT NULL DEFAULT false, "requirements" text, "preferences" text, "process" text, "jobPostingUrl" character varying, "applicantCount" integer NOT NULL DEFAULT '0', "interviewCount" integer NOT NULL DEFAULT '0', "offerCount" integer NOT NULL DEFAULT '0', "hiredCount" integer NOT NULL DEFAULT '0', "notes" text, "additionalInfo" json, CONSTRAINT "UQ_4a332fc58f3a7671ef0b6fb060a" UNIQUE ("code"), CONSTRAINT "PK_4e63272ea2bc161c08ba2257e87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."benefits_type_enum" AS ENUM('healthInsurance', 'retirement', 'paidTimeOff', 'wellness', 'education', 'transportation', 'meal', 'housing', 'childcare', 'stockOption', 'bonus', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."benefits_status_enum" AS ENUM('active', 'inactive', 'planned')`,
    );
    await queryRunner.query(
      `CREATE TABLE "benefits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."benefits_type_enum" NOT NULL DEFAULT 'other', "status" "public"."benefits_status_enum" NOT NULL DEFAULT 'active', "startDate" date NOT NULL, "endDate" date, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "frequency" character varying, "provider" character varying, "providerContact" character varying, "contractNumber" character varying, "contractUrl" character varying, "targetDepartmentId" uuid, "targetPositionId" uuid, "minTenureMonths" integer, "applicationProcess" text, "applicationUrl" character varying, "applicationDeadline" date, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_a8fcba397127b5b9cd972c05e59" UNIQUE ("code"), CONSTRAINT "PK_f83fd5765028f20487943258b46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training_participants" ("trainingId" uuid NOT NULL, "employeeId" uuid NOT NULL, CONSTRAINT "PK_557ce9bfa7955e46e85ea089a25" PRIMARY KEY ("trainingId", "employeeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6683bff4f3262946fc8d8926aa" ON "training_participants" ("trainingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab2560ae65b646bc1aaf8cde67" ON "training_participants" ("employeeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_benefits" ("benefitId" uuid NOT NULL, "employeeId" uuid NOT NULL, CONSTRAINT "PK_9e9c62691e5285460b15cd33aee" PRIMARY KEY ("benefitId", "employeeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_435ba1ba0c66449dcff8639f5b" ON "employee_benefits" ("benefitId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f43be90b3f81a81a4163277d1" ON "employee_benefits" ("employeeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "parentId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minSalary" numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "maxSalary" numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "currency" character varying NOT NULL DEFAULT 'KRW'`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minExperienceYears" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minEducationLevel" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "requiredSkills" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "sortOrder" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_737991e10350d9626f592894ce9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_f44c0dd3c91e32be5f9f362c58d" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0ef3e57cb39edd876f5a5d7c8c5" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_2c4548b7fc930322e263d0bf3ca" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_b9e8c9a0f6c2f0a3d9a5e77d2b3" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_a0d575f29d1e68e8e6db7b28a19" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c7ed642c5a4a86d0f644e31a1e7" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0a" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0b" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0c" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0d" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0e" FOREIGN KEY ("targetPositionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_6683bff4f3262946fc8d8926aa5" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde67c" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_435ba1ba0c66449dcff8639f5b5" FOREIGN KEY ("benefitId") REFERENCES "benefits"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_8f43be90b3f81a81a4163277d1c" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_8f43be90b3f81a81a4163277d1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_435ba1ba0c66449dcff8639f5b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde67c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_6683bff4f3262946fc8d8926aa5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c7ed642c5a4a86d0f644e31a1e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_a0d575f29d1e68e8e6db7b28a19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_b9e8c9a0f6c2f0a3d9a5e77d2b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_2c4548b7fc930322e263d0bf3ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0ef3e57cb39edd876f5a5d7c8c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_f44c0dd3c91e32be5f9f362c58d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_737991e10350d9626f592894ce9"`,
    );
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "sortOrder"`);
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "requiredSkills"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "minEducationLevel"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "minExperienceYears"`,
    );
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "currency"`);
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "maxSalary"`);
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "minSalary"`);
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "parentId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8f43be90b3f81a81a4163277d1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_435ba1ba0c66449dcff8639f5b"`,
    );
    await queryRunner.query(`DROP TABLE "employee_benefits"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab2560ae65b646bc1aaf8cde67"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6683bff4f3262946fc8d8926aa"`,
    );
    await queryRunner.query(`DROP TABLE "training_participants"`);
    await queryRunner.query(`DROP TABLE "benefits"`);
    await queryRunner.query(`DROP TYPE "public"."benefits_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."benefits_type_enum"`);
    await queryRunner.query(`DROP TABLE "recruitments"`);
    await queryRunner.query(`DROP TYPE "public"."recruitments_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."recruitments_status_enum"`);
    await queryRunner.query(`DROP TABLE "trainings"`);
    await queryRunner.query(`DROP TYPE "public"."trainings_method_enum"`);
    await queryRunner.query(`DROP TYPE "public"."trainings_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."trainings_type_enum"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TYPE "public"."employees_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."employees_employmenttype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "job_titles"`);
  }
}
