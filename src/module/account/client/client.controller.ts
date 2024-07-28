import { Request, Response } from "express";
import { UserService } from "../user.service";
import { createAccountDto } from "../dtos/createAccount.dto";
import { Role } from "../../../core/constants/common.constant";
import { successMessage } from "../../../core/respones/success.respone";
import { LogInDto } from "../dtos/login.dto";
import { ArticleService } from "../../article/article.service";
const cookie = require('cookie');
export class ClientController {
    private userService: UserService;
    private articlesService: ArticleService;
    constructor() {
        this.userService = new UserService();
        this.articlesService = new ArticleService();

    }
    createClient = async (req: Request, res: Response) => {
        try {
            const body: createAccountDto = req.body;
            await this.userService.createAccount(res, req, body);
        }
        catch (err: any) {
            res.status(500).send({
                error: err.message,
            });
        }
    }

    renderHomeClient = async (req: Request, res: Response) => {
        const articles = await this.articlesService.getArticles();
        console.log(articles)
        res.render('home-client', {
            layout: 'client',
            articles
        })
    }

    getDetails = async (req: Request, res: Response) => {
        try {
            const post = await this.articlesService.getDetail(res, Number(req.params.id));
            await this.articlesService.updateView(res, Number(req.params.id));

            res.render("detail", {
                layout: "client",
                post,
            });
        } catch (error) {
            res.status(500).json({
                msg: "Internal Server Error",
            });
        }
    }

    login = async (req: Request, res: Response) => {
        const body: LogInDto = req.body;
        await this.userService.login(res, req, body);
    }

    getInfo = async (req: any, res: Response) => {
        const user = req?.user;
        console.log(user);
        res.render("info-client", {
            layout: "client",
            user: [user]
        });
    }
    getLogOut = async (req: Request, res: Response) => {
        res.clearCookie('token').redirect('/');
    };

    updateUser = async (req: any, res: Response) => {
        const user = req?.user;
        const data = req.body;
        delete data?._method;
        if (data?.password == "") {
            delete data?.password;
        }
        if (data?.username === user?.username) {
            delete data?.username;
        }
        console.log(data)
        await this.userService.update(res, user.id, data);
        res.redirect('/client/info');
    };
}