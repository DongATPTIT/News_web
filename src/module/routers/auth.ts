import express, { Request, Response } from "express";
import { ClientController } from "../account/client/client.controller";

const route = express.Router();
const clientController = new ClientController();


route.post('/login', clientController.login)
route.post('/create', clientController.createClient)
route.get('/', (req: Request, res: Response) => {
    res.render('login', {
        layout: 'login'
    })
})

module.exports = route;