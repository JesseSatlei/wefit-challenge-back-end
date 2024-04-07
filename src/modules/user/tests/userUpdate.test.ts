import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { ValidationService } from '../services/UserValidationService';
import { User, UserType } from '../entities/UserEntity';
import { ValidationError } from 'joi';

jest.mock('../services/UserService');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

jest.mock('../services/UserValidationService');
const mockValidationService = ValidationService as jest.Mocked<typeof ValidationService>;

describe('UserController', () => {
	describe('update', () => {
		it('deve retornar 200 e o usuário atualizado', async () => {
			const req = { params: { id: '1' }, body: { name: 'John Doe' } } as unknown as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const updatedUser: User = {
				id: 1, name: 'John Doe', email: 'john@example.com',
				userType: UserType.LegalEntity,
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
			mockValidationService.validateUpdateUserDto.mockReturnValueOnce({
				error: undefined,
				value: undefined
			});
			mockUserService.updateUser.mockResolvedValueOnce(updatedUser);

			await UserController.update(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(updatedUser);
		});

		it('deve retornar 500 se ocorrer um erro ao atualizar o usuário', async () => {
			const req = { params: { id: '1' }, body: { name: 'John Doe' } } as unknown as Request;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const errorMessage = 'Erro ao atualizar usuário';
			mockValidationService.validateUpdateUserDto.mockReturnValueOnce({
				error: undefined,
				value: undefined
			});
			mockUserService.updateUser.mockRejectedValueOnce(new Error(errorMessage));

			await UserController.update(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error updating user', error: errorMessage });
		});
	});
});
