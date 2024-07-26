import { Router } from 'express';
import { AdminController } from '../account/admin/admin.controller';
import { checkRole } from '../../core/middleware/checkRole.middleware';
import { Role } from '../../core/constants/common.constant';
import { isAuth } from "../../core/auth/authen.gaurd";
import { ArticleController } from '../article/article.controller';
const router = Router();
const userController = new AdminController();
const articleController = new ArticleController();
router.get('/users', userController.test);
router.post('/create', userController.createAdmin);
router.post('/login', userController.login);
router.get('/dashboard',articleController.getHome);
router.get('/list-articles',articleController.getAritcles);
router.get('/protected', isAuth, checkRole(Role.ADMIN), userController.getProtectedData);
// router.delete('/users/:id', userController.deleteUser);

export default router;
