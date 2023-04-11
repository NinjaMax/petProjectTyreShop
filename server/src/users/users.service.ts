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

  async createUser(createUserDto: CreateUserDto, password: string) {

    try {
      const newUser = await this.usersRepository.create({
        password: password,
        id_user: createUserDto.id_user,
        email: createUserDto.email,
        id_contract: createUserDto.id_contract,
        balance: createUserDto.balance,
        name: createUserDto.name,
        phone: createUserDto.phone,
        full_name: createUserDto.full_name,
      });

      const contractUser = await this.contractService.createContract(
        createUserDto,
      );

      await newUser.$add('contract', contractUser);

      //user.reload();

      return newUser;

    } catch {

      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
    }
    
  }

  async findAlluser() {
    try {
      const usersAll = await this.usersRepository.findAll({
        include: { all: true },
      });

      return usersAll;

    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

  }

  async findUserById(getUserDto: GetUserDto) {
    try {
      const userId = await this.usersRepository.findByPk(getUserDto.id_user, {include: {all: true}});

      return userId;

    } catch {
      throw new HttpException(
        'Data ID is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

  }

  async findUserByName(getUserDto: GetUserDto) {
    try {
      const userByName = await this.usersRepository.findOne({where: {name: getUserDto.name}});

      return userByName;

    } catch {
      throw new HttpException(
        'Data ID is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

  }

  async findUserByPhone(getUserDto: GetUserDto) {
    try {
      const userByPhone = await this.usersRepository.findOne({
        where: { phone: getUserDto.phone }
      });

      return userByPhone;

    } catch {

      throw new HttpException(
        'Data PHONE is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

  }

  async updateUserByUser (id_user: number, updateUserDto: UpdateUserDto) {
    try {
      const userId = await this.usersRepository.findByPk(
        updateUserDto.id_user,
        { include: { all: true } },
      );
      
    if (userId) {
      await this.usersRepository.update(
      {  
        name: updateUserDto.name,
        full_name: updateUserDto.full_name,
        email: updateUserDto.email,
        //update_date : updateTyreDto.update_date
          },
          { where: { id_user: userId.id_user } },
        );

        userId.save();
      //const updateTyres = await this.tyresRepository.findByPk(updateTyreDto.id, {include: {all: true}});

      return userId; 
    }

    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
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
