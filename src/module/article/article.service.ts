import { Repository } from "typeorm";
import { Article } from "../../core/database/entity/article.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { ArticleDto } from "./dtos/article.dto";
import { Response } from "express";

export class ArticleService {
    private articleRepo: Repository<Article>;

    constructor() {
        this.articleRepo = myDataSource.getRepository(Article);
    }
    async createArticle(data: ArticleDto) {
        try {
            return await this.articleRepo.save(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getArticles() {
        try {
            const articles = await this.articleRepo.createQueryBuilder('article')
                .leftJoinAndSelect('article.category', 'category')
                .select(['article.id', 'article.content', 'article.title', 'article.description', 'article.keyword', 'article.imageUrl', 'article.published', 'article.author', 'article.view', 'category.name'])
                .getMany();
            return articles;
        }
        catch (error) {
            console.log(error);
        }
    }

    async update(res: Response, id: number, data: ArticleDto) {
        try {
            const article = await this.articleRepo.findOne({ where: { id } });
            if (!article) {
                res.send(`Article with id ${id} not found`);
            }
            return await this.articleRepo.update({ id: id }, data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async delete(res: Response, id: number) {
        try {
            const article = await this.articleRepo.findOne({ where: { id } });
            if (!article) {
                res.send(`Article with id ${id} not found`);
            }
            return await this.articleRepo.delete({ id: id });
        } catch (err) {
            console.log(err);
        }
    }

    async getDetail(res: Response, id: number) {
        try {
            const article = await this.articleRepo.findOne({ where: { id: id } });
            return article;
        }
        catch (err) {
            console.log(err);
        }
    }

    async updateView(res: Response, id: number) {
        try {
            const article = await this.articleRepo.findOne({ where: { id } });
            if (!article) {
                return res.status(404).send(`id không tồn tại`);
            }
            article.view += 1;
            await this.articleRepo.save(article);
        } catch (error) {
            console.error(error);
            return res.status(500).send('lỗi 500');
        }
    }

    async getTopPost() {
        try {
            const articleRepository = await this.articleRepo.createQueryBuilder('article')
                .orderBy('article.view', 'DESC')
                .limit(10)
                .getMany();
            return
        }
        catch (err) {
            console.log(err);
        }
    }


}