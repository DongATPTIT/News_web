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
    test(req: Request, res: Response) {
        res.send("haha")
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

    login = async (req: Request, res: Response) => {
        const body: LogInDto = req.body;
        console.log("req", req);
        await this.userService.login(res, req, body);
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
}