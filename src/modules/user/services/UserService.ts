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

  static async findUserById(userId: number): Promise<User | null> {
    return await this.getUserRepository().findUserById(userId);
  }

  static async findAllUsers(): Promise<User[]> {
    return await this.getUserRepository().findAllUsers();
  }

  static async updateUser(userId: number, data: Partial<CreateUserDto>): Promise<User> {
    let user = await this.getUserRepository().findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, data);

    return await this.getUserRepository().saveUser(user);
  }

  static async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserRepository().findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.getUserRepository().deleteUser(userId);
  }
}

export { UserService };
