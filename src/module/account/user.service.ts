import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { myDataSource } from "../../core/config/data-source.config";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = myDataSource.getRepository(User);
    }
}
