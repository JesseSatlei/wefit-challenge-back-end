import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { ValidationService } from '../services/UserValidationService';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const createUserDto: CreateUserDto = req.body;

      const { error } = ValidationService.validateCreateUserDto(createUserDto);
      if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
      }

      const user = await UserService.createUser(createUserDto);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error create user', error: error.message });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await UserService.findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const users = await UserService.findAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const updateUserDto: UpdateUserDto = req.body;

      const { error } = ValidationService.validateUpdateUserDto(updateUserDto);
      if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
      }

      const updatedUser = await UserService.updateUser(userId, updateUserDto);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);

      await UserService.deleteUser(userId);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
}

export default UserController;
