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

  async findUserById(userId: number): Promise<User | null> {
    try {
      return await this.findOneOrFail(userId);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async updateUser(userId: number, data: Partial<CreateUserDto>): Promise<User> {
    let user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const partialUser: Partial<User> = user;

    Object.assign(partialUser, data);

    return await this.save(partialUser);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.delete(userId);
  }
}