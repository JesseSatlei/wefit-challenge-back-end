import express, { Router } from 'express';
import UserController from '../modules/user/controllers/UserController';
import { authenticate } from 'middleware/authentication';

const router: Router = express.Router();

router.post('/', authenticate, UserController.create);
router.get('/:id', authenticate, UserController.findOne);
router.get('/', authenticate, UserController.findAll);
router.patch('/:id', authenticate, UserController.update);
router.delete('/:id', authenticate, UserController.delete);


export default router;
