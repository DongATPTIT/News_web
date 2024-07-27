import { Category } from "../../../core/database/entity/category.entity";

export class ArticleDto {
    content?: string;
    title?: string;
    description?: string;
    keyword?: string;
    imageUrl?: string;
    published?: boolean;
    author?: string;
    categoryId?: number;
}