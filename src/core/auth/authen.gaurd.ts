import { NextFunction, Request, Response } from "express";
import { User } from "../database/entity/user.entity";
import { jwtVerify } from "./jwt.service";
import { myDataSource } from "../database/config/data-source.config";



export const isAuth = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const accessTokenFromHeader = req.headers['token'];
        if (!accessTokenFromHeader) {
            return res.status(401).send('Không tìm thấy access token!');
        }

        const verified = await jwtVerify(
            accessTokenFromHeader,
        );
        if (!verified) {
            return res.status(401).send('Bạn không có quyền truy cập vào tính năng này!');
        }
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username: verified?.username } });
        if (!user) {
            return res.status(404).send('Người dùng không tồn tại!');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in isAuth middleware:', error);
        return res.status(500).send('Lỗi server!');
    }
};
