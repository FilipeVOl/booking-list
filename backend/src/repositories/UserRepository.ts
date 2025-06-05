import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { CreateUserDTO } from "../dto/User";

class UserRepository {
    private repository = AppDataSource.getRepository(User);

    public async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    };

    public create (data: CreateUserDTO): User {
        return this.repository.create(data);
    };

    public async save (user: User): Promise<User> {
        return await this.repository.save(user);
    };
}

export default new UserRepository();