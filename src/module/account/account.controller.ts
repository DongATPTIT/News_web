import { Request, Response } from "express";
import { UserService } from "./user.service";
import { LogInDto } from "./dtos/login.dto";

export class AccountController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    getAccount = async (req: Request, res: Response) => {
        const users = await this.userService.getUsers();
        console.log(users)
        res.render('account-management', { layout: 'account-management', users })
    }

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const body = req.body;
        delete body?._method;
        console.log("id", body)

        await this.userService.update(res, id, body);
        res.redirect('/admin/dashboard/account-management')
    }

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await this.userService.delete(id);
        res.redirect('/admin/dashboard/account-management')
    }

    login = async (req: Request, res: Response) => {
        const body: LogInDto = req.body;
        console.log("req", req);
        await this.userService.login(res, req, body);
    }
}