import express, { Request, Response } from "express";
import { AdminController } from "../../module/account/admin/admin.controller";
import { ClientController } from "../../module/account/client/client.controller";

const route = express.Router();
const userController = new AdminController();
const clientController = new ClientController();

route.get('/logout', clientController.getLogOut)

route.post('/login', userController.login)
route.post('/register', userController.createAdmin)

route.get('/', (req: Request, res: Response) => {
    res.render('login', {
        layout: 'login'
    })
})

module.exports = route;