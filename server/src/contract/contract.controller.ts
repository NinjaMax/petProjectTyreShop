import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }

  @Post('/new')
  createNewContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContractNew(createContractDto);
  }

  @Get()
  findAllContract() {
    return this.contractService.findAllContract();
  }

  @Get('/id')
  findContractById(getContractDto: GetContractDto) {
    return this.contractService.findContractById(getContractDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete('/id')
  removeContract( getContractDto: GetContractDto) {
    return this.contractService.removeContract(getContractDto);
  }
}
