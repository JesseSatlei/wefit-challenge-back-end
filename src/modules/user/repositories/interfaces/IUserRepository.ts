import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/UserEntity';

export interface IUserRepository {
  saveUser(data: CreateUserDto): Promise<User>;
  findUserById(userId: number): Promise<User | undefined>;
  findAllUsers(): Promise<User[]>;
  updateUser(userId: number, data: Partial<CreateUserDto>): Promise<User>;
  deleteUser(userId: number): Promise<void>;
}
