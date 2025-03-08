import { MigrationInterface, QueryRunner } from 'typeorm';

export class DocumentCreateAllTables1741456003417
  implements MigrationInterface
{
  name = 'DocumentCreateAllTables1741456003417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "document_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "parentId" uuid, "sortOrder" integer NOT NULL DEFAULT '0', "icon" character varying, "colorCode" character varying, "isActive" boolean NOT NULL DEFAULT true, "tags" json, CONSTRAINT "UQ_8e24c657ec7b326350a11d122e6" UNIQUE ("code"), CONSTRAINT "PK_672faab02d41a41ffd92ecd69e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "allowedExtensions" json, "maxFileSize" bigint, "icon" character varying, "colorCode" character varying, "isActive" boolean NOT NULL DEFAULT true, "metadataSchema" json, CONSTRAINT "UQ_5c46cecbae576329e689110cbb5" UNIQUE ("code"), CONSTRAINT "PK_d467d7eeb7c8ce216e90e8494aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "colorCode" character varying, "icon" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_09be330b4bf784f90bb24090547" UNIQUE ("name"), CONSTRAINT "PK_3583bb9cb46042427aeb36561ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "documentId" uuid NOT NULL, "versionNumber" integer NOT NULL, "fileName" character varying NOT NULL, "fileSize" bigint NOT NULL, "fileType" character varying NOT NULL, "fileExtension" character varying NOT NULL, "fileUrl" character varying NOT NULL, "fileHash" character varying, "changeLog" text, "createdByUserId" uuid NOT NULL, "metadata" json, "thumbnailUrl" character varying, "previewUrl" character varying, "downloadCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_baf26dab035c6d6fc433f9dc6a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "documentId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "parentId" uuid, "content" text NOT NULL, "pageNumber" integer, "position" json, "isResolved" boolean NOT NULL DEFAULT false, "resolvedByUserId" uuid, "resolvedAt" TIMESTAMP, "attachments" json, CONSTRAINT "PK_200479d42efeede25a2355d7708" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_shares_sharetype_enum" AS ENUM('user', 'department', 'role', 'public', 'link')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_shares_permissionlevel_enum" AS ENUM('view', 'comment', 'edit', 'manage')`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_shares" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "documentId" uuid NOT NULL, "shareType" "public"."document_shares_sharetype_enum" NOT NULL, "targetId" character varying, "permissionLevel" "public"."document_shares_permissionlevel_enum" NOT NULL DEFAULT 'view', "shareLink" character varying, "expiresAt" TIMESTAMP, "password" character varying, "sharedByUserId" uuid NOT NULL, "sharedWithUserId" uuid, "notificationSent" boolean NOT NULL DEFAULT false, "accessCount" integer NOT NULL DEFAULT '0', "lastAccessedAt" TIMESTAMP, "notes" text, CONSTRAINT "PK_69704f195ba1451f13de600e8c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."documents_status_enum" AS ENUM('draft', 'pending', 'approved', 'rejected', 'archived', 'deleted')`,
    );
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "status" "public"."documents_status_enum" NOT NULL DEFAULT 'draft', "categoryId" uuid, "typeId" uuid NOT NULL, "ownerId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "lastModifiedByUserId" uuid, "approvedByUserId" uuid, "approvedAt" TIMESTAMP, "expiryDate" date, "importance" integer NOT NULL DEFAULT '0', "confidentiality" integer NOT NULL DEFAULT '0', "keywords" json, "metadata" json, "currentVersionNumber" integer NOT NULL DEFAULT '1', "viewCount" integer NOT NULL DEFAULT '0', "downloadCount" integer NOT NULL DEFAULT '0', "likeCount" integer NOT NULL DEFAULT '0', "relatedDocumentIds" json, CONSTRAINT "UQ_b5ee64751658da17f074f8884da" UNIQUE ("code"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_workflow_steps_approvertype_enum" AS ENUM('user', 'role', 'department', 'manager', 'dynamic')`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_workflow_steps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workflowId" uuid NOT NULL, "name" character varying NOT NULL, "description" text, "sequence" integer NOT NULL, "approverType" "public"."document_workflow_steps_approvertype_enum" NOT NULL, "approverId" character varying, "approverUserId" uuid, "dynamicApproverRule" json, "isRequired" boolean NOT NULL DEFAULT true, "expiryDays" integer, "notificationSettings" json, "onApproveActions" json, "onRejectActions" json, CONSTRAINT "PK_e933a5e6f38540787074a026a95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_workflows_status_enum" AS ENUM('active', 'inactive', 'draft')`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_workflows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "status" "public"."document_workflows_status_enum" NOT NULL DEFAULT 'draft', "categoryId" uuid, "typeId" uuid, "createdByUserId" uuid NOT NULL, "allStepsRequired" boolean NOT NULL DEFAULT true, "isSequential" boolean NOT NULL DEFAULT true, "autoStart" boolean NOT NULL DEFAULT false, "expiryDays" integer, "notificationSettings" json, CONSTRAINT "UQ_945f06d84def1f6c127e40b853b" UNIQUE ("code"), CONSTRAINT "PK_976a0da605dafa514af6a50e09d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_workflow_instances_status_enum" AS ENUM('pending', 'inProgress', 'completed', 'rejected', 'cancelled', 'expired')`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_workflow_instances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "documentId" uuid NOT NULL, "workflowId" uuid NOT NULL, "status" "public"."document_workflow_instances_status_enum" NOT NULL DEFAULT 'pending', "initiatedByUserId" uuid NOT NULL, "startedAt" TIMESTAMP NOT NULL, "completedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "currentStepSequence" integer NOT NULL DEFAULT '1', "notes" text, CONSTRAINT "PK_16c598bbd48b9efcd6e9854e0d4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."document_workflow_step_instances_status_enum" AS ENUM('pending', 'inProgress', 'approved', 'rejected', 'skipped', 'expired')`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_workflow_step_instances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workflowInstanceId" uuid NOT NULL, "workflowStepId" uuid NOT NULL, "sequence" integer NOT NULL, "status" "public"."document_workflow_step_instances_status_enum" NOT NULL DEFAULT 'pending', "assignedToUserId" uuid NOT NULL, "startedAt" TIMESTAMP, "completedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "decision" text, "comments" text, "notificationSent" boolean NOT NULL DEFAULT false, "notificationSentAt" TIMESTAMP, "reminderSent" boolean NOT NULL DEFAULT false, "reminderSentAt" TIMESTAMP, CONSTRAINT "PK_ded51e276316d7012b7105a99e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "code" character varying NOT NULL, "categoryId" uuid, "typeId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "fileName" character varying NOT NULL, "fileSize" bigint NOT NULL, "fileType" character varying NOT NULL, "fileExtension" character varying NOT NULL, "fileUrl" character varying NOT NULL, "thumbnailUrl" character varying, "previewUrl" character varying, "isActive" boolean NOT NULL DEFAULT true, "metadataSchema" json, "defaultMetadata" json, "usageCount" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_4dfa5bb611939517d690b005240" UNIQUE ("code"), CONSTRAINT "PK_0372838b7b7cd3571aef80466d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_tag_mappings" ("documentId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_d70d13c106fe7b8e2b22b9e5e49" PRIMARY KEY ("documentId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d8a557a864fd94a814f833c88" ON "document_tag_mappings" ("documentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e41853064f08be7c45f6cd91fc" ON "document_tag_mappings" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "document_template_tag_mappings" ("templateId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_5e8948d2c2a078e5bc2014febcb" PRIMARY KEY ("templateId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13a4c5df5b83e09562e6a6cc50" ON "document_template_tag_mappings" ("templateId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da7195910f20e14e81df64ac45" ON "document_template_tag_mappings" ("tagId") `,
    );

    // 외래 키 제약 조건 추가
    await queryRunner.query(
      `ALTER TABLE "document_categories" ADD CONSTRAINT "FK_document_categories_parent" FOREIGN KEY ("parentId") REFERENCES "document_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_category" FOREIGN KEY ("categoryId") REFERENCES "document_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_type" FOREIGN KEY ("typeId") REFERENCES "document_types"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_owner" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_created_by" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_last_modified_by" FOREIGN KEY ("lastModifiedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_approved_by" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_versions" ADD CONSTRAINT "FK_document_versions_document" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_versions" ADD CONSTRAINT "FK_document_versions_created_by" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" ADD CONSTRAINT "FK_document_comments_document" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" ADD CONSTRAINT "FK_document_comments_created_by" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" ADD CONSTRAINT "FK_document_comments_parent" FOREIGN KEY ("parentId") REFERENCES "document_comments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" ADD CONSTRAINT "FK_document_comments_resolved_by" FOREIGN KEY ("resolvedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" ADD CONSTRAINT "FK_document_shares_document" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" ADD CONSTRAINT "FK_document_shares_shared_by" FOREIGN KEY ("sharedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" ADD CONSTRAINT "FK_document_shares_shared_with" FOREIGN KEY ("sharedWithUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" ADD CONSTRAINT "FK_document_templates_category" FOREIGN KEY ("categoryId") REFERENCES "document_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" ADD CONSTRAINT "FK_document_templates_type" FOREIGN KEY ("typeId") REFERENCES "document_types"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" ADD CONSTRAINT "FK_document_templates_created_by" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" ADD CONSTRAINT "FK_document_workflows_category" FOREIGN KEY ("categoryId") REFERENCES "document_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" ADD CONSTRAINT "FK_document_workflows_type" FOREIGN KEY ("typeId") REFERENCES "document_types"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" ADD CONSTRAINT "FK_document_workflows_created_by" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_steps" ADD CONSTRAINT "FK_document_workflow_steps_workflow" FOREIGN KEY ("workflowId") REFERENCES "document_workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_steps" ADD CONSTRAINT "FK_document_workflow_steps_approver" FOREIGN KEY ("approverUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" ADD CONSTRAINT "FK_document_workflow_instances_document" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" ADD CONSTRAINT "FK_document_workflow_instances_workflow" FOREIGN KEY ("workflowId") REFERENCES "document_workflows"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" ADD CONSTRAINT "FK_document_workflow_instances_initiated_by" FOREIGN KEY ("initiatedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" ADD CONSTRAINT "FK_document_workflow_step_instances_workflow_instance" FOREIGN KEY ("workflowInstanceId") REFERENCES "document_workflow_instances"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" ADD CONSTRAINT "FK_document_workflow_step_instances_workflow_step" FOREIGN KEY ("workflowStepId") REFERENCES "document_workflow_steps"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" ADD CONSTRAINT "FK_document_workflow_step_instances_assigned_to" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_tag_mappings" ADD CONSTRAINT "FK_document_tag_mappings_document" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_tag_mappings" ADD CONSTRAINT "FK_document_tag_mappings_tag" FOREIGN KEY ("tagId") REFERENCES "document_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_template_tag_mappings" ADD CONSTRAINT "FK_document_template_tag_mappings_template" FOREIGN KEY ("templateId") REFERENCES "document_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_template_tag_mappings" ADD CONSTRAINT "FK_document_template_tag_mappings_tag" FOREIGN KEY ("tagId") REFERENCES "document_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래 키 제약 조건 제거
    await queryRunner.query(
      `ALTER TABLE "document_template_tag_mappings" DROP CONSTRAINT "FK_document_template_tag_mappings_tag"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_template_tag_mappings" DROP CONSTRAINT "FK_document_template_tag_mappings_template"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_tag_mappings" DROP CONSTRAINT "FK_document_tag_mappings_tag"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_tag_mappings" DROP CONSTRAINT "FK_document_tag_mappings_document"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" DROP CONSTRAINT "FK_document_workflow_step_instances_assigned_to"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" DROP CONSTRAINT "FK_document_workflow_step_instances_workflow_step"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_step_instances" DROP CONSTRAINT "FK_document_workflow_step_instances_workflow_instance"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" DROP CONSTRAINT "FK_document_workflow_instances_initiated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" DROP CONSTRAINT "FK_document_workflow_instances_workflow"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_instances" DROP CONSTRAINT "FK_document_workflow_instances_document"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_steps" DROP CONSTRAINT "FK_document_workflow_steps_approver"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflow_steps" DROP CONSTRAINT "FK_document_workflow_steps_workflow"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" DROP CONSTRAINT "FK_document_workflows_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" DROP CONSTRAINT "FK_document_workflows_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_workflows" DROP CONSTRAINT "FK_document_workflows_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" DROP CONSTRAINT "FK_document_templates_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" DROP CONSTRAINT "FK_document_templates_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_templates" DROP CONSTRAINT "FK_document_templates_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" DROP CONSTRAINT "FK_document_shares_shared_with"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" DROP CONSTRAINT "FK_document_shares_shared_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_shares" DROP CONSTRAINT "FK_document_shares_document"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" DROP CONSTRAINT "FK_document_comments_resolved_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" DROP CONSTRAINT "FK_document_comments_parent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" DROP CONSTRAINT "FK_document_comments_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_comments" DROP CONSTRAINT "FK_document_comments_document"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_versions" DROP CONSTRAINT "FK_document_versions_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_versions" DROP CONSTRAINT "FK_document_versions_document"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_approved_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_last_modified_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_owner"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_categories" DROP CONSTRAINT "FK_document_categories_parent"`,
    );

    // 인덱스 제거
    await queryRunner.query(`DROP INDEX "IDX_da7195910f20e14e81df64ac45"`);
    await queryRunner.query(`DROP INDEX "IDX_13a4c5df5b83e09562e6a6cc50"`);
    await queryRunner.query(`DROP INDEX "IDX_e41853064f08be7c45f6cd91fc"`);
    await queryRunner.query(`DROP INDEX "IDX_6d8a557a864fd94a814f833c88"`);

    // 테이블 제거
    await queryRunner.query(`DROP TABLE "document_template_tag_mappings"`);
    await queryRunner.query(`DROP TABLE "document_tag_mappings"`);
    await queryRunner.query(`DROP TABLE "document_templates"`);
    await queryRunner.query(`DROP TABLE "document_workflow_step_instances"`);
    await queryRunner.query(
      `DROP TYPE "public"."document_workflow_step_instances_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "document_workflow_instances"`);
    await queryRunner.query(
      `DROP TYPE "public"."document_workflow_instances_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "document_workflows"`);
    await queryRunner.query(
      `DROP TYPE "public"."document_workflows_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "document_workflow_steps"`);
    await queryRunner.query(
      `DROP TYPE "public"."document_workflow_steps_approvertype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "documents"`);
    await queryRunner.query(`DROP TYPE "public"."documents_status_enum"`);
    await queryRunner.query(`DROP TABLE "document_shares"`);
    await queryRunner.query(
      `DROP TYPE "public"."document_shares_permissionlevel_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."document_shares_sharetype_enum"`,
    );
    await queryRunner.query(`DROP TABLE "document_comments"`);
    await queryRunner.query(`DROP TABLE "document_versions"`);
    await queryRunner.query(`DROP TABLE "document_tags"`);
    await queryRunner.query(`DROP TABLE "document_types"`);
    await queryRunner.query(`DROP TABLE "document_categories"`);
  }
}
