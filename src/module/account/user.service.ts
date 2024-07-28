import { Repository } from "typeorm";
import { User } from "../../core/database/entity/user.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { createAccountDto } from "./dtos/createAccount.dto";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { LogInDto } from "./dtos/login.dto";
import { jwtSign } from "../../core/auth/jwt.service";
import { Role } from "../../core/constants/common.constant";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = myDataSource.getRepository(User);
    }
    async createAccount(res: Response, req: Request, data: createAccountDto) {
        try {
            console.log(data)
            const userExist = await this.userRepository.findOne({
                where: { username: data.username }
            })
            if (userExist || userExist != null) {
                res.status(400).json('Tên tài khoản đã tồn tại.');
            }
            data.password = await bcrypt.hash(data.password, 10);
            await this.userRepository.save(data);
            res.redirect('/');
        }
        catch (err) {
            console.log("Server Lỗi");
            throw err;
        }
    }

    async login(res: Response, req: Request, userInfo: LogInDto) {
        try {
            const user = await this.userRepository.findOne({ where: { username: userInfo.username } });
            if (!user) {
                return res.status(400).send("Người dùng không tồn tại")
            }
            const checkPassword = await bcrypt.compare(
                userInfo.password,
                user.password,
            );
            console.log(checkPassword)
            if (!checkPassword) {
                return res.status(400).send('Tên đăng nhập hoặc mật khẩu không hợp lệ');
            }
            const accessToken = await jwtSign(user.id, user.username, user.role);
            await this.userRepository.update(user.id, { token: accessToken })
            res.cookie('token', accessToken)
            res.redirect(user.role == Role.USER ? '/client/home' : '/admin/dashboard')
        }
        catch (err) {
            console.log(err);
            return res.status(500).send('Sever lỗi');
        }
    }
    async getUser() {
        try {
            const user = await this.userRepository.find({ where: { role: Role.USER } })
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }

    async update(res: Response, id: number, data: any) {
        try {
            const article = await this.userRepository.findOne({ where: { id } });
            if (!article) {
                res.send(` bài viêt k tồn tại`);
            }
            const user = await this.userRepository.update(id, data);
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getDetail(id: number) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }

    async delete(id: number) {
        try {
            const user = await this.userRepository.delete(id);
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getUsers() {
        try {
            const user = await this.userRepository.find({ where: { role: Role.USER } })
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }
}
