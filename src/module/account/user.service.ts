import { Repository } from "typeorm";
import { User } from "../../core/database/entity/user.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { createAccountDto } from "./dtos/createAccount.dto";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { LogInDto } from "./dtos/login.dto";
import { jwtSign } from "../../core/auth/jwt.service";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = myDataSource.getRepository(User);
    }
    async createAccount(res: Response, req: Request, data: createAccountDto) {
        try {
            const userExist = await this.userRepository.findOne({
                where: { username: data.username }
            })
            if (userExist) {
                res.status(400).send('Tên tài khoản đã tồn tại.');
            }
            data.password = await bcrypt.hash(data.password, 10);
            const newUser = await this.userRepository.save(data);
            return {
                message: 'Tạo người dùng thành công',
                username: newUser.username,
            };
        }
        catch (err) {
            console.log("Internal server Error");
            throw err;
        }
    }

    async login(res: Response, req: Request, userInfo: LogInDto) {
        try {
            console.log("user", req.body)
            const user = await this.userRepository.findOne({ where: { username: userInfo.username } });
            if (!user) {
                return res.status(400).send("Người dùng không tồn tại")
            }
            const checkPassword = await bcrypt.compare(
                userInfo.password,
                user.password,
            );
            if (!checkPassword) {
                return res.status(400).send('Tên đăng nhập hoặc mật khẩu không hợp lệ');
            }
            console.log('hello')
            const accessToken = await jwtSign(user.id, user.username, user.role);
            await this.userRepository.update(user.id, { token: accessToken })
            res.cookie('token', accessToken)
            res.redirect('/admin/dashboard');
            // return res.status(200).json({ accessToken });/
        }
        catch (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
    }
}
