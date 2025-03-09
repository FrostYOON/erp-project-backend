import { MigrationInterface, QueryRunner } from 'typeorm';

export class QualityCreateAllTables1741503198734 implements MigrationInterface {
  name = 'QualityCreateAllTables1741503198734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_820375374e7f627622d18ae9e57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_fee42ad77ae11993729483467d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_c2db54dc6c1d55827f2370e40cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_5771a300d03069e77cce8582636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_18eeb740be4f78357369f9f5f7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_30105502e7561b7336524d7dcdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_737991e10350d9626f592894ce9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_f44c0dd3c91e32be5f9f362c58d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0ef3e57cb39edd876f5a5d7c8c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_2c4548b7fc930322e263d0bf3ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_b9e8c9a0f6c2f0a3d9a5e77d2b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_a0d575f29d1e68e8e6db7b28a19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c7ed642c5a4a86d0f644e31a1e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_6683bff4f3262946fc8d8926aa5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde67c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_435ba1ba0c66449dcff8639f5b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_8f43be90b3f81a81a4163277d1c"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_standards_type_enum" AS ENUM('iso', 'industry', 'internal', 'regulatory', 'customer', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_standards_status_enum" AS ENUM('draft', 'review', 'approved', 'active', 'inactive', 'deprecated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_standards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."quality_standards_type_enum" NOT NULL DEFAULT 'internal', "status" "public"."quality_standards_status_enum" NOT NULL DEFAULT 'draft', "version" character varying NOT NULL, "issueDate" date NOT NULL, "effectiveDate" date NOT NULL, "expirationDate" date, "reviewCycleMonths" integer, "nextReviewDate" date, "ownerId" uuid, "departmentId" uuid, "documentUrl" character varying, "references" text, "scope" text, "requirements" text, "measurementMethod" text, "acceptanceCriteria" text, "conformityAssessment" text, "regulations" text, "certifications" text, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_414b7ff4f8fe6d857d0f95a8e0b" UNIQUE ("code"), CONSTRAINT "PK_aeac940be3b7656800253a57e5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_trainings_type_enum" AS ENUM('onboarding', 'refresher', 'certification', 'compliance', 'process', 'product', 'system', 'tool', 'standard', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_trainings_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'cancelled', 'delayed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_trainings_method_enum" AS ENUM('classroom', 'online', 'hybrid', 'selfStudy', 'onTheJob', 'workshop', 'seminar')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_trainings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."quality_trainings_type_enum" NOT NULL DEFAULT 'process', "status" "public"."quality_trainings_status_enum" NOT NULL DEFAULT 'planned', "method" "public"."quality_trainings_method_enum" NOT NULL DEFAULT 'classroom', "instructorId" uuid, "departmentId" uuid, "standardId" uuid, "startDate" date NOT NULL, "endDate" date NOT NULL, "durationHours" integer NOT NULL DEFAULT '0', "location" character varying, "url" character varying, "objectives" text, "content" text, "targetAudience" text, "prerequisites" text, "participantCount" integer NOT NULL DEFAULT '0', "maxParticipants" integer, "materialsUrl" character varying, "evaluationMethod" text, "completionCriteria" character varying, "certificateProvided" boolean NOT NULL DEFAULT false, "effectivenessEvaluation" text, "feedback" text, "averageRating" double precision, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_5f15bb4b240357329673c96e17d" UNIQUE ("code"), CONSTRAINT "PK_e49adef3890e521375ab0c17024" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_metrics_type_enum" AS ENUM('defectRate', 'customerSatisfaction', 'firstPassYield', 'processCapability', 'cycleTime', 'costOfQuality', 'complianceRate', 'reworkRate', 'scrapRate', 'meanTimeBetweenFailures', 'meanTimeToRepair', 'onTimeDelivery', 'supplierQuality', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_metrics_status_enum" AS ENUM('active', 'inactive', 'underReview', 'deprecated')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."quality_metrics_type_enum" NOT NULL DEFAULT 'other', "status" "public"."quality_metrics_status_enum" NOT NULL DEFAULT 'active', "formula" text, "unit" character varying, "target" double precision, "upperLimit" double precision, "lowerLimit" double precision, "frequency" character varying, "dataSource" character varying, "measurementMethod" text, "departmentId" uuid, "ownerId" uuid, "standardId" uuid, "startDate" date NOT NULL, "endDate" date, "reviewCycleMonths" integer, "nextReviewDate" date, "importance" integer NOT NULL DEFAULT '3', "weight" double precision NOT NULL DEFAULT '1', "visualizationType" character varying, "dashboardUrl" character varying, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_afce0bdd7be7665ec9e1fe4f4b6" UNIQUE ("code"), CONSTRAINT "PK_6907f99ef4b858481a767028671" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_issues_type_enum" AS ENUM('defect', 'nonconformity', 'deviation', 'customerComplaint', 'auditFinding', 'improvementOpportunity', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_issues_severity_enum" AS ENUM('critical', 'major', 'minor', 'negligible')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_issues_status_enum" AS ENUM('open', 'investigating', 'actionRequired', 'inProgress', 'resolved', 'closed', 'reopened')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_issues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "type" "public"."quality_issues_type_enum" NOT NULL DEFAULT 'defect', "severity" "public"."quality_issues_severity_enum" NOT NULL DEFAULT 'minor', "status" "public"."quality_issues_status_enum" NOT NULL DEFAULT 'open', "discoveredDate" date NOT NULL, "discoveredById" uuid, "location" character varying, "inspectionId" uuid, "affectedItem" character varying NOT NULL, "affectedItemId" character varying, "affectedItemType" character varying, "lotNumber" character varying, "batchNumber" character varying, "quantity" integer, "rootCause" text, "rootCauseAnalysisMethod" character varying, "impactAnalysis" text, "immediateActions" text, "correctiveActions" text, "preventiveActions" text, "assignedToId" uuid, "dueDate" date, "resolvedDate" date, "resolvedById" uuid, "resolution" text, "verificationMethod" text, "verificationResults" text, "verifiedById" uuid, "verificationDate" date, "closedDate" date, "closedById" uuid, "imageUrl" character varying, "documentUrl" character varying, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_02fc88b038cf0e163c8c89ce607" UNIQUE ("code"), CONSTRAINT "PK_2d13602a3820e62ca00daf1b2a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_documents_type_enum" AS ENUM('policy', 'procedure', 'workInstruction', 'form', 'record', 'manual', 'specification', 'plan', 'report', 'certificate', 'template', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_documents_status_enum" AS ENUM('draft', 'review', 'approved', 'published', 'obsolete', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."quality_documents_type_enum" NOT NULL DEFAULT 'procedure', "status" "public"."quality_documents_status_enum" NOT NULL DEFAULT 'draft', "version" character varying NOT NULL, "authorId" uuid, "reviewerId" uuid, "approverId" uuid, "departmentId" uuid, "standardId" uuid, "creationDate" date NOT NULL, "reviewDate" date, "approvalDate" date, "publishDate" date, "effectiveDate" date, "expirationDate" date, "reviewCycleMonths" integer, "nextReviewDate" date, "fileUrl" character varying, "fileName" character varying, "fileSize" bigint, "fileType" character varying, "fileExtension" character varying, "content" text, "references" text, "relatedProcess" character varying, "relatedProduct" character varying, "relatedSystem" character varying, "accessLevel" character varying, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_53d134e6a8aa5f1e00495911871" UNIQUE ("code"), CONSTRAINT "PK_cb6f2d8b035e8ce0ffcbeacb59d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_checkpoints_type_enum" AS ENUM('visual', 'measurement', 'functional', 'documentation', 'process', 'safety', 'environmental', 'regulatory', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_checkpoints_severity_enum" AS ENUM('critical', 'major', 'minor', 'negligible')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_checkpoints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "type" "public"."quality_checkpoints_type_enum" NOT NULL DEFAULT 'visual', "severity" "public"."quality_checkpoints_severity_enum" NOT NULL DEFAULT 'minor', "controlPlanId" uuid, "sequence" integer NOT NULL DEFAULT '0', "stage" character varying, "process" character varying, "characteristic" character varying, "specification" character varying, "tolerance" character varying, "unit" character varying, "measurementMethod" text, "measurementEquipment" character varying, "sampleSize" integer, "samplingFrequency" character varying, "controlMethod" text, "reactionPlan" text, "responsiblePerson" character varying, "recordingMethod" character varying, "imageUrl" character varying, "isActive" boolean NOT NULL DEFAULT true, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_d86d7ea3a29be5d5447718d34ee" UNIQUE ("code"), CONSTRAINT "PK_6e7085d78978fff3acec2b8a931" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_control_plans_type_enum" AS ENUM('process', 'product', 'project', 'system', 'service', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_control_plans_status_enum" AS ENUM('draft', 'review', 'approved', 'active', 'inactive', 'obsolete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_control_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."quality_control_plans_type_enum" NOT NULL DEFAULT 'process', "status" "public"."quality_control_plans_status_enum" NOT NULL DEFAULT 'draft', "version" character varying NOT NULL, "authorId" uuid, "reviewerId" uuid, "approverId" uuid, "departmentId" uuid, "standardId" uuid, "creationDate" date NOT NULL, "reviewDate" date, "approvalDate" date, "effectiveDate" date, "expirationDate" date, "reviewCycleMonths" integer, "nextReviewDate" date, "targetItem" character varying, "targetItemId" character varying, "targetItemType" character varying, "scope" text, "purpose" text, "requirements" text, "riskAssessment" text, "qualityObjectives" text, "qualityMetrics" json, "samplingMethod" text, "inspectionFrequency" character varying, "measurementMethod" text, "acceptanceCriteria" text, "nonconformanceHandling" text, "correctiveActionProcedure" text, "preventiveActionProcedure" text, "documentationControl" text, "recordsManagement" text, "trainingRequirements" text, "responsibilitiesAndAuthorities" text, "resourceRequirements" text, "documentUrl" character varying, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_236aa4321c51ad80b9c6236f9c3" UNIQUE ("code"), CONSTRAINT "PK_611147b848a7da867b2b2acf9a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_audits_type_enum" AS ENUM('internal', 'external', 'supplier', 'certification', 'compliance', 'process', 'product', 'system', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_audits_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'cancelled', 'delayed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_audits_result_enum" AS ENUM('pass', 'passWithFindings', 'fail', 'pending', 'notApplicable')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_audits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."quality_audits_type_enum" NOT NULL DEFAULT 'internal', "status" "public"."quality_audits_status_enum" NOT NULL DEFAULT 'planned', "result" "public"."quality_audits_result_enum" NOT NULL DEFAULT 'pending', "plannedDate" date NOT NULL, "startDate" date, "endDate" date, "departmentId" uuid, "process" character varying, "product" character varying, "system" character varying, "supplier" character varying, "standardId" uuid, "scope" text, "purpose" text, "methodology" text, "checklist" json, "auditorId" uuid, "auditTeam" json, "findings" text, "findingsCount" integer NOT NULL DEFAULT '0', "majorFindingsCount" integer NOT NULL DEFAULT '0', "minorFindingsCount" integer NOT NULL DEFAULT '0', "observationsCount" integer NOT NULL DEFAULT '0', "conclusion" text, "recommendations" text, "followUpPlan" text, "followUpDueDate" date, "followUpCompletionDate" date, "followUpAssigneeId" uuid, "reportUrl" character varying, "evidenceUrl" character varying, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_dd5e3ae0fcfb76a9fef37b4ff4a" UNIQUE ("code"), CONSTRAINT "PK_77384809c50e0b57b212bb1b22c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_actions_type_enum" AS ENUM('immediate', 'corrective', 'preventive', 'improvement', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_actions_priority_enum" AS ENUM('critical', 'high', 'medium', 'low')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_actions_status_enum" AS ENUM('planned', 'inProgress', 'completed', 'verified', 'cancelled', 'delayed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "type" "public"."quality_actions_type_enum" NOT NULL DEFAULT 'corrective', "priority" "public"."quality_actions_priority_enum" NOT NULL DEFAULT 'medium', "status" "public"."quality_actions_status_enum" NOT NULL DEFAULT 'planned', "issueId" uuid, "plannedDate" date NOT NULL, "startDate" date, "dueDate" date NOT NULL, "completionDate" date, "assignedToId" uuid, "createdById" uuid, "completedById" uuid, "verifiedById" uuid, "verificationDate" date, "verificationMethod" text, "verificationResults" text, "effectiveness" text, "cost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "progress" double precision NOT NULL DEFAULT '0', "documentUrl" character varying, "imageUrl" character varying, "tags" json, "notes" text, "additionalInfo" json, CONSTRAINT "UQ_30ffbdfa1ad626bc2c450a3adff" UNIQUE ("code"), CONSTRAINT "PK_cae01f93bb7bba624b65a506aeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality_training_participants" ("trainingId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_e1003b29550d1a80e49dc99c605" PRIMARY KEY ("trainingId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32b5eb5b79885d139a1aeaaa37" ON "quality_training_participants" ("trainingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3bd967efbe440ba1febecbc9f" ON "quality_training_participants" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "maxSalary"`);
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "minSalary"`);
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "sortOrder"`);
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "minEducationLevel"`,
    );
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "currency"`);
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "minExperienceYears"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "requiredSkills"`,
    );
    await queryRunner.query(`ALTER TABLE "positions" DROP COLUMN "parentId"`);
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "fax"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "city"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "lastContactDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "preferredContactMethod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "postalCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "country"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "birthDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "tags"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "socialProfiles"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "segmentId"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "employeeCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "nextContactDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "customerLifetimeValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "lastContactDate"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "addressDetail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "accountManagerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "acquisitionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "annualRevenue"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "industry"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."customers_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "businessNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "acquisitionChannel"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "satisfactionScore"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "attachments"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectedByUserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "actualInspectionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "UQ_e01e2b12fc35ec2414c5e5c9d80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectionQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "workOrderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "productionOrderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "plannedInspectionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "correctiveActions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "resultSummary"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "taxId"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "fax"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "paymentTerms"`,
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "creditLimit"`,
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
      `ALTER TABLE "quality_inspections" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "UQ_418855b32509b9526da76b249d4" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "plannedDate" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "startDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "completionDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectionItem" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectionItemId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectionItemType" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "lotNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "batchNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "quantity" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "sampleSize" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectorId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "approverId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "standardId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "location" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "equipment" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "method" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "criteria" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "resultDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "measurements" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "resultImageUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "resultDocumentUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "actions" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "remarks" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "tags" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "additionalInfo" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "UQ_e01e2b12fc35ec2414c5e5c9d80" UNIQUE ("number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "productId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "productionOrderId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "workOrderId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectionQuantity" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectedByUserId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "plannedInspectionDate" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "actualInspectionDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "resultSummary" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "correctiveActions" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "attachments" json`,
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
    // await queryRunner.query(`ALTER TABLE "customers" ADD "status" "public"."customers_status_enum" NOT NULL DEFAULT 'lead'`);
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
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "notes" character varying`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."quality_inspections_type_enum" RENAME TO "quality_inspections_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_type_enum" AS ENUM('incoming', 'inProcess', 'final', 'periodic', 'random', 'customerComplaint', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" TYPE "public"."quality_inspections_type_enum" USING "type"::"text"::"public"."quality_inspections_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" SET DEFAULT 'final'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" SET DEFAULT 'final'`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."quality_inspections_result_enum" RENAME TO "quality_inspections_result_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_result_enum" AS ENUM('pass', 'fail', 'conditionalPass', 'pending', 'notApplicable')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" TYPE "public"."quality_inspections_result_enum" USING "result"::"text"::"public"."quality_inspections_result_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_result_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "passedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "passedQuantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "failedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "failedQuantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "passedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "passedQuantity" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "failedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "failedQuantity" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ALTER COLUMN "code" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD CONSTRAINT "UQ_e21258bdc3692b44960c623940f" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP CONSTRAINT "UQ_5c70dc5aa01e351730e4ffc929c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "positions" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "positions" ALTER COLUMN "level" DROP DEFAULT`,
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
      `ALTER TABLE "quality_standards" ADD CONSTRAINT "FK_ca6f20057b542af1836b6b15c69" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_standards" ADD CONSTRAINT "FK_baaa355d38e9c107a14ff4dcc82" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" ADD CONSTRAINT "FK_27735672c1eea48fea5e0f31ed4" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" ADD CONSTRAINT "FK_9e137ff1673d2b541feb8eab08a" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" ADD CONSTRAINT "FK_19730ed5bef99a588f2f715be26" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" ADD CONSTRAINT "FK_a885d60ee8eee9c72fb94ff2abd" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" ADD CONSTRAINT "FK_cd1ef4ab7c9bfdabdbbf0dd0310" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" ADD CONSTRAINT "FK_46cdddbf1aa6c169fba9adf75a4" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_43310d53f24e4c95b51dc8a3de3" FOREIGN KEY ("inspectorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_a60fc245a1f6fa46a3e965dd950" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_7e3291026f10112543dadd80ca9" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_f4dbb5af9b48a657023d141c5ee" FOREIGN KEY ("discoveredById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_ff8889da3a1976a27a3b6bcdd71" FOREIGN KEY ("inspectionId") REFERENCES "quality_inspections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_3b127e1bb096392d64355b84341" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_7f705ca620ee6190e8d728a5278" FOREIGN KEY ("resolvedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_82738c25a6f8daaa7758bb64fa3" FOREIGN KEY ("verifiedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" ADD CONSTRAINT "FK_bce56096de226e5394599b66673" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" ADD CONSTRAINT "FK_6a0c48997f39ff7e0ba159cba63" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" ADD CONSTRAINT "FK_f13c31024778cf5429955b004a6" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" ADD CONSTRAINT "FK_96d202eb3c9b28c0cbab21de8bf" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" ADD CONSTRAINT "FK_5ae1026558ed6e0d80895661964" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" ADD CONSTRAINT "FK_93e25a3e6b2d6c17529867b2567" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_checkpoints" ADD CONSTRAINT "FK_b326131c02344ac19f3d5429234" FOREIGN KEY ("controlPlanId") REFERENCES "quality_control_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" ADD CONSTRAINT "FK_095d5f3aae6b1d985f221bb4586" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" ADD CONSTRAINT "FK_370056dc05f70097fbd7b2031be" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" ADD CONSTRAINT "FK_af6b48a11393caf2015d624f9c4" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" ADD CONSTRAINT "FK_ecaeff21e07ab272198bfc17e9f" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" ADD CONSTRAINT "FK_7833cafbfc8009b238d90ba5b47" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" ADD CONSTRAINT "FK_1e6fb107c8040fbbfe7006b0fd8" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" ADD CONSTRAINT "FK_e333c4dbc8e0b062f9647867a2a" FOREIGN KEY ("standardId") REFERENCES "quality_standards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" ADD CONSTRAINT "FK_b24e1e9e8c9447883ad8bcb73a2" FOREIGN KEY ("auditorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" ADD CONSTRAINT "FK_9bbd04282cf21e017ebdedb552e" FOREIGN KEY ("followUpAssigneeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" ADD CONSTRAINT "FK_3e05b9a133833b8a1d8b497e2b5" FOREIGN KEY ("issueId") REFERENCES "quality_issues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" ADD CONSTRAINT "FK_d5fb1ee15bbe30c33cae9693411" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" ADD CONSTRAINT "FK_8797ca5fe92f71132dbe9fa9f1d" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" ADD CONSTRAINT "FK_f23184668343eb522f6566cb7d5" FOREIGN KEY ("completedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" ADD CONSTRAINT "FK_bf68bef8b33862dc26e481786aa" FOREIGN KEY ("verifiedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_737991e10350d9626f592894cef" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_ce0210d6441acd0e094fba8f20a" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_b694b05b8835032ad86218edf3e" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_114e0dcfc1b75a6e39ff7115dab" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_2a6793cc2fa4a0269565890951b" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_824153319026eabcef820474f29" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_ba89c9a3f8970019d2356ddd64f" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_0fede267e9bc699af3d70c399c7" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_9b3ed99d66f1d07d540cf1fb5c5" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_eaaa9bb4d9161a59036d4475c51" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_0ddf5e2738cc585990847ba2098" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_9cffe3dc1841255969b2e6fbd37" FOREIGN KEY ("targetPositionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_820375374e7f627622d18ae9e57" FOREIGN KEY ("accountManagerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_fee42ad77ae11993729483467d2" FOREIGN KEY ("segmentId") REFERENCES "customer_segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_training_participants" ADD CONSTRAINT "FK_32b5eb5b79885d139a1aeaaa374" FOREIGN KEY ("trainingId") REFERENCES "quality_trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_training_participants" ADD CONSTRAINT "FK_c3bd967efbe440ba1febecbc9fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_6683bff4f3262946fc8d8926aa2" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde677" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_435ba1ba0c66449dcff8639f5bb" FOREIGN KEY ("benefitId") REFERENCES "benefits"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_8f43be90b3f81a81a4163277d17" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_8f43be90b3f81a81a4163277d17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" DROP CONSTRAINT "FK_435ba1ba0c66449dcff8639f5bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" DROP CONSTRAINT "FK_6683bff4f3262946fc8d8926aa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_training_participants" DROP CONSTRAINT "FK_c3bd967efbe440ba1febecbc9fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_training_participants" DROP CONSTRAINT "FK_32b5eb5b79885d139a1aeaaa374"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_fee42ad77ae11993729483467d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_820375374e7f627622d18ae9e57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_9cffe3dc1841255969b2e6fbd37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" DROP CONSTRAINT "FK_0ddf5e2738cc585990847ba2098"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_eaaa9bb4d9161a59036d4475c51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_9b3ed99d66f1d07d540cf1fb5c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_0fede267e9bc699af3d70c399c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" DROP CONSTRAINT "FK_ba89c9a3f8970019d2356ddd64f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_824153319026eabcef820474f29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_2a6793cc2fa4a0269565890951b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_114e0dcfc1b75a6e39ff7115dab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_b694b05b8835032ad86218edf3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_ce0210d6441acd0e094fba8f20a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_737991e10350d9626f592894cef"`,
    );
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
      `ALTER TABLE "quality_actions" DROP CONSTRAINT "FK_bf68bef8b33862dc26e481786aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" DROP CONSTRAINT "FK_f23184668343eb522f6566cb7d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" DROP CONSTRAINT "FK_8797ca5fe92f71132dbe9fa9f1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" DROP CONSTRAINT "FK_d5fb1ee15bbe30c33cae9693411"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_actions" DROP CONSTRAINT "FK_3e05b9a133833b8a1d8b497e2b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" DROP CONSTRAINT "FK_9bbd04282cf21e017ebdedb552e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" DROP CONSTRAINT "FK_b24e1e9e8c9447883ad8bcb73a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" DROP CONSTRAINT "FK_e333c4dbc8e0b062f9647867a2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_audits" DROP CONSTRAINT "FK_1e6fb107c8040fbbfe7006b0fd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" DROP CONSTRAINT "FK_7833cafbfc8009b238d90ba5b47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" DROP CONSTRAINT "FK_ecaeff21e07ab272198bfc17e9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" DROP CONSTRAINT "FK_af6b48a11393caf2015d624f9c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" DROP CONSTRAINT "FK_370056dc05f70097fbd7b2031be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_control_plans" DROP CONSTRAINT "FK_095d5f3aae6b1d985f221bb4586"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_checkpoints" DROP CONSTRAINT "FK_b326131c02344ac19f3d5429234"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" DROP CONSTRAINT "FK_93e25a3e6b2d6c17529867b2567"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" DROP CONSTRAINT "FK_5ae1026558ed6e0d80895661964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" DROP CONSTRAINT "FK_96d202eb3c9b28c0cbab21de8bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" DROP CONSTRAINT "FK_f13c31024778cf5429955b004a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_documents" DROP CONSTRAINT "FK_6a0c48997f39ff7e0ba159cba63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_bce56096de226e5394599b66673"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_82738c25a6f8daaa7758bb64fa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_7f705ca620ee6190e8d728a5278"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_3b127e1bb096392d64355b84341"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_ff8889da3a1976a27a3b6bcdd71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_issues" DROP CONSTRAINT "FK_f4dbb5af9b48a657023d141c5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_7e3291026f10112543dadd80ca9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_a60fc245a1f6fa46a3e965dd950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "FK_43310d53f24e4c95b51dc8a3de3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" DROP CONSTRAINT "FK_46cdddbf1aa6c169fba9adf75a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" DROP CONSTRAINT "FK_cd1ef4ab7c9bfdabdbbf0dd0310"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_metrics" DROP CONSTRAINT "FK_a885d60ee8eee9c72fb94ff2abd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" DROP CONSTRAINT "FK_19730ed5bef99a588f2f715be26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" DROP CONSTRAINT "FK_9e137ff1673d2b541feb8eab08a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_trainings" DROP CONSTRAINT "FK_27735672c1eea48fea5e0f31ed4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_standards" DROP CONSTRAINT "FK_baaa355d38e9c107a14ff4dcc82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_standards" DROP CONSTRAINT "FK_ca6f20057b542af1836b6b15c69"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_type_enum_old" AS ENUM('company', 'government', 'individual', 'nonprofit')`,
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
      `ALTER TABLE "positions" ALTER COLUMN "level" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD CONSTRAINT "UQ_5c70dc5aa01e351730e4ffc929c" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" DROP CONSTRAINT "UQ_e21258bdc3692b44960c623940f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ALTER COLUMN "code" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "failedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "failedQuantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "passedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "passedQuantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "failedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "failedQuantity" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "passedQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "passedQuantity" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_result_enum_old" AS ENUM('conditionallyPassed', 'failed', 'passed', 'pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" TYPE "public"."quality_inspections_result_enum_old" USING "result"::"text"::"public"."quality_inspections_result_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "result" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_result_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."quality_inspections_result_enum_old" RENAME TO "quality_inspections_result_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quality_inspections_type_enum_old" AS ENUM('final', 'inProcess', 'incoming', 'outgoing')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ALTER COLUMN "type" TYPE "public"."quality_inspections_type_enum_old" USING "type"::"text"::"public"."quality_inspections_type_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_inspections_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."quality_inspections_type_enum_old" RENAME TO "quality_inspections_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" DROP COLUMN "notes"`,
    );
    await queryRunner.query(`ALTER TABLE "customer_contacts" ADD "notes" text`);
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
      `ALTER TABLE "quality_inspections" DROP COLUMN "attachments"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "correctiveActions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "resultSummary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "actualInspectionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "plannedInspectionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectedByUserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectionQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "workOrderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "productionOrderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "UQ_e01e2b12fc35ec2414c5e5c9d80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "additionalInfo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "tags"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "remarks"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "actions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "resultDocumentUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "resultImageUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "measurements"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "resultDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "criteria"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "method"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "equipment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "standardId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "approverId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "sampleSize"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "batchNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "lotNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectionItemType"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectionItemId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "inspectionItem"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "completionDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "startDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "plannedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP CONSTRAINT "UQ_418855b32509b9526da76b249d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" DROP COLUMN "code"`,
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
      `ALTER TABLE "customers" ADD "creditLimit" numeric(15,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "paymentTerms" integer NOT NULL DEFAULT '30'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "fax" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "taxId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "resultSummary" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "correctiveActions" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "plannedInspectionDate" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "productionOrderId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "workOrderId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectionQuantity" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "UQ_e01e2b12fc35ec2414c5e5c9d80" UNIQUE ("number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "productId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "actualInspectionDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "inspectedByUserId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD "attachments" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "satisfactionScore" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "latitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "acquisitionChannel" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "businessNumber" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_status_enum" AS ENUM('active', 'customer', 'former', 'inactive', 'lead', 'prospect')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "status" "public"."customers_status_enum" NOT NULL DEFAULT 'lead'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "industry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "annualRevenue" numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "acquisitionDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "accountManagerId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "addressDetail" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "longitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "lastContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "customerLifetimeValue" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "nextContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "employeeCount" integer`,
    );
    await queryRunner.query(`ALTER TABLE "customers" ADD "segmentId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "socialProfiles" json`,
    );
    await queryRunner.query(`ALTER TABLE "customer_contacts" ADD "tags" json`);
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "state" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "birthDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "country" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "postalCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "preferredContactMethod" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "lastContactDate" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "city" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_contacts" ADD "fax" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "parentId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "requiredSkills" json`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minExperienceYears" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "currency" character varying NOT NULL DEFAULT 'KRW'`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minEducationLevel" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "sortOrder" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "minSalary" numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "positions" ADD "maxSalary" numeric(15,2)`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c3bd967efbe440ba1febecbc9f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32b5eb5b79885d139a1aeaaa37"`,
    );
    await queryRunner.query(`DROP TABLE "quality_training_participants"`);
    await queryRunner.query(`DROP TABLE "quality_actions"`);
    await queryRunner.query(`DROP TYPE "public"."quality_actions_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_actions_priority_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quality_actions_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_audits"`);
    await queryRunner.query(`DROP TYPE "public"."quality_audits_result_enum"`);
    await queryRunner.query(`DROP TYPE "public"."quality_audits_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."quality_audits_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_control_plans"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_control_plans_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_control_plans_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "quality_checkpoints"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_checkpoints_severity_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_checkpoints_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "quality_documents"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_documents_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quality_documents_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_issues"`);
    await queryRunner.query(`DROP TYPE "public"."quality_issues_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_issues_severity_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quality_issues_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_metrics"`);
    await queryRunner.query(`DROP TYPE "public"."quality_metrics_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."quality_metrics_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_trainings"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_trainings_method_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."quality_trainings_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quality_trainings_type_enum"`);
    await queryRunner.query(`DROP TABLE "quality_standards"`);
    await queryRunner.query(
      `DROP TYPE "public"."quality_standards_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quality_standards_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_8f43be90b3f81a81a4163277d1c" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_benefits" ADD CONSTRAINT "FK_435ba1ba0c66449dcff8639f5b5" FOREIGN KEY ("benefitId") REFERENCES "benefits"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_ab2560ae65b646bc1aaf8cde67c" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_participants" ADD CONSTRAINT "FK_6683bff4f3262946fc8d8926aa5" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0e" FOREIGN KEY ("targetPositionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "benefits" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0d" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0c" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0b" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c9c7beef7c81dd0b35c49fecb0a" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruitments" ADD CONSTRAINT "FK_c7ed642c5a4a86d0f644e31a1e7" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_a0d575f29d1e68e8e6db7b28a19" FOREIGN KEY ("targetDepartmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_b9e8c9a0f6c2f0a3d9a5e77d2b3" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_2c4548b7fc930322e263d0bf3ca" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0ef3e57cb39edd876f5a5d7c8c5" FOREIGN KEY ("jobTitleId") REFERENCES "job_titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_f44c0dd3c91e32be5f9f362c58d" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_737991e10350d9626f592894ce9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_30105502e7561b7336524d7dcdb" FOREIGN KEY ("inspectedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_18eeb740be4f78357369f9f5f7b" FOREIGN KEY ("workOrderId") REFERENCES "work_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_5771a300d03069e77cce8582636" FOREIGN KEY ("productionOrderId") REFERENCES "production_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quality_inspections" ADD CONSTRAINT "FK_c2db54dc6c1d55827f2370e40cb" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_fee42ad77ae11993729483467d2" FOREIGN KEY ("segmentId") REFERENCES "customer_segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_820375374e7f627622d18ae9e57" FOREIGN KEY ("accountManagerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
