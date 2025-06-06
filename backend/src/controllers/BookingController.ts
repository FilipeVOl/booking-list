import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Booking } from "../entities/Booking";
import BookingService from "../services/BookingService";

class BookingController {
    private bookingRepository = AppDataSource.getRepository(Booking);

    async getAllBookings(req: Request, res: Response): Promise<Response> {
        try {
            const bookings = await this.bookingRepository.find({
                relations: ['roomingBookings', 'roomingBookings.roomingList'],
            });

            return res.status(200).json({
                message: "Bookings encontrados com sucesso",
                bookings
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao buscar bookings",
                error: error.message
            });
        }
    }

    async getBookingById(req: Request, res: Response) {
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
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao buscar booking",
                error: error.message
            });
        }
    }

    async createBooking(req: Request, res: Response) {
        try {
            const data = req.body;
            
            try {
                BookingService.validateCreateBooking(data);
            } catch (validationError: any) {
                return res.status(400).json({
                    message: "Preencha todos os campos obrigatórios!",
                    error: validationError.message
                });
            }

            const booking = await BookingService.createBooking(data);

            return res.status(201).json({
                message: "Booking criado com sucesso",
                booking
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar booking",
                error: error.message
            });
        }
    }
}

export default new BookingController();