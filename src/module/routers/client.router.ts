import { Router } from 'express';
import { ClientController } from '../account/client/client.controller';
const router = Router();
const userController = new ClientController();

router.post('/create', userController.createClient);
router.post('/login', userController.login);

export default router;
