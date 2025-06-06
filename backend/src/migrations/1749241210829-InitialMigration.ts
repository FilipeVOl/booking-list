import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1749241210829 implements MigrationInterface {
    name = 'InitialMigration1749241210829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "refreshToken" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooming_lists" ("id" BIGSERIAL NOT NULL, "event_id" bigint NOT NULL, "hotel_id" bigint NOT NULL, "rfp_name" character varying NOT NULL, "cutOff_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "agreement_type" "public"."rooming_lists_agreement_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9c3ceed3f55b773b510536c483" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooming_bookings" ("id" BIGSERIAL NOT NULL, "roomingList_id" bigint NOT NULL, "booking_id" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bookingId" bigint, CONSTRAINT "PK_42155953261b7ad066ee242e74e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" BIGSERIAL NOT NULL, "hotel_id" bigint NOT NULL, "event_id" bigint NOT NULL, "guest_name" character varying NOT NULL, "guest_phone" character varying, "checkIn_date" TIMESTAMP NOT NULL, "checkOut_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_dd83071afe56076158d323cedae" FOREIGN KEY ("roomingList_id") REFERENCES "rooming_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_5a0c8db271de6319d8e64524882" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_5a0c8db271de6319d8e64524882"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_dd83071afe56076158d323cedae"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "rooming_bookings"`);
        await queryRunner.query(`DROP TABLE "rooming_lists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
