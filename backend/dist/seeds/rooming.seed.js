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
exports.roomingSeed = void 0;
const data_source_1 = require("../config/data-source");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const RoomingList_1 = require("../entities/RoomingList");
console.log('Iniciando seed de rooming list...');
const roomingSeed = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        const roomingRepository = data_source_1.AppDataSource.getRepository(RoomingList_1.RoomingList);
        const existingRooming = await roomingRepository.count();
        if (existingRooming > 0) {
            console.log("Rooming list já existem no banco de dados");
            return;
        }
        const jsonPath = path.join(__dirname, '../../json/rooming-lists.json');
        const roomingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const roomingList = roomingData.map((rooming) => ({
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
            }
            catch (error) {
                console.error('Erro ao criar rooming list:', error.message);
            }
        }
        console.log("Seed de rooming list executado com sucesso");
    }
    catch (error) {
        console.error("Erro ao executar o seed de rooming list:", error);
    }
};
exports.roomingSeed = roomingSeed;
(0, exports.roomingSeed)();
