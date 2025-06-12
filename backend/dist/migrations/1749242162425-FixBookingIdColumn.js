"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixBookingIdColumn1749242162425 = void 0;
class FixBookingIdColumn1749242162425 {
    constructor() {
        this.name = 'FixBookingIdColumn1749242162425';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_5a0c8db271de6319d8e64524882"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_ec69e46702b31bb91935023ce5b" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rooming_bookings" DROP CONSTRAINT "FK_ec69e46702b31bb91935023ce5b"`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD "bookingId" bigint`);
        await queryRunner.query(`ALTER TABLE "rooming_bookings" ADD CONSTRAINT "FK_5a0c8db271de6319d8e64524882" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.FixBookingIdColumn1749242162425 = FixBookingIdColumn1749242162425;
