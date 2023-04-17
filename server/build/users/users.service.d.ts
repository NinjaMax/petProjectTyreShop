import { ContractService } from '../contract/contract.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.model';
export declare class UsersService {
    private usersRepository;
    private contractService;
    constructor(usersRepository: typeof Users, contractService: ContractService);
    createUser(createUserDto: CreateUserDto, password: string): Promise<Users>;
    findAlluser(): Promise<Users[]>;
    findUserById(getUserDto: GetUserDto): Promise<Users>;
    findUserByName(getUserDto: GetUserDto): Promise<Users>;
    findUserByPhone(getUserDto: GetUserDto): Promise<Users>;
    updateUserByUser(id_user: number, updateUserDto: UpdateUserDto): Promise<Users>;
    removeUser(getUserDto: GetUserDto): Promise<number>;
}
