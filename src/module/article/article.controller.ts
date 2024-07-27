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

    getTab = async (req: Request, res: Response) => {
        const articles = await this.articlesService.getArticles();
        const { tab } = req.params;
        res.render(tab, {
            layout: 'dashboard',
            articles
        })
    }

    createArticle = async (req: Request, res: Response) => {
        const data: ArticleDto = req.body;
        const articles = await this.articlesService.createArticle(data);
        res.send(articles)
    }

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const body = req.body;
        const update = await this.articlesService.update(res, id, body);
        res.send(update);
    }

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const deleteArticle = await this.articlesService.delete(res, id);
        res.send(deleteArticle);
    }
}