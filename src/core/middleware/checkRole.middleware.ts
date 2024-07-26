import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/common.constant";

export const checkRole = (roles: Role) => {
    return (req: Request | any, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            return res.status(401).send("Chưa xác thực");
        }

        if (!roles.includes(user.role)) {
            return res.status(403).send("Không có quyền truy cập");
        }

        next();
    };
};
