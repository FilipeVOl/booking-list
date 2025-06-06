import { Router } from "express";
import BookingController from "../controllers/BookingController";

const bookingRoutes = Router();

bookingRoutes.get('/', BookingController.getAllBookings.bind(BookingController) as any);
bookingRoutes.get('/:id', BookingController.getBookingById.bind(BookingController) as any);
bookingRoutes.post('/create', BookingController.createBooking.bind(BookingController) as any);

export { bookingRoutes };