"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSeed = void 0;
const data_source_1 = require("../config/data-source");
const Booking_1 = require("../entities/Booking");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
console.log('Iniciando seed de bookings...');
const bookingSeed = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        const bookingRepository = data_source_1.AppDataSource.getRepository(Booking_1.Booking);
        const existingBooking = await bookingRepository.count();
        if (existingBooking > 0) {
            console.log("Booking já existem no banco de dados");
            return;
        }
        const jsonPath = path.join(__dirname, '../../json/bookings.json');
        const bookingsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const bookings = bookingsData.map((booking) => ({
            hotel_id: booking.hotelId,
            event_id: booking.eventId,
            guest_name: booking.guestName,
            guest_phone: booking.guestPhoneNumber,
            checkIn_date: new Date(booking.checkInDate),
            checkOut_date: new Date(booking.checkOutDate)
        }));
        for (const booking of bookings) {
            const newBooking = bookingRepository.create(booking);
            await bookingRepository.save(newBooking);
            console.log(`Booking criado com sucesso`);
        }
        console.log("Seed de booking executado com sucesso");
    }
    catch (error) {
        console.error("Erro ao executar o seed de booking:", error);
    }
};
exports.bookingSeed = bookingSeed;
(0, exports.bookingSeed)();
