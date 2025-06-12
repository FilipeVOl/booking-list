"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
async function runSeeders() {
    console.log("Iniciando execução dos seeders...");
    try {
        const seeders = [
            'user.seed.ts',
            'booking.seed.ts',
            'rooming.seed.ts',
            'rooming_booking.seed.ts'
        ];
        for (const seeder of seeders) {
            console.log(`\nExecutando ${seeder}...`);
            try {
                (0, child_process_1.execSync)(`ts-node "${(0, path_1.join)(__dirname, seeder)}"`, { stdio: 'inherit' });
                console.log(`✓ ${seeder} executado com sucesso!`);
            }
            catch (error) {
                console.error(`✗ Erro ao executar ${seeder}:`, error);
            }
        }
        console.log("\n✨ Todos os seeders foram executados!");
    }
    catch (error) {
        console.error("Erro ao executar seeders:", error);
        process.exit(1);
    }
}
runSeeders();
