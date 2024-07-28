import { Router } from 'express';
import { AdminController } from '../account/admin/admin.controller';
import { ArticleController } from '../article/article.controller';
import { AccountController } from '../account/account.controller';
const router = Router();
const adminController = new AdminController();
const articleController = new ArticleController();
const accountController = new AccountController();
import changeBodyPost from '../../core/middleware/changeBodyPost.middleware';
router.post('/create', adminController.createAdmin);
router.get('/list-articles', articleController.getAritcles);
router.post('/create/article', changeBodyPost, articleController.addArticle)
router.post('/article/:id', changeBodyPost, articleController.update)
router.get('/delete/article/:id', articleController.delete)
router.get('/delete/user/:id', accountController.delete)
router.post('/update/user/:id', accountController.update)
// router.post('/login', adminController.login)


router.get('/dashboard/post-management', articleController.getAritcles);
router.get('/dashboard/account-management', accountController.getAccount);
router.get('/dashboard/add-new', articleController.createArticle);
router.get('/dashboard', articleController.getHome);
router.get('/dashboard/top-posts', articleController.getTopPost);
router.get('/dashboard/log-out', adminController.getLogout);


export default router;
