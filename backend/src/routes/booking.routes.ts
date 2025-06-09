import { Router } from "express";
import BookingController from "../controllers/BookingController";
import Token from "../middlewares/Token";

const bookingRoutes = Router();

bookingRoutes.get('/', Token.authorize.bind(Token) as any, BookingController.getAllBookings.bind(BookingController) as any);
bookingRoutes.get('/:id', Token.authorize.bind(Token) as any, BookingController.getBookingById.bind(BookingController) as any);
bookingRoutes.post('/create', Token.authorize.bind(Token) as any, BookingController.createBooking.bind(BookingController) as any);

export { bookingRoutes };