import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBookingIdColumn1749242162425 implements MigrationInterface {
    name = 'FixBookingIdColumn1749242162425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_5a0c8db271de6319d8e64524882"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_ec69e46702b31bb91935023ce5b" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_ec69e46702b31bb91935023ce5b"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "bookingId" bigint`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_5a0c8db271de6319d8e64524882" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
