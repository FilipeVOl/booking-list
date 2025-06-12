"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const BookingController_1 = __importDefault(require("../controllers/BookingController"));
const Token_1 = __importDefault(require("../middlewares/Token"));
const bookingRoutes = (0, express_1.Router)();
exports.bookingRoutes = bookingRoutes;
bookingRoutes.get('/', Token_1.default.authorize.bind(Token_1.default), BookingController_1.default.getAllBookings.bind(BookingController_1.default));
bookingRoutes.get('/:id', Token_1.default.authorize.bind(Token_1.default), BookingController_1.default.getBookingById.bind(BookingController_1.default));
bookingRoutes.post('/create', Token_1.default.authorize.bind(Token_1.default), BookingController_1.default.createBooking.bind(BookingController_1.default));
