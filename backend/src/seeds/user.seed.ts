import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import * as bcryptjs from "bcryptjs";

async function seedUsers() {
    console.log('Iniciando seed de usuários...');

    try {
        await AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');

        const userRepository = AppDataSource.getRepository(User);

        const count = await userRepository.count();
        if (count > 0) {
            console.log(`já existem ${count} usuários cadastrados`);
            return;
        }

        const hashedPassword = await bcryptjs.hash("123456", 10);
        const user = userRepository.create({
            name: "joão",
            email: "joao@gmail.com",
            cpf: "12345678901",
            password: hashedPassword,
            isDeleted: false,
        });

        const savedUser = await userRepository.save(user);

        console.log('Usuário criado com sucesso');

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    } finally {
        await AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada');
    }
};

seedUsers();