import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractService } from 'src/contract/contract.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users) private usersRepository: typeof Users,
    private contractService: ContractService
    ) {}

  async createUser(createUserDto: CreateUserDto) {

    try {
      
      const user = await this.usersRepository.create(createUserDto);

      const contractUser = await this.contractService.createContract(createUserDto);

      await user.$add('contract', contractUser);

      //user.reload();

      return user;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAlluser() {

    try {

      const usersAll = await this.usersRepository.findAll({include: {all: true}});

      return usersAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async findUserById(getUserDto: GetUserDto) {

    try {

      const userId = await this.usersRepository.findByPk(getUserDto.id_user, {include: {all: true}});

      return userId;

    } catch {

      throw new HttpException('Data ID is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async removeUser(getUserDto: GetUserDto) {

    try {

      const removeTyres = await this.usersRepository.destroy({where: {id_user : getUserDto.id_user}});
      
      return removeTyres;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }
}
