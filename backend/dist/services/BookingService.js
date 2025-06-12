"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_1 = require("../entities/Booking");
const data_source_1 = require("../config/data-source");
class BookingService {
    validateCreateBooking(data) {
        const requiredFields = ["hotel_id", "event_id", "guest_name", "guest_phone", "checkIn_date", "checkOut_date"];
        requiredFields.forEach((field) => {
            if (!data[field]) {
                throw new Error(`Field ${field} is required`);
            }
        });
    }
    async createBooking(data) {
        try {
            console.log('Validating booking data:', data);
            this.validateCreateBooking(data);
            console.log('Validation passed');
            return await data_source_1.AppDataSource.transaction(async (manager) => {
                const bookingRepository = manager.getRepository(Booking_1.Booking);
                const existingBooking = await bookingRepository.createQueryBuilder('booking')
                    .where('booking.hotel_id = :hotel_id', { hotel_id: data.hotel_id })
                    .andWhere('booking.event_id = :event_id', { event_id: data.event_id })
                    .getOne();
                if (existingBooking) {
                    console.log('existingbooking:', JSON.stringify(existingBooking, null, 2));
                    throw new Error("Booking already exists");
                }
                const booking = bookingRepository.create(data);
                return await bookingRepository.save(booking);
            });
        }
        catch (error) {
            console.log('Error type:', error.constructor.name);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
            if (error.message.includes('Field') && error.message.includes('is required')) {
                throw new Error('Preencha todos os campos obrigatórios!');
            }
            throw new Error('Erro interno do servidor');
        }
    }
}
exports.default = new BookingService();
