var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CategorysService } from '../categorys/categorys.service';
import { PriceWheelsService } from '../prices/price-wheels.service';
import { PropsWheelBoltCountService } from '../properties/props-wheel-services/props-wheel-boltCount.service';
import { PropsWheelBoltCountPcdService } from '../properties/props-wheel-services/props-wheel-boltCountPcd.service';
import { PropsWheelBrandService } from '../properties/props-wheel-services/props-wheel-brand.service';
import { PropsWheelColorService } from '../properties/props-wheel-services/props-wheel-color.service';
import { PropsWheelDiaService } from '../properties/props-wheel-services/props-wheel-dia.service';
import { PropsWheelDiameterService } from '../properties/props-wheel-services/props-wheel-diameter.service';
import { PropsWheelEtService } from '../properties/props-wheel-services/props-wheel-et.service';
import { PropsWheelModelService } from '../properties/props-wheel-services/props-wheel-model.service';
import { PropsWheelPcdService } from '../properties/props-wheel-services/props-wheel-pcd.service';
import { PropsWheelPcd2Service } from '../properties/props-wheel-services/props-wheel-pcd2.service';
import { PropsWheelSizeDigitsService } from '../properties/props-wheel-services/props-wheel-sizeDigits.service';
import { PropsWheelTypeService } from '../properties/props-wheel-services/props-wheel-type.service';
import { PropsWheelWidthService } from '../properties/props-wheel-services/props-wheel-width.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { WheelsService } from '../wheels/wheels.service';
let AddWheelsToDbService = class AddWheelsToDbService {
    constructor(categoryService, supplierService, wheelsService, stockWheelService, priceWheelService, propsWheelBrandService, propsWheelBoltCountService, propsWheelBoltCountPcdService, propsWheelColorService, propsWheelDiaService, propsWheelDiameter, propsWheelEtService, propsWheelModelService, propsWheelPcdService, propsWheelPcd2Service, propsWheelSizeDigitsService, propsWheelTypeService, propsWheelWidthService) {
        this.categoryService = categoryService;
        this.supplierService = supplierService;
        this.wheelsService = wheelsService;
        this.stockWheelService = stockWheelService;
        this.priceWheelService = priceWheelService;
        this.propsWheelBrandService = propsWheelBrandService;
        this.propsWheelBoltCountService = propsWheelBoltCountService;
        this.propsWheelBoltCountPcdService = propsWheelBoltCountPcdService;
        this.propsWheelColorService = propsWheelColorService;
        this.propsWheelDiaService = propsWheelDiaService;
        this.propsWheelDiameter = propsWheelDiameter;
        this.propsWheelEtService = propsWheelEtService;
        this.propsWheelModelService = propsWheelModelService;
        this.propsWheelPcdService = propsWheelPcdService;
        this.propsWheelPcd2Service = propsWheelPcd2Service;
        this.propsWheelSizeDigitsService = propsWheelSizeDigitsService;
        this.propsWheelTypeService = propsWheelTypeService;
        this.propsWheelWidthService = propsWheelWidthService;
    }
    addWheelsToDb(item) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wheelsService.createWheelFromPrice(+item.id, (_a = item.full_name) !== null && _a !== void 0 ? _a : '', (_b = item.fullname_color_full) !== null && _b !== void 0 ? _b : '', (_c = item.fullname_hotline) !== null && _c !== void 0 ? _c : '', (_d = item.photo_url) !== null && _d !== void 0 ? _d : '', item.update_date);
                yield this.categoryService.createCategoryWheelFromPrice(+item.id, (_e = item.price_list_type) !== null && _e !== void 0 ? _e : '');
                yield this.supplierService.createSupplierFromPrice(+item.provider_id, String(item.provider) === 'undefined' ? '' : String(item.provider), (_f = item.city) !== null && _f !== void 0 ? _f : '', (_g = item.city_ua) !== null && _g !== void 0 ? _g : '');
                yield this.propsWheelBrandService.createWheelBrandFromPrice(+item.id, (_h = item.brand) !== null && _h !== void 0 ? _h : '');
                yield this.propsWheelModelService.createWheelModelFromPrice(+item.id, item.model_id, String(item.model) === 'undefined' ? '' : String(item.model));
                yield this.propsWheelWidthService.createWheelWidthFromPrice(+item.id, String(item.width).replace(/,/g, ".") === 'undefined' ? '' : String(item.width).replace(/,/g, "."));
                yield this.propsWheelPcdService.createWheelPcdFromPrice(item.id, String(item.pcd).replace(/,/g, ".") === 'undefined' ? '' : String(item.pcd).replace(/,/g, "."));
                yield this.propsWheelPcd2Service.createWheelPcd2FromPrice(item.id, String(item.pcd2).replace(/,/g, ".") === 'undefined' ? '' : String(item.pcd2).replace(/,/g, "."));
                yield this.propsWheelBoltCountService.createWheelBoltCountFromPrice(+item.id, String(item.bolt_count).replace(/,/g, ".") === 'undefined' ? '' : String(item.bolt_count).replace(/,/g, "."));
                yield this.propsWheelBoltCountPcdService.createWheelBoltCountPcdFromPrice(+item.id, String(item.bolt_count_pcd).replace(/,/g, ".") === 'undefined' ? '' : String(item.bolt_count_pcd).replace(/,/g, "."));
                yield this.propsWheelColorService.createWheelColorFromPrice(+item.id, item.color_id === '' || item.color_id === 'undefined' ? '999' : item.color_id, (_j = item.color) !== null && _j !== void 0 ? _j : '', (_k = item.color_short) !== null && _k !== void 0 ? _k : '');
                yield this.propsWheelDiameter.createWheelDiameterFromPrice(item.id, String(item.diameter).replace(/,/g, ".") === 'undefined' ? '' : String(item.diameter).replace(/,/g, "."));
                yield this.propsWheelDiaService.createWheelDiaFromPrice(item.id, String(item.dia).replace(/,/g, ".") === 'undefined' ? '' : String(item.dia).replace(/,/g, "."));
                yield this.propsWheelEtService.createWheelEtFromPrice(item.id, String(item.et).replace(/,/g, ".") === 'undefined' ? '' : String(item.et).replace(/,/g, "."));
                yield this.propsWheelTypeService.createWheelTypeFromPrice(+item.id, item.type_id === '' || item.type_id === 'undefined' ? '999' : item.type_id, (_l = item.type) !== null && _l !== void 0 ? _l : '');
                yield this.propsWheelSizeDigitsService.createWheelSizeDigitsFromPrice(item.id, (_m = item.size_only_digits) !== null && _m !== void 0 ? _m : '');
                yield this.stockWheelService.createStockWheelFromPrice(+item.id, +item.in_stock, +item.provider_id, item.update_date);
                yield this.priceWheelService.createPriceWheelsFromPrice(+item.id, +item.user_price_wholesale, +item.user_price, +item.user_delivery_price, +item.user_price_plus_user_delivery_price, +item.provider_id, item.update_date);
                return 'Price added to DATA BASE';
            }
            catch (error) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
AddWheelsToDbService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CategorysService,
        SuppliersService,
        WheelsService,
        StockWheelsService,
        PriceWheelsService,
        PropsWheelBrandService,
        PropsWheelBoltCountService,
        PropsWheelBoltCountPcdService,
        PropsWheelColorService,
        PropsWheelDiaService,
        PropsWheelDiameterService,
        PropsWheelEtService,
        PropsWheelModelService,
        PropsWheelPcdService,
        PropsWheelPcd2Service,
        PropsWheelSizeDigitsService,
        PropsWheelTypeService,
        PropsWheelWidthService])
], AddWheelsToDbService);
export { AddWheelsToDbService };
