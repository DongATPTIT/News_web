import { Request, Response } from "express";
import { UserService } from "../user.service";
import { createAccountDto } from "../dtos/createAccount.dto";
import { Role } from "../../../core/constants/common.constant";
import { successMessage } from "../../../core/respones/success.respone";
import { LogInDto } from "../dtos/login.dto";

export class AdminController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    createAdmin = async (req: Request, res: Response) => {
        try {
            const body: createAccountDto = req.body;
            const dataAmin = { ...body, role: Role.ADMIN }
            this.userService.createAccount(res, req, dataAmin);
        }
        catch (err: any) {
            res.status(500).send({
                error: err.message,
            });
        }
    }


    renderHome = async (req: Request, res: Response) => {
        res.render('dashboard', {
            layout: 'dashboard',
        })
    }

    getProtectedData = async (req: Request | any, res: Response) => {
        const user = req.user;
        res.send(`Hello, ${user.username}`);
    };

    getLogout = async (req: Request, res: Response) => {
        res.clearCookie('token').redirect('/');
    }
}