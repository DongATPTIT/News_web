import { Router } from 'express';
import { AdminController } from '../account/admin/admin.controller';
import { checkRole } from '../../core/middleware/checkRole.middleware';
import { Role } from '../../core/constants/common.constant';
import { isAuth } from "../../core/auth/authen.gaurd";
const router = Router();
const userController = new AdminController();

router.get('/users', userController.test);
router.post('/create', userController.createAdmin);
router.post('/login', userController.login);
router.get('/dashboard', userController.renderHome);
router.get('/protected', isAuth, checkRole(Role.ADMIN), userController.getProtectedData);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

export default router;
