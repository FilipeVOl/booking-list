import { AppDataSource } from "../config/data-source";
import { Booking } from "../entities/Booking";
import * as path from 'path';
import * as fs from 'fs';

console.log('Iniciando seed de bookings...');

export const bookingSeed = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');

        const bookingRepository = AppDataSource.getRepository(Booking);

        // Verifica se já existe um booking
        const existingBooking = await bookingRepository.count();
        if (existingBooking > 0) {
            console.log("Booking já existem no banco de dados");
            return;
        }

        // Lê o arquivo JSON
        const jsonPath = path.join(__dirname, '../../json/bookings.json');
        const bookingsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        const bookings = bookingsData.map((booking: any) => ({
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
    } catch (error: any) {
        console.error("Erro ao executar o seed de booking:", error);
    }
}

bookingSeed();