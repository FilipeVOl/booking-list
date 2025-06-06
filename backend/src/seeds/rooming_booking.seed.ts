import { AppDataSource } from "../config/data-source";
import * as path from 'path';
import * as fs from 'fs';
import { RoomingBooking } from "../entities/RoomingBooking";

console.log('Iniciando seed de rooming-booking list...');

export const roomingBookingSeed = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');

        const roomingBookingRepository = AppDataSource.getRepository(RoomingBooking);

        // Verifica se já existe um rooming list
        const existingRoomingBooking = await roomingBookingRepository.count();
        if (existingRoomingBooking > 0) {
            console.log("Rooming-booking list já existem no banco de dados");
            return;
        }

        // Lê o arquivo JSON
        const jsonPath = path.join(__dirname, '../../json/rooming-list-bookings.json');
        const roomingBookingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        console.log('Dados lidos do JSON:', roomingBookingData[0]); // Log do primeiro item

        const roomingBookingList = roomingBookingData.map((roomingBooking: any) => {
            const mapped = {
                roomingList_id: roomingBooking.roomingListId,
                booking_id: roomingBooking.bookingId
            };
            console.log('Dados mapeados:', mapped); // Log do mapeamento
            return mapped;
        });

        for (const item of roomingBookingList) {
            try {
                console.log('Tentando criar com dados:', item); // Log antes de criar
                const newRoomingBooking = roomingBookingRepository.create(item);
                await roomingBookingRepository.save(newRoomingBooking);
                console.log('Rooming booking criado com sucesso');
            } catch (error: any) {
                console.error('Erro ao criar rooming booking:', error.message);
                console.error('Dados que causaram o erro:', item);
            }
        }

        console.log("Seed de rooming-booking list executado com sucesso");
    } catch (error: any) {
        console.error("Erro ao executar o seed de rooming-booking list:", error);
    }
}

roomingBookingSeed();