import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/UserEntity';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUserRepository } from './interfaces/IUserRepository';
import { ErrorHandler } from '../../../shared/errors/ErrorHandler';
import { DuplicateEntryErrorStrategy } from '../../../shared/errors/ErrorStrategy';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
  private errorHandler: ErrorHandler;

  constructor() {
    super();
    this.errorHandler = new ErrorHandler(new DuplicateEntryErrorStrategy());
  }

  async saveUser(data: CreateUserDto): Promise<User> {
    try {
      const user = this.create(data);
      return await this.save(user);
    } catch (error: any) {
      this.errorHandler.handle(error);
      throw error;
    }
  }

  async findUserById(userId: number): Promise<User | undefined> {
    return await this.findOne(userId);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async updateUser(userId: number, data: Partial<CreateUserDto>): Promise<User | undefined> {
    const user = await this.findOne(userId);
    if (!user) {
      return undefined;
    }

    Object.assign(user, data);

    return await this.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(userId);
  }
}
