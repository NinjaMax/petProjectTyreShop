var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsModule } from '../ratings/ratings.module';
import { WheelBoltCount } from './entities/wheels/wheel-boltCount.model';
import { WheelBoltCountPcd } from './entities/wheels/wheel-boltCountPcd.model';
import { WheelBrand } from './entities/wheels/wheel-brand.model';
import { WheelColor } from './entities/wheels/wheel-color.model';
import { WheelDia } from './entities/wheels/wheel-dia.model';
import { WheelDiameter } from './entities/wheels/wheel-diameter.model';
import { WheelEt } from './entities/wheels/wheel-et.model';
import { WheelModel } from './entities/wheels/wheel-model.model';
import { WheelPcd } from './entities/wheels/wheel-pcd.model';
import { WheelPcd2 } from './entities/wheels/wheel-pcd2.model';
import { WheelSizeDigits } from './entities/wheels/wheel-sizeDigits.model';
import { WheelType } from './entities/wheels/wheel-type.model';
import { WheelWidth } from './entities/wheels/wheel-width.model';
import { PropsWheelBoltCountService } from './props-wheel-services/props-wheel-boltCount.service';
import { PropsWheelBoltCountPcdService } from './props-wheel-services/props-wheel-boltCountPcd.service';
import { PropsWheelBrandService } from './props-wheel-services/props-wheel-brand.service';
import { PropsWheelColorService } from './props-wheel-services/props-wheel-color.service';
import { PropsWheelDiaService } from './props-wheel-services/props-wheel-dia.service';
import { PropsWheelDiameterService } from './props-wheel-services/props-wheel-diameter.service';
import { PropsWheelEtService } from './props-wheel-services/props-wheel-et.service';
import { PropsWheelModelService } from './props-wheel-services/props-wheel-model.service';
import { PropsWheelPcdService } from './props-wheel-services/props-wheel-pcd.service';
import { PropsWheelPcd2Service } from './props-wheel-services/props-wheel-pcd2.service';
import { PropsWheelSizeDigitsService } from './props-wheel-services/props-wheel-sizeDigits.service';
import { PropsWheelTypeService } from './props-wheel-services/props-wheel-type.service';
import { PropsWheelWidthService } from './props-wheel-services/props-wheel-width.service';
import { WheelsModule } from '../wheels/wheels.module';
let PropertiesWheelModule = class PropertiesWheelModule {
};
PropertiesWheelModule = __decorate([
    Module({
        controllers: [],
        providers: [PropsWheelBoltCountService, PropsWheelBoltCountPcdService,
            PropsWheelBrandService, PropsWheelColorService, PropsWheelDiaService,
            PropsWheelDiameterService, PropsWheelEtService, PropsWheelModelService,
            PropsWheelPcdService, PropsWheelPcd2Service, PropsWheelSizeDigitsService,
            PropsWheelTypeService, PropsWheelWidthService],
        imports: [
            SequelizeModule.forFeature([WheelBoltCount, WheelBoltCountPcd,
                WheelBrand, WheelColor, WheelDia, WheelDiameter, WheelEt,
                WheelModel, WheelPcd, WheelPcd2, WheelSizeDigits, WheelType,
                WheelWidth]),
            RatingsModule, WheelsModule
        ],
        exports: [PropsWheelBoltCountService, PropsWheelBoltCountPcdService,
            PropsWheelBrandService, PropsWheelColorService, PropsWheelDiaService,
            PropsWheelDiameterService, PropsWheelEtService, PropsWheelModelService,
            PropsWheelPcdService, PropsWheelPcd2Service, PropsWheelSizeDigitsService,
            PropsWheelTypeService, PropsWheelWidthService]
    })
], PropertiesWheelModule);
export { PropertiesWheelModule };
