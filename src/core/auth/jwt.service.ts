import { Role } from "../constants/common.constant";
const jwt = require("jsonwebtoken");

export const jwtSign = async (id: number, username: string, role: Role) => {
    return jwt.sign(
        {
            id: id,
            role: role,
            username: username
        },
        process.env.SECRET_KEY,
        {
            expiresIn: 60 * 60,
        }
    );
};

export const jwtVerify = async (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.log(`Error in verify JWT token: ${error}`);
    }
};


