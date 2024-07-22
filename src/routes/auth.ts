import express, { Request, Response } from "express";

const route = express.Router();

route.get('/',(req: Request, res: Response) => {
    res.render('login', {
        layout: 'login'
    })
})

module.exports= route;