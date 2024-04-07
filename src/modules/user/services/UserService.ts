import { User } from '../entities/UserEntity';
import { UserRepository } from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto';

class UserService {
  private static userRepository: UserRepository;

  private static getUserRepository(): UserRepository {
    if (!UserService.userRepository) {
      UserService.userRepository = getCustomRepository(UserRepository);
    }
    return UserService.userRepository;
  }

  static async createUser(data: CreateUserDto): Promise<User> {
    return await this.getUserRepository().saveUser(data);
  }

  static async findUserById(userId: number): Promise<User | undefined> {
    return await this.getUserRepository().findUserById(userId);
  }

  static async findAllUsers(): Promise<User[]> {
    return await this.getUserRepository().findAllUsers();
  }

  static async updateUser(userId: number, data: Partial<CreateUserDto>): Promise<User | undefined> {
    const userRepository = this.getUserRepository();
    const user = await userRepository.updateUser(userId, data);
    return user;
  }

  static async deleteUser(userId: number): Promise<void> {
    await this.getUserRepository().deleteUser(userId);
  }
}

export { UserService };
