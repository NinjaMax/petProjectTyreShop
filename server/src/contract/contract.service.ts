import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.model';

@Injectable()
export class ContractService {

  constructor(@InjectModel(Contract) private contractRepository: typeof Contract
  ) {}

  async create( createContractDto:CreateContractDto ) {

     try {

      const contract = await this.contractRepository.create(createContractDto);

      return contract;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  
  }

  async findAllContract() {

    try {

      const contractAll = await this.contractRepository.findAll({include: {all: true}});

      return contractAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async findContractById(getContractDto: GetContractDto) {

    try {

      const contractById = await this.contractRepository.findByPk(getContractDto.id_contract, {include: {all: true}});

      return contractById;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} paynment`;
  }

  async removeContract(getContractDto: GetContractDto) {

    try {

      const contractRemove = await this.contractRepository.destroy({where: {id_contract: getContractDto.id_contract}});

      return contractRemove;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }
}
