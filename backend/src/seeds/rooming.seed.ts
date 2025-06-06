import { AppDataSource } from "../config/data-source";
import * as path from 'path';
import * as fs from 'fs';
import { RoomingList } from "../entities/RoomingList";

console.log('Iniciando seed de rooming list...');

export const roomingSeed = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');

        const roomingRepository = AppDataSource.getRepository(RoomingList);

        // Verifica se já existe um rooming list
        const existingRooming = await roomingRepository.count();
        if (existingRooming > 0) {
            console.log("Rooming list já existem no banco de dados");
            return;
        }

        // Lê o arquivo JSON
        const jsonPath = path.join(__dirname, '../../json/rooming-lists.json');
        const roomingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        const roomingList = roomingData.map((rooming: any) => ({
            event_id: rooming.eventId,
            hotel_id: rooming.hotelId,
            rfp_name: rooming.rfpName,
            cutOff_date: new Date(rooming.cutOffDate),
            status: rooming.status,
            agreement_type: rooming.agreement_type
        }));

        for (const item of roomingList) {
            try {
                const newRooming = roomingRepository.create(item);
                await roomingRepository.save(newRooming);
                console.log('Rooming list criado com sucesso');
            } catch (error: any) {
                console.error('Erro ao criar rooming list:', error.message);
            }
        }

        console.log("Seed de rooming list executado com sucesso");
    } catch (error: any) {
        console.error("Erro ao executar o seed de rooming list:", error);
    }
}

roomingSeed();