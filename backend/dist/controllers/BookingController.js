"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Booking_1 = require("../entities/Booking");
const BookingService_1 = __importDefault(require("../services/BookingService"));
class BookingController {
    constructor() {
        this.bookingRepository = data_source_1.AppDataSource.getRepository(Booking_1.Booking);
    }
    async getAllBookings(req, res) {
        try {
            const bookings = await this.bookingRepository.find({
                relations: ['roomingBookings', 'roomingBookings.roomingList'],
            });
            return res.status(200).json({
                message: "Bookings encontrados com sucesso",
                bookings
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar bookings",
                error: error.message
            });
        }
    }
    async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.bookingRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['roomingBookings', 'roomingBookings.roomingList'],
            });
            if (!booking) {
                return res.status(404).json({
                    message: "Booking não encontrado"
                });
            }
            return res.json({
                message: "Booking encontrado com sucesso",
                booking
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar booking",
                error: error.message
            });
        }
    }
    async createBooking(req, res) {
        try {
            const data = req.body;
            try {
                BookingService_1.default.validateCreateBooking(data);
            }
            catch (validationError) {
                return res.status(400).json({
                    message: "Preencha todos os campos obrigatórios!",
                    error: validationError.message
                });
            }
            const booking = await BookingService_1.default.createBooking(data);
            return res.status(201).json({
                message: "Booking criado com sucesso",
                booking
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Erro ao criar booking",
                error: error.message
            });
        }
    }
}
exports.default = new BookingController();
