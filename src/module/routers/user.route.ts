import { Router } from 'express';
import { AdminController } from '../account/admin/admin.controller';

const router = Router();
const userController = new AdminController();

// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
// router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

export default router;
