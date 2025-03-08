import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersCreateEmploymentTable1741425009751
  implements MigrationInterface
{
  name = 'UsersCreateEmploymentTable1741425009751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_employments_employmentstatus_enum" AS ENUM('active', 'onLeave', 'terminated', 'suspended')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_employments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "employeeId" character varying, "hireDate" date, "terminationDate" date, "employmentStatus" "public"."user_employments_employmentstatus_enum" NOT NULL DEFAULT 'active', "departmentId" uuid, "positionId" uuid, "managerId" uuid, CONSTRAINT "REL_a6b903703bf123d0678409ec40" UNIQUE ("userId"), CONSTRAINT "PK_0d89d040cc8966c33acb4ed7d00" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" ADD CONSTRAINT "FK_a6b903703bf123d0678409ec408" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" ADD CONSTRAINT "FK_efc23b7d075f7b52a4b1627c268" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" ADD CONSTRAINT "FK_82cd516b6297484873ee3558bbe" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" ADD CONSTRAINT "FK_50228c60ffdef2cd9e79b4de378" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_employments" DROP CONSTRAINT "FK_50228c60ffdef2cd9e79b4de378"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" DROP CONSTRAINT "FK_82cd516b6297484873ee3558bbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" DROP CONSTRAINT "FK_efc23b7d075f7b52a4b1627c268"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_employments" DROP CONSTRAINT "FK_a6b903703bf123d0678409ec408"`,
    );
    await queryRunner.query(`DROP TABLE "user_employments"`);
    await queryRunner.query(
      `DROP TYPE "public"."user_employments_employmentstatus_enum"`,
    );
  }
}
