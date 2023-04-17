import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, password: string): Promise<import("./entities/users.model").Users>;
    findAll(): Promise<import("./entities/users.model").Users[]>;
    findOne(getUseDto: GetUserDto): Promise<import("./entities/users.model").Users>;
    findUserByPhone(getUseDto: GetUserDto): Promise<import("./entities/users.model").Users>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/users.model").Users>;
    remove(getUseDto: GetUserDto): Promise<number>;
}
