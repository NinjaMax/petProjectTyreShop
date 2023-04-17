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
import { PropsTyreCountryService } from '../properties/props-tyres-services/props-tyre-country.service';
import { CategorysService } from '../categorys/categorys.service';
import { PriceTyresService } from '../prices/price-tyres.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsTyreDemoService } from '../properties/props-tyres-services/props-tyre-demo.service';
import { PropsTyrDiametrService } from '../properties/props-tyres-services/props-tyre-diameter.service';
import { PropsTyreHeightService } from '../properties/props-tyres-services/props-tyre-height.service';
import { PropsTyreHomologationService } from '../properties/props-tyres-services/props-tyre-homologation.service';
import { PropsTyreLoadIndexService } from '../properties/props-tyres-services/props-tyre-loadIndex.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { PropsTyreParamsService } from '../properties/props-tyres-services/props-tyre-params.service';
import { PropsTyreReinforceService } from '../properties/props-tyres-services/props-tyre-reinforce.service';
import { PropsTyreRunFlatService } from '../properties/props-tyres-services/props-tyre-runFlat.service';
import { PropsTyreSealService } from '../properties/props-tyres-services/props-tyre-seal.service';
import { PropsTyreSeasonService } from '../properties/props-tyres-services/props-tyre-season.service';
import { PropsTyreSilentService } from '../properties/props-tyres-services/props-tyre-silent.service';
import { PropsTyreSizeDigitsService } from '../properties/props-tyres-services/props-tyre-sizeDigits.service';
import { PropsTyreSpeedIndexService } from '../properties/props-tyres-services/props-tyre-speedIndex.service';
import { PropsTyreStuddedService } from '../properties/props-tyres-services/props-tyre-studded.service';
import { PropsTyreVehicleTypeService } from '../properties/props-tyres-services/props-tyre-vehicleType.service';
import { PropsTyreWidthService } from '../properties/props-tyres-services/props-tyre-width.service';
import { PropsTyreYearService } from '../properties/props-tyres-services/props-tyre-year.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TyresService } from '../tyres/tyres.service';
let AddTyresToDbService = class AddTyresToDbService {
    constructor(categoryService, tyresservice, supplierService, stockTyresService, priceTyreService, propsBrandService, propsTyreCountry, propsTyreDemo, propsTyreDiameter, propsTyreHeight, propsTyreHomologation, propsTyreLoadIndex, propsTyreModel, propsTyreParams, propsTyreReinforce, propsTyreRunFlat, propsTyreSeal, propsTyreSeason, propsTyreSilent, propsTyreSizeDigits, propsTyreSpeedIndex, propsTyreStudded, propsTyreVehicleType, propsTyreWidth, propsTyreYear) {
        this.categoryService = categoryService;
        this.tyresservice = tyresservice;
        this.supplierService = supplierService;
        this.stockTyresService = stockTyresService;
        this.priceTyreService = priceTyreService;
        this.propsBrandService = propsBrandService;
        this.propsTyreCountry = propsTyreCountry;
        this.propsTyreDemo = propsTyreDemo;
        this.propsTyreDiameter = propsTyreDiameter;
        this.propsTyreHeight = propsTyreHeight;
        this.propsTyreHomologation = propsTyreHomologation;
        this.propsTyreLoadIndex = propsTyreLoadIndex;
        this.propsTyreModel = propsTyreModel;
        this.propsTyreParams = propsTyreParams;
        this.propsTyreReinforce = propsTyreReinforce;
        this.propsTyreRunFlat = propsTyreRunFlat;
        this.propsTyreSeal = propsTyreSeal;
        this.propsTyreSeason = propsTyreSeason;
        this.propsTyreSilent = propsTyreSilent;
        this.propsTyreSizeDigits = propsTyreSizeDigits;
        this.propsTyreSpeedIndex = propsTyreSpeedIndex;
        this.propsTyreStudded = propsTyreStudded;
        this.propsTyreVehicleType = propsTyreVehicleType;
        this.propsTyreWidth = propsTyreWidth;
        this.propsTyreYear = propsTyreYear;
    }
    addTyresToDb(item) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.tyresservice.createTyresFromPrice(+item.id, (_a = item.full_name) !== null && _a !== void 0 ? _a : '', (_b = item.photo_url) !== null && _b !== void 0 ? _b : '', item.update_date);
                yield this.categoryService.createCategoryFromPrice(+item.id, (_c = item.price_list_type) !== null && _c !== void 0 ? _c : '');
                yield this.supplierService.createSupplierFromPrice(+item.provider_id, (_d = item.provider) !== null && _d !== void 0 ? _d : '', (_e = item.city) !== null && _e !== void 0 ? _e : '', (_f = item.city_ua) !== null && _f !== void 0 ? _f : '');
                yield this.propsBrandService.createTyreBrandFromPrice(+item.id, +item.brand_id, (_g = item.brand) !== null && _g !== void 0 ? _g : '');
                yield this.propsTyreModel.createTyreModelFromPrice(+item.id, +item.model_id, String(item.model) === 'undefined' ? '' : String(item.model));
                yield this.propsTyreCountry.createTyreCountryFromPrice(+item.id, (_h = item.country_manufacturer) !== null && _h !== void 0 ? _h : '', (_j = item.country_manufacturer_ua) !== null && _j !== void 0 ? _j : '');
                yield this.propsTyreDemo.createTyreDemoFromPrice(+item.id, (_k = item.demo) !== null && _k !== void 0 ? _k : '');
                yield this.propsTyreDiameter.createTyreDiameterFromPrice(+item.id, String(item.diameter).replace(/,/g, ".") === 'undefined' ? '' : String(item.diameter).replace(/,/g, "."));
                yield this.propsTyreHeight.createTyreHeightFromPrice(+item.id, String(item.height).replace(/,/g, ".") === 'undefined' ? '' : String(item.height).replace(/,/g, "."));
                yield this.propsTyreHomologation.createTyreHomologationFromPrice(+item.id, (_l = item.homologation) !== null && _l !== void 0 ? _l : '');
                yield this.propsTyreLoadIndex.createLoadIndexFromPrice(+item.id, String(item.load_index) === 'undefined' ? '' : String(item.load_index), (_m = item.load_index_with_desc) !== null && _m !== void 0 ? _m : '');
                yield this.propsTyreParams.createParamsFromPrice(+item.id, (_o = item.params) !== null && _o !== void 0 ? _o : '');
                yield this.propsTyreReinforce.createTyreReinforceFromPrice(+item.id, (_p = item.reinforce) !== null && _p !== void 0 ? _p : '');
                yield this.propsTyreRunFlat.createTyreRunFlatFromPrice(+item.id, (_q = item.run_flat) !== null && _q !== void 0 ? _q : '');
                yield this.propsTyreSeal.createTyreSealFromPrice(+item.id, (_r = item.seal) !== null && _r !== void 0 ? _r : '');
                yield this.propsTyreSeason.createTyreSeasonFromPrice(+item.id, +item.season_id, (_s = item.season) !== null && _s !== void 0 ? _s : '', (_t = item.season_ua) !== null && _t !== void 0 ? _t : '');
                yield this.propsTyreSilent.createTyreSilentFromPrice(+item.id, (_u = item.silent) !== null && _u !== void 0 ? _u : '');
                yield this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(+item.id, (_v = item.size_only_digits) !== null && _v !== void 0 ? _v : '');
                yield this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(+item.id, (_w = item.speed_index) !== null && _w !== void 0 ? _w : '', (_x = item.speed_index_with_desc) !== null && _x !== void 0 ? _x : '');
                yield this.propsTyreStudded.createTyreStuddedFromPrice(+item.id, (_y = item.studded) !== null && _y !== void 0 ? _y : '');
                yield this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(+item.id, +item.vehicle_type_id, (_z = item.vehicle_type) !== null && _z !== void 0 ? _z : '', (_0 = item.vehicle_type_ua) !== null && _0 !== void 0 ? _0 : '');
                yield this.propsTyreWidth.createTyreWidthFromPrice(+item.id, String(item.width).replace(/,/g, ".") === 'undefined' ? '' : String(item.width).replace(/,/g, "."));
                yield this.propsTyreYear.createTyreYearFromPrice(+item.id, (_1 = item.manufacture_year) !== null && _1 !== void 0 ? _1 : '');
                yield this.stockTyresService.createStockTyreFromPrice(+item.id, +item.in_stock, +item.provider_id, item.update_date);
                yield this.priceTyreService.createPriceTyresFromPrice(+item.id, +item.user_price_wholesale, +item.user_price, +item.user_delivery_price, +item.user_price_plus_user_delivery_price, +item.provider_id, item.update_date);
                return 'Price added to DATA BASE';
            }
            catch (error) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
AddTyresToDbService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CategorysService,
        TyresService,
        SuppliersService,
        StockTyresService,
        PriceTyresService,
        PropsBrandService,
        PropsTyreCountryService,
        PropsTyreDemoService,
        PropsTyrDiametrService,
        PropsTyreHeightService,
        PropsTyreHomologationService,
        PropsTyreLoadIndexService,
        PropsModelService,
        PropsTyreParamsService,
        PropsTyreReinforceService,
        PropsTyreRunFlatService,
        PropsTyreSealService,
        PropsTyreSeasonService,
        PropsTyreSilentService,
        PropsTyreSizeDigitsService,
        PropsTyreSpeedIndexService,
        PropsTyreStuddedService,
        PropsTyreVehicleTypeService,
        PropsTyreWidthService,
        PropsTyreYearService])
], AddTyresToDbService);
export { AddTyresToDbService };
