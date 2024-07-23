import { Repository } from "typeorm";
import { User } from "../../core/database/entity/user.entity";
import { myDataSource } from "../../core/database/config/data-source.config";
import { createAccountDto } from "./dtos/createAccount.dto";
import * as bcrypt from 'bcrypt';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = myDataSource.getRepository(User);
    }
    async createAccount(data: createAccountDto) {
        try {
            const userExist = await this.userRepository.findOne({
                where: { username: data.username }
            })
            if (userExist) {
                throw new Error("Username already exists");
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
}
