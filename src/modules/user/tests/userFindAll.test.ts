import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { User, UserType } from '../entities/UserEntity';

jest.mock('../services/UserService');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

describe('UserController', () => {
	describe('findAll', () => {
		it('deve retornar 200 e a lista de usuários', async () => {
			const req = {} as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const users: User[] = [
				{
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
				},
				{
					id: 2, name: 'Jane Doe', email: 'jane@example.com',
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
				}
			];
			mockUserService.findAllUsers.mockResolvedValueOnce(users);

			await UserController.findAll(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(users);
		});

		it('deve retornar 500 se ocorrer um erro ao buscar os usuários', async () => {
			const req = {} as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const errorMessage = 'Erro ao buscar usuários';
			mockUserService.findAllUsers.mockRejectedValueOnce(new Error(errorMessage));

			await UserController.findAll(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching users', error: errorMessage });
		});
	});
});
