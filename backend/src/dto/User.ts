export interface CreateUserDTO {
    name: string;
    email: string;
    password: string; 
    cpf: string;
  }

  export interface UserResponseDTO {
    id: string;
    name: string;
    cpf: string;
    email: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    token?: string;
    refreshToken?: string;
}