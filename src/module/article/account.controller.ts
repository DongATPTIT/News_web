import { Request, Response } from "express";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./dtos/article.dto";
import { AccountService } from "./account.service";

export class AccountController {
    private accountService: AccountService;
    constructor() {
        this.accountService = new AccountService();
    }
    getAccount = async (req: Request, res: Response) => {
        const users = await this.accountService.getUsers();
        console.log(users)
        res.render('account-management', { layout: 'account-management', users })
    }
}