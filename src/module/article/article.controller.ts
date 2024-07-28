import { Request, Response } from "express";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./dtos/article.dto";

export class ArticleController {
    private articlesService: ArticleService;
    constructor() {
        this.articlesService = new ArticleService();
    }

    getAritcles = async (req: Request, res: Response) => {
        const articles = await this.articlesService.getArticles();
        console.log(articles)
        res.render('post-management', { layout: 'post-management', articles })
    }

    getHome = async (req: Request, res: Response) => {
        const articles = await this.articlesService.getArticles();

        res.render('post-management', {
            layout: 'dashboard',
            articles
        })
    }

    createArticle = async (req: Request, res: Response) => {
        res.render('add-new', {
            layout: 'dashboard',
        })
    }

    getTopPost = async (req: Request, res: Response) => {
        const articleTop = await this.articlesService.getTopPost();
        res.render('top-posts', {
            layout: 'dashboard',
            articleTop
        })
    }

    getTab = async (req: Request, res: Response) => {
        const articles = await this.articlesService.getArticles();
        const { tab } = req.params;
        res.render(tab, {
            layout: 'dashboard',
            articles
        })
    }

    addArticle = async (req: Request, res: Response) => {
        const data: ArticleDto = req.body;
        const newArticle = { ...data, categoryId: 1 };
        console.log(newArticle)
        await this.articlesService.createArticle(newArticle);
        res.redirect('/admin/dashboard/post-management')
    }

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const body = req.body;
        delete body?._method;
        body.categoryId = 1;
        this.articlesService.update(res, id, body);
        res.redirect('/admin/dashboard/post-management')

    }

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await this.articlesService.delete(res, id);
        res.redirect('/admin/dashboard/post-management')
    }
}