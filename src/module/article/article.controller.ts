import { Request, Response } from "express";
import { ArticleService } from "./article.service";

export class ArticleController{
    private articlesService: ArticleService;
    constructor() {
        this.articlesService = new ArticleService();
    }

    getAritcles = async (req: Request, res: Response)  =>{
        const articles = await this.articlesService.getArticles();
        console.log(articles)
        res.render('dashboard',{
            layout:'login',
            articles: articles,
            id: '122'
        })
    }

    getHome = async (req: Request, res: Response)  =>{
        res.render('dashboard',{
            layout:'dashboard',

        })
    }
}