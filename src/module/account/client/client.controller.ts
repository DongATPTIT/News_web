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
            const newUser = await this.userService.createAccount(res, req, body);
            res.send(successMessage(newUser));
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
                // categories: categories.slice(0, 3),
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

    getInfo = async (req: Request, res: Response) => {
        const info = await this.userService.getDetail(Number(req.params.id));
        const cookies = cookie.parse(req.headers.cookie || '');
        console.log(cookies)
        res.render("info-client", {
            layout: "client",
            info,
            // categories: categories.slice(0, 3),
        });
    }
    getLogOut = async (req: Request, res: Response) => {
        res.redirect("/");
    };
}