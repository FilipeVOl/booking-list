"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Booking_1 = require("../entities/Booking");
class BookingRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Booking_1.Booking);
    }
    async findById(id) {
        return await this.repository.findOne({ where: { id } });
    }
    ;
    create(data) {
        return this.repository.create(data);
    }
    ;
    async save(booking) {
        return await this.repository.save(booking);
    }
    ;
}
exports.default = new BookingRepository();
