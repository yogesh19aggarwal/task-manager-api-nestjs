import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTask1740564248639 implements MigrationInterface {
    name = 'UpdateTask1740564248639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`);
    }

}
