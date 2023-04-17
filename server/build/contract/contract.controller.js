var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
let ContractController = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
    }
    createContract(createContractDto) {
        return this.contractService.createContract(createContractDto);
    }
    findAllContract() {
        return this.contractService.findAllContract();
    }
    findContractById(getContractDto) {
        return this.contractService.findContractById(getContractDto);
    }
    update(id, updateContractDto) {
        return this.contractService.update(+id, updateContractDto);
    }
    removeContract(getContractDto) {
        return this.contractService.removeContract(getContractDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "createContract", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "findAllContract", null);
__decorate([
    Get('/id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "findContractById", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "update", null);
__decorate([
    Delete('/id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetContractDto]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "removeContract", null);
ContractController = __decorate([
    Controller('contract'),
    __metadata("design:paramtypes", [ContractService])
], ContractController);
export { ContractController };
