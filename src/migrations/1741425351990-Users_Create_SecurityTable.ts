import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersCreateSecurityTable1741425351990
  implements MigrationInterface
{
  name = 'UsersCreateSecurityTable1741425351990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_securities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "isMfaEnabled" boolean NOT NULL DEFAULT false, "mfaSecret" character varying, "lastLoginAt" TIMESTAMP, "lastLoginIp" character varying, "failedLoginAttempts" integer NOT NULL DEFAULT '0', CONSTRAINT "REL_06162acfdb3638ab298e650955" UNIQUE ("userId"), CONSTRAINT "PK_1d5dd7c2405098ed45cc0e8d618" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_securities" ADD CONSTRAINT "FK_06162acfdb3638ab298e650955b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_securities" DROP CONSTRAINT "FK_06162acfdb3638ab298e650955b"`,
    );
    await queryRunner.query(`DROP TABLE "user_securities"`);
  }
}
