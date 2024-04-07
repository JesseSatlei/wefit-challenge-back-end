import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { ValidationService } from '../services/UserValidationService';
import UserController from '../controllers/UserController';
import { User } from '../entities/UserEntity';
import { ValidationError } from 'joi';

jest.mock('../services/UserService');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

jest.mock('../services/UserValidationService');
const mockValidationService = ValidationService as jest.Mocked<typeof ValidationService>;

describe('UserController', () => {
  describe('create', () => {
    it('deve retornar 201 e o usuário criado quando os dados de entrada forem válidos', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      mockValidationService.validateCreateUserDto.mockReturnValueOnce({
        error: undefined,
        value: undefined
      });

      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const mockedUser = user as User;
      mockUserService.createUser.mockResolvedValueOnce(Promise.resolve(mockedUser));

      await UserController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('deve retornar 400 e uma mensagem de erro de validação quando os dados de entrada forem inválidos', async () => {
      const req = { body: { name: '', email: 'invalid-email' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      const validationError = new Error('Detalhes do erro de validação') as ValidationError;
      validationError.name = 'ValidationError';
      validationError.details = [{
        message: 'Detalhes do erro de validação',
        path: [],
        type: ''
      }];

      mockValidationService.validateCreateUserDto.mockReturnValueOnce({
        error: validationError,
        value: {}
      });

      await UserController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation error', details: validationError.details });
    });

    it('deve retornar 500 e uma mensagem de erro quando ocorrer um erro ao criar o usuário', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      const errorMessage = 'Erro ao criar usuário';
      mockValidationService.validateCreateUserDto.mockReturnValueOnce({
        error: undefined,
        value: undefined
      });
      mockUserService.createUser.mockRejectedValueOnce(new Error(errorMessage));

      await UserController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error create user', error: errorMessage });
    });
  });
});
