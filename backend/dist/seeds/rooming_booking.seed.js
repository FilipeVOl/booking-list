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
exports.roomingBookingSeed = void 0;
const data_source_1 = require("../config/data-source");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const RoomingBooking_1 = require("../entities/RoomingBooking");
console.log('Iniciando seed de rooming-booking list...');
const roomingBookingSeed = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        const roomingBookingRepository = data_source_1.AppDataSource.getRepository(RoomingBooking_1.RoomingBooking);
        const existingRoomingBooking = await roomingBookingRepository.count();
        if (existingRoomingBooking > 0) {
            console.log("Rooming-booking list já existem no banco de dados");
            return;
        }
        const jsonPath = path.join(__dirname, '../../json/rooming-list-bookings.json');
        const roomingBookingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        console.log('Dados lidos do JSON:', roomingBookingData[0]);
        const roomingBookingList = roomingBookingData.map((roomingBooking) => {
            const mapped = {
                roomingList_id: roomingBooking.roomingListId,
                booking_id: roomingBooking.bookingId
            };
            console.log('Dados mapeados:', mapped);
            return mapped;
        });
        for (const item of roomingBookingList) {
            try {
                console.log('Tentando criar com dados:', item);
                const newRoomingBooking = roomingBookingRepository.create(item);
                await roomingBookingRepository.save(newRoomingBooking);
                console.log('Rooming booking criado com sucesso');
            }
            catch (error) {
                console.error('Erro ao criar rooming booking:', error.message);
                console.error('Dados que causaram o erro:', item);
            }
        }
        console.log("Seed de rooming-booking list executado com sucesso");
    }
    catch (error) {
        console.error("Erro ao executar o seed de rooming-booking list:", error);
    }
};
exports.roomingBookingSeed = roomingBookingSeed;
(0, exports.roomingBookingSeed)();
