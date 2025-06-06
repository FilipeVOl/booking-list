import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { CreateUserDTO, UserResponseDTO } from "../dto/User";
import { Request } from "express";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

//
// Serviço responsável pelo gerenciamento de usuários
// Inclui operações de CRUD e autenticação
//

class UserService {
  public validateCreateUser(req: Request): void {
    const requiredFields = ["name", "email", "password", "cpf"];
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        throw new Error(`Field ${field} is required`);
      }
    });
  }

  public async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    return await AppDataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);

      // Verifica email
      const existingEmail = await userRepository
        .createQueryBuilder("user")
        .where("LOWER(user.email) = LOWER(:email)", { email: data.email })
        .andWhere("user.isDeleted = false")
        .getOne();

      if (existingEmail) {
        throw new Error("Email already exists");
      }

      // Hash da senha antes de salvar
      if (data.password) {
        const salt = await bcryptjs.genSalt(10);
        data.password = await bcryptjs.hash(data.password, salt);
      }

      // Gera tokens
      const token = this.generateToken(data.email);
      const refreshToken = await this.generateRefreshToken(data.email);

      const user = userRepository.create({
        ...data,
        refreshToken,
        isDeleted: false,
      });
      await userRepository.save(user);

      const completeUser = await userRepository.findOne({
        where: { id: user.id },
      });

      // Retorna resposta com tokens
      const userResponse: UserResponseDTO = this.mapUserToResponse(
        completeUser!
      );
      userResponse.token = token;
      userResponse.refreshToken = refreshToken;

      return userResponse;
    });
  }

  //** - Atualiza os dados de um usuário */
  private mapUserToResponse(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      isDeleted: user.isDeleted,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  private generateToken(email: string): string {
    return sign({ email }, process.env.JWT_SECRET || "default-secret", {
      expiresIn: "1h",
    });
  }

  private async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET || "default-refresh-secret",
      { expiresIn: "15d" }
    );
    return refreshToken;
  }
}

export default new UserService();
