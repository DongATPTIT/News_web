import { Repository } from "typeorm";
import { Article } from "../../core/database/entity/article.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { ArticleDto } from "./dtos/article.dto";
import { Response } from "express";
import { User } from "../../core/database/entity/user.entity";
import { Role } from "../../core/constants/common.constant";

export class AccountService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = myDataSource.getRepository(User);
    }


    async getUsers() {
        const user = await this.userRepository.find({ where: { role: Role.USER } })
        return user;
    }
}