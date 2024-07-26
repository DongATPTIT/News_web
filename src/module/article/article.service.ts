import { Repository } from "typeorm";
import { Article } from "../../core/database/entity/article.entity";
import { myDataSource } from "../../core/database/config/data-source.config";

export class ArticleService {
    private userRepository: Repository<Article>;

    constructor() {
        this.userRepository = myDataSource.getRepository(Article);
    }
    async createArticle() {

    }
    async getArticles(){
        const articles = await this.userRepository.find();
        return articles;
    }
}