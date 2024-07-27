import { Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dtos/category.dto";

export class CategoryController {
    private categoryService: CategoryService;
    constructor() {
        this.categoryService = new CategoryService();
    }

    create = async (res: Response, name: string) => {
        const category = await this.categoryService.create(res, name);
        res.send(category);
    }

    update = async (res: Response, id: number, data: CategoryDto) => {
        const category = await this.categoryService.update(res, id, data);
        res.send(category);
    }

    delete = async (res: Response, id: number) => {
        const category = await this.categoryService.delete(res, id);
        res.send(category);
    }
}