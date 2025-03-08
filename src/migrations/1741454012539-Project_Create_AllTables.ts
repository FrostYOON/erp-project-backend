import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectCreateAllTables1741454012539 implements MigrationInterface {
  name = 'ProjectCreateAllTables1741454012539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."project_milestones_status_enum" AS ENUM('pending', 'inProgress', 'completed', 'delayed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_milestones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, "status" "public"."project_milestones_status_enum" NOT NULL DEFAULT 'pending', "projectId" uuid NOT NULL, "dueDate" date NOT NULL, "completionDate" date, "progress" double precision NOT NULL DEFAULT '0', "sequence" integer NOT NULL DEFAULT '0', "color" character varying, "notes" text, "attachments" json, CONSTRAINT "PK_0c561300a12c6ba3ad793dff4b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_tasks_status_enum" AS ENUM('todo', 'inProgress', 'review', 'done', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_tasks_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."project_tasks_status_enum" NOT NULL DEFAULT 'todo', "priority" "public"."project_tasks_priority_enum" NOT NULL DEFAULT 'medium', "projectId" uuid NOT NULL, "parentTaskId" uuid, "milestoneId" uuid, "assigneeId" uuid, "createdByUserId" uuid NOT NULL, "startDate" date NOT NULL, "dueDate" date NOT NULL, "actualStartDate" date, "actualEndDate" date, "estimatedHours" double precision NOT NULL DEFAULT '0', "actualHours" double precision NOT NULL DEFAULT '0', "progress" double precision NOT NULL DEFAULT '0', "tags" json, "notes" text, "attachments" json, CONSTRAINT "PK_b1b6204912a6f44133df3a4518b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_resources_type_enum" AS ENUM('human', 'equipment', 'material', 'service')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "projectId" uuid NOT NULL, "type" "public"."project_resources_type_enum" NOT NULL DEFAULT 'human', "name" character varying NOT NULL, "description" character varying, "userId" uuid, "startDate" date NOT NULL, "endDate" date NOT NULL, "allocationPercentage" double precision NOT NULL DEFAULT '100', "hourlyRate" numeric(15,2), "totalCost" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "notes" character varying, "tags" json, CONSTRAINT "PK_eb70b404ac252d33a6aec260608" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."projects_status_enum" AS ENUM('planning', 'active', 'onHold', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."projects_priority_enum" AS ENUM('low', 'medium', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'planning', "priority" "public"."projects_priority_enum" NOT NULL DEFAULT 'medium', "startDate" date NOT NULL, "endDate" date NOT NULL, "actualStartDate" date, "actualEndDate" date, "budget" numeric(15,2) NOT NULL DEFAULT '0', "actualCost" numeric(15,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'KRW', "progress" double precision NOT NULL DEFAULT '0', "managerId" uuid NOT NULL, "customerId" uuid, "departmentId" uuid, "category" character varying, "tags" json, "notes" text, "attachments" json, CONSTRAINT "UQ_d95a87318392465ab663a32cc4f" UNIQUE ("code"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."time_entries_status_enum" AS ENUM('draft', 'submitted', 'approved', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "time_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "projectId" uuid NOT NULL, "taskId" uuid NOT NULL, "date" date NOT NULL, "startTime" TIME, "endTime" TIME, "hours" double precision NOT NULL, "description" text, "isBillable" boolean NOT NULL DEFAULT true, "status" "public"."time_entries_status_enum" NOT NULL DEFAULT 'draft', "approvedByUserId" uuid, "approvedDate" date, "notes" character varying, "tags" json, CONSTRAINT "PK_b8bc5f10269ba2fe88708904aa0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_risks_status_enum" AS ENUM('identified', 'analyzed', 'planned', 'monitored', 'occurred', 'mitigated', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_risks_impact_enum" AS ENUM('low', 'medium', 'high', 'severe')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_risks_probability_enum" AS ENUM('unlikely', 'possible', 'likely', 'veryLikely')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_risks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."project_risks_status_enum" NOT NULL DEFAULT 'identified', "projectId" uuid NOT NULL, "identifiedByUserId" uuid NOT NULL, "assigneeId" uuid, "identifiedDate" date NOT NULL, "impact" "public"."project_risks_impact_enum" NOT NULL DEFAULT 'medium', "probability" "public"."project_risks_probability_enum" NOT NULL DEFAULT 'possible', "score" double precision NOT NULL DEFAULT '0', "category" character varying, "triggerEvents" text, "responseStrategy" text, "responsePlan" text, "contingencyPlan" text, "estimatedCost" numeric(15,2), "actualCost" numeric(15,2), "currency" character varying NOT NULL DEFAULT 'KRW', "notes" text, "tags" json, "attachments" json, CONSTRAINT "PK_6a3d2c8ce5a1d7e807acb7a320e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_documents_type_enum" AS ENUM('plan', 'specification', 'report', 'meeting', 'contract', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text, "type" "public"."project_documents_type_enum" NOT NULL DEFAULT 'other', "projectId" uuid NOT NULL, "createdByUserId" uuid NOT NULL, "fileUrl" character varying NOT NULL, "fileName" character varying NOT NULL, "fileSize" integer, "fileType" character varying, "version" character varying NOT NULL DEFAULT '1.0', "category" character varying, "tags" json, "notes" character varying, CONSTRAINT "PK_c0d7fa982569e84a809aa2ff5d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_issues_type_enum" AS ENUM('bug', 'feature', 'task', 'improvement', 'question')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_issues_status_enum" AS ENUM('open', 'inProgress', 'resolved', 'closed', 'reopened')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_issues_priority_enum" AS ENUM('low', 'medium', 'high', 'critical')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_issues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "number" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."project_issues_type_enum" NOT NULL DEFAULT 'task', "status" "public"."project_issues_status_enum" NOT NULL DEFAULT 'open', "priority" "public"."project_issues_priority_enum" NOT NULL DEFAULT 'medium', "projectId" uuid NOT NULL, "taskId" uuid, "reportedByUserId" uuid NOT NULL, "assigneeId" uuid, "reportedDate" date NOT NULL, "dueDate" date, "resolvedDate" date, "resolution" text, "environment" character varying, "version" character varying, "tags" json, "notes" text, "attachments" json, CONSTRAINT "PK_d80ed7d327961e73db16b91178b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_task_relations" ("taskId" uuid NOT NULL, "relatedTaskId" uuid NOT NULL, CONSTRAINT "PK_08f84e20e613ca476d8895ba16c" PRIMARY KEY ("taskId", "relatedTaskId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9c11aad49c4e5b797f57d6fbb" ON "project_task_relations" ("taskId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f53a18e2327c111bff8c53151" ON "project_task_relations" ("relatedTaskId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_team_members" ("projectId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_982b92142a516def26bd2dbbce7" PRIMARY KEY ("projectId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f3370a56d2658d30d7583cf12" ON "project_team_members" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2bf9760255963dffa52be49311" ON "project_team_members" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_issue_relations" ("issueId" uuid NOT NULL, "relatedIssueId" uuid NOT NULL, CONSTRAINT "PK_38fd02e492a08d2677a36912c6c" PRIMARY KEY ("issueId", "relatedIssueId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f7f37a9804bb941880fc2a717" ON "project_issue_relations" ("issueId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b588d0fc3db5e706696d89499a" ON "project_issue_relations" ("relatedIssueId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "project_milestones" ADD CONSTRAINT "FK_9fb847267f120c4cdbbb28b408b" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_8691c10b6396e041f4b6d48f8a0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_ef7da82084d0de2927d7f95579c" FOREIGN KEY ("parentTaskId") REFERENCES "project_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_3f199265670ab88316db98b3a04" FOREIGN KEY ("milestoneId") REFERENCES "project_milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_93a4d0b7104d25258865d9f6485" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_88a2d847ca7e65a27db96460e76" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_resources" ADD CONSTRAINT "FK_7daf99e05009e54cb1c3600e145" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_resources" ADD CONSTRAINT "FK_abcd7d32cdaa20bc6a43c3ef0f9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_239dec66b26610938a98a7b7bd3" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_1699d6164673cbc856b9107b847" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_a63577f1af41220752b20fb58c6" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" ADD CONSTRAINT "FK_d1b452d7f0d45863303b7d30000" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" ADD CONSTRAINT "FK_f051d95ecf3cd671445ef0c9be8" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" ADD CONSTRAINT "FK_8cfb57662e88d7c65010311661d" FOREIGN KEY ("taskId") REFERENCES "project_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" ADD CONSTRAINT "FK_5bb7c985aa68273b085282d4dd7" FOREIGN KEY ("approvedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" ADD CONSTRAINT "FK_f8e1e857c806d91d7b5162878e1" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" ADD CONSTRAINT "FK_bac42dfb8481dcbda2fe9f5cb26" FOREIGN KEY ("identifiedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" ADD CONSTRAINT "FK_41ea2a3a7c92c99c10f376bc293" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" ADD CONSTRAINT "FK_f45c0dc27313262f03ef705df1d" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" ADD CONSTRAINT "FK_a4b90a889f0c604a40303fd59cc" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" ADD CONSTRAINT "FK_ea2d9134215d1c7e59d19342287" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" ADD CONSTRAINT "FK_1256b61c56d35830597286243d4" FOREIGN KEY ("taskId") REFERENCES "project_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" ADD CONSTRAINT "FK_a5dc631b30c8186f35f1100d8fb" FOREIGN KEY ("reportedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" ADD CONSTRAINT "FK_6b4a7d9763d43246a85380821ce" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_task_relations" ADD CONSTRAINT "FK_f9c11aad49c4e5b797f57d6fbb4" FOREIGN KEY ("taskId") REFERENCES "project_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_task_relations" ADD CONSTRAINT "FK_2f53a18e2327c111bff8c53151b" FOREIGN KEY ("relatedTaskId") REFERENCES "project_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_team_members" ADD CONSTRAINT "FK_0f3370a56d2658d30d7583cf12b" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_team_members" ADD CONSTRAINT "FK_2bf9760255963dffa52be49311c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issue_relations" ADD CONSTRAINT "FK_0f7f37a9804bb941880fc2a7178" FOREIGN KEY ("issueId") REFERENCES "project_issues"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issue_relations" ADD CONSTRAINT "FK_b588d0fc3db5e706696d89499ad" FOREIGN KEY ("relatedIssueId") REFERENCES "project_issues"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_issue_relations" DROP CONSTRAINT "FK_b588d0fc3db5e706696d89499ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issue_relations" DROP CONSTRAINT "FK_0f7f37a9804bb941880fc2a7178"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_team_members" DROP CONSTRAINT "FK_2bf9760255963dffa52be49311c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_team_members" DROP CONSTRAINT "FK_0f3370a56d2658d30d7583cf12b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_task_relations" DROP CONSTRAINT "FK_2f53a18e2327c111bff8c53151b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_task_relations" DROP CONSTRAINT "FK_f9c11aad49c4e5b797f57d6fbb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" DROP CONSTRAINT "FK_6b4a7d9763d43246a85380821ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" DROP CONSTRAINT "FK_a5dc631b30c8186f35f1100d8fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" DROP CONSTRAINT "FK_1256b61c56d35830597286243d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_issues" DROP CONSTRAINT "FK_ea2d9134215d1c7e59d19342287"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" DROP CONSTRAINT "FK_a4b90a889f0c604a40303fd59cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" DROP CONSTRAINT "FK_f45c0dc27313262f03ef705df1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" DROP CONSTRAINT "FK_41ea2a3a7c92c99c10f376bc293"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" DROP CONSTRAINT "FK_bac42dfb8481dcbda2fe9f5cb26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_risks" DROP CONSTRAINT "FK_f8e1e857c806d91d7b5162878e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" DROP CONSTRAINT "FK_5bb7c985aa68273b085282d4dd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" DROP CONSTRAINT "FK_8cfb57662e88d7c65010311661d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" DROP CONSTRAINT "FK_f051d95ecf3cd671445ef0c9be8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_entries" DROP CONSTRAINT "FK_d1b452d7f0d45863303b7d30000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_a63577f1af41220752b20fb58c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_1699d6164673cbc856b9107b847"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_239dec66b26610938a98a7b7bd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_resources" DROP CONSTRAINT "FK_abcd7d32cdaa20bc6a43c3ef0f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_resources" DROP CONSTRAINT "FK_7daf99e05009e54cb1c3600e145"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_88a2d847ca7e65a27db96460e76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_93a4d0b7104d25258865d9f6485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_3f199265670ab88316db98b3a04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_ef7da82084d0de2927d7f95579c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_8691c10b6396e041f4b6d48f8a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_milestones" DROP CONSTRAINT "FK_9fb847267f120c4cdbbb28b408b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b588d0fc3db5e706696d89499a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f7f37a9804bb941880fc2a717"`,
    );
    await queryRunner.query(`DROP TABLE "project_issue_relations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2bf9760255963dffa52be49311"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f3370a56d2658d30d7583cf12"`,
    );
    await queryRunner.query(`DROP TABLE "project_team_members"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f53a18e2327c111bff8c53151"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9c11aad49c4e5b797f57d6fbb"`,
    );
    await queryRunner.query(`DROP TABLE "project_task_relations"`);
    await queryRunner.query(`DROP TABLE "project_issues"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_issues_priority_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."project_issues_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."project_issues_type_enum"`);
    await queryRunner.query(`DROP TABLE "project_documents"`);
    await queryRunner.query(`DROP TYPE "public"."project_documents_type_enum"`);
    await queryRunner.query(`DROP TABLE "project_risks"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_risks_probability_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."project_risks_impact_enum"`);
    await queryRunner.query(`DROP TYPE "public"."project_risks_status_enum"`);
    await queryRunner.query(`DROP TABLE "time_entries"`);
    await queryRunner.query(`DROP TYPE "public"."time_entries_status_enum"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TYPE "public"."projects_priority_enum"`);
    await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    await queryRunner.query(`DROP TABLE "project_resources"`);
    await queryRunner.query(`DROP TYPE "public"."project_resources_type_enum"`);
    await queryRunner.query(`DROP TABLE "project_tasks"`);
    await queryRunner.query(`DROP TYPE "public"."project_tasks_priority_enum"`);
    await queryRunner.query(`DROP TYPE "public"."project_tasks_status_enum"`);
    await queryRunner.query(`DROP TABLE "project_milestones"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_milestones_status_enum"`,
    );
  }
}
