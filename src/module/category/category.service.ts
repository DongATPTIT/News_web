import { Repository } from "typeorm";
import { Category } from "../../core/database/entity/category.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { Response } from "express";
import { CategoryDto } from "./dtos/category.dto";

export class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.categoryRepository = myDataSource.getRepository(Category);
    }

    async create(res: Response, name: string) {
        await this.categoryRepository.save({ name: name })
    }
    async update(res: Response, id: number, data: CategoryDto) {
        const article = await this.categoryRepository.findOne({ where: { id } });
        if (!article) {
            res.send(`Article with id ${id} not found`);

        }
        await this.categoryRepository.update({ id: id }, data)
    }

    async delete(res: Response, id: number) {
        const article = await this.categoryRepository.findOne({ where: { id } });
        if (!article) {
            res.send(`Article with id ${id} not found`)
        }
        await this.categoryRepository.delete({ id: id })
    }
}