import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserService } from '../services/UserService';

jest.mock('../services/UserService');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

describe('UserController', () => {
	describe('delete', () => {
		it('deve retornar 204 se o usuário for excluído com sucesso', async () => {
			const req: Request<{ id: string }, any, any, any, any> = { params: { id: '1' } } as Request<{ id: string }, any, any, any, any>;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis(), end: jest.fn() } as unknown as Response;

			await UserController.delete(req, res);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.end).toHaveBeenCalled();
		});

		it('deve retornar 500 se ocorrer um erro ao excluir o usuário', async () => {
			const req: Request<{ id: string }, any, any, any, any> = { params: { id: '1' } } as Request<{ id: string }, any, any, any, any>;
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

			const errorMessage = 'Erro ao excluir usuário';
			mockUserService.deleteUser.mockRejectedValueOnce(new Error(errorMessage));

			await UserController.delete(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting user', error: errorMessage });
		});
	});
});
