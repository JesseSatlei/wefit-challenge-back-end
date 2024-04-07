import express, { Router } from 'express';
import UserController from '../modules/user/controllers/UserController';

const router: Router = express.Router();

router.post('/', UserController.create);
router.get('/:id', UserController.findOne);
router.get('/', UserController.findAll);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);


export default router;
