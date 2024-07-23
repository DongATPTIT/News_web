import { UserService } from "../user.service";

export class AdminController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
}