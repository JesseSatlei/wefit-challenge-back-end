import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { ValidationService } from '../services/UserValidationService';
import { User, UserType } from '../entities/UserEntity';

jest.mock('../services/UserService');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

jest.mock('../services/UserValidationService');
const mockValidationService = ValidationService as jest.Mocked<typeof ValidationService>;

describe('UserController', () => {
	describe('findOne', () => {
		it('deve retornar 200 e o usuário encontrado', async () => {
			const req = { params: { id: '1' } } as unknown as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const user: User = {
				id: 1, name: 'John Doe', email: 'john@example.com',
				userType: UserType.Individual,
				document: '',
				cellphone: '',
				telephone: '',
				postalCode: '',
				street: '',
				streetNumber: '',
				city: '',
				neighborhood: '',
				state: '',
				validateDocument: function (): Promise<boolean> {
					throw new Error('Function not implemented.');
				}
			};
			mockUserService.findUserById.mockResolvedValueOnce(user);

			await UserController.findOne(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(user);
		});

		it('deve retornar 404 se o usuário não for encontrado', async () => {
			const req = { params: { id: '1' } } as unknown as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			mockUserService.findUserById.mockResolvedValueOnce(null);

			await UserController.findOne(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
		});

		it('deve retornar 500 se ocorrer um erro ao buscar o usuário', async () => {
			const req = { params: { id: '1' } } as unknown as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const errorMessage = 'Erro ao buscar usuário';
			mockUserService.findUserById.mockRejectedValueOnce(new Error(errorMessage));

			await UserController.findOne(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching user', error: errorMessage });
		});
	});
});
