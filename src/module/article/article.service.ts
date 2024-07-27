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
        const articles = await this.articleRepo.createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .select(['article.id', 'article.content', 'article.title', 'article.description', 'article.keyword', 'article.imageUrl', 'article.published', 'article.author', 'category.name'])
            .getMany();
        return articles;
    }

    async update(res: Response, id: number, data: ArticleDto) {
        const article = await this.articleRepo.findOne({ where: { id } });
        if (!article) {
            res.send(`Article with id ${id} not found`);
        } return await this.articleRepo.update({ id: id }, data);
    }

    async delete(res: Response, id: number) {
        const article = await this.articleRepo.findOne({ where: { id } });
        if (!article) {
            res.send(`Article with id ${id} not found`);
        } return await this.articleRepo.delete({ id: id });
    }
}