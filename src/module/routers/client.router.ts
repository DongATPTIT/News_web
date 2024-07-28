import { Router } from 'express';
import { ClientController } from '../account/client/client.controller';
const router = Router();
const userController = new ClientController();

router.get('/home', userController.renderHomeClient);
router.get('/post/:id', userController.getDetails);
router.get('/info', userController.getDetails);
router.get('/logout', userController.getLogOut);




export default router;
