import { Request, Response } from "express";
import { UserService } from "../user.service";
import { createAccountDto } from "../dtos/createAccount.dto";
import { Role } from "../../../core/constants/common.constant";
import { successMessage } from "../../../core/respones/success.respone";
import { LogInDto } from "../dtos/login.dto";

export class ClientController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    createClient = async (req: Request, res: Response) => {
        try {
            const body: createAccountDto = req.body;
            const newUser = await this.userService.createAccount(res, req, body);
            res.send(successMessage(newUser));
        }
        catch (err: any) {
            res.status(500).send({
                error: err.message,
            });
        }
    }

    login = async (req: Request, res: Response) => {
        const body: LogInDto = req.body;
        await this.userService.login(res, req, body);
    }
}