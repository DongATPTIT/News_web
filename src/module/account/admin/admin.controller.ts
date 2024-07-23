import { Request, Response } from "express";
import { UserService } from "../user.service";
import { createAccountDto } from "../dtos/createAccount.dto";
import { Role } from "../../../core/constants/common.constant";
import { successMessage } from "../../../core/respones/success.respone";

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
            const newUser = await this.userService.createAccount(dataAmin);
            res.send(successMessage(newUser));
        }
        catch (err:any) {
            res.status(500).send({
                error: err.message,
            });
        }
    }

    
}