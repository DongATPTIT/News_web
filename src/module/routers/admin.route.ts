import { Router } from 'express';
import { AdminController } from '../account/admin/admin.controller';
import { checkRole } from '../../core/middleware/checkRole.middleware';
import { Role } from '../../core/constants/common.constant';
import { isAuth } from "../../core/auth/authen.gaurd";
import { ArticleController } from '../article/article.controller';
import { AccountController } from '../article/account.controller';
const router = Router();
const userController = new AdminController();
const articleController = new ArticleController();
const accountController = new AccountController();
router.get('/users', userController.test);
router.post('/create', userController.createAdmin);
router.post('/login', userController.login);
router.get('/dashboard', articleController.getHome);
router.get('/list-articles', articleController.getAritcles);
router.post('/article', isAuth, checkRole(Role.ADMIN), articleController.createArticle)
router.post('/dashboard/admin/article/:id', articleController.update)
router.delete('/dashboard/admin/article/:id', isAuth, checkRole(Role.ADMIN), articleController.delete)
router.get('/protected', isAuth, checkRole(Role.ADMIN), userController.getProtectedData);
router.get('/dashboard/post-management', articleController.getAritcles);
router.get('/dashboard/account-management', accountController.getAccount);
export default router;
