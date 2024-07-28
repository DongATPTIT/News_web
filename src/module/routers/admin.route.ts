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
import changeBodyPost from '../../core/middleware/changeBodyPost.middleware';
router.get('/users', userController.test);
router.post('/create', userController.createAdmin);
// router.post('/login', userController.login);
router.get('/list-articles', articleController.getAritcles);
router.post('/create/article', changeBodyPost, articleController.addArticle)
router.post('/article/:id', changeBodyPost, articleController.update)
router.get('/delete/article/:id', articleController.delete)
router.get('/delete/user/:id', accountController.delete)
router.post('/update/user/:id', accountController.update)

router.get('/dashboard/post-management', articleController.getAritcles);
router.get('/dashboard/account-management', accountController.getAccount);
router.get('/dashboard/add-new', articleController.createArticle);
router.get('/dashboard', articleController.getHome);
router.get('/dashboard/top-posts', articleController.getTopPost);

export default router;
