import { myDataSource } from "../src/core/config/data-source.config";
import { Role } from "../src/core/constants/common.constant";
import { User } from "../src/entity/user.entity";
import * as bcrypt from 'bcrypt';


async function createUsers() {
    await myDataSource.initialize();
    const userRepository = myDataSource.getRepository(User);

    const admin = { username: "admin", name: "admin", password: "admin", role: Role.ADMIN }
    admin.password = await bcrypt.hash(admin.password,10)
    // const newUser = userRepository.create();
    await userRepository.save(admin);
    await myDataSource.destroy();
}

createUsers().then(() => {
    console.log("Users created");
}).catch(error => console.log(error));
