import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateToBigint1749241804470 implements MigrationInterface {
    name = 'UpdateToBigint1749241804470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_dd83071afe56076158d323cedae"`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" DROP CONSTRAINT "PK_c9c3ceed3f55b773b510536c483"`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" ADD CONSTRAINT "PK_c9c3ceed3f55b773b510536c483" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_5a0c8db271de6319d8e64524882"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "PK_42155953261b7ad066ee242e74e"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "PK_42155953261b7ad066ee242e74e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "roomingList_id"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "roomingList_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "bookingId" bigint`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_bee6805982cc1e248e94ce94957"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_dd83071afe56076158d323cedae" FOREIGN KEY ("roomingList_id") REFERENCES "rooming_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_5a0c8db271de6319d8e64524882" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_5a0c8db271de6319d8e64524882"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_dd83071afe56076158d323cedae"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_bee6805982cc1e248e94ce94957"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "bookingId" integer`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "roomingList_id"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "roomingList_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "PK_42155953261b7ad066ee242e74e"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "PK_42155953261b7ad066ee242e74e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_5a0c8db271de6319d8e64524882" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" DROP CONSTRAINT "PK_c9c3ceed3f55b773b510536c483"`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooming_lists" ADD CONSTRAINT "PK_c9c3ceed3f55b773b510536c483" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_dd83071afe56076158d323cedae" FOREIGN KEY ("roomingList_id") REFERENCES "rooming_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
