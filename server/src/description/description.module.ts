import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OilsModule } from '../oils/oils.module';
import { BatteriesModule } from '../batteries/batteries.module';
import { CategorysModule } from '../categorys/categorys.module';
import { Battery } from '../batteries/entities/battery.model';
import { Category } from '../categorys/entities/category.model';
import { Oil } from '../oils/entities/oil.model';
import { TyreBrand } from '../properties/entities/tyres/tyre-brand.model';
import { TyreHomologation } from '../properties/entities/tyres/tyre-homologation.model';
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { TyreVehicleType } from '../properties/entities/tyres/tyre-vehicleType.model';
import { WheelBrand } from '../properties/entities/wheels/wheel-brand.model';
import { WheelModel } from '../properties/entities/wheels/wheel-model.model';
import { WheelType } from '../properties/entities/wheels/wheel-type.model';
import { PropertiesModule } from '../properties/properties.module';
import { Tyres } from '../tyres/entities/tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { Wheel } from '../wheels/entities/wheel.model';
import { WheelsModule } from '../wheels/wheels.module';
import { Description } from './entities/description.entity';

@Module({
  controllers: [DescriptionController],
  providers: [DescriptionService],
  imports: [
    SequelizeModule.forFeature([
      Description,
      Oil,
      Wheel,
      Tyres,
      Battery,
      Category,
      TyreBrand,
      TyreHomologation,
      TyreModel,
      TyreVehicleType,
      WheelBrand,
      WheelModel,
      WheelType,
    ]),
    TyresModule,
    WheelsModule,
    OilsModule,
    BatteriesModule,
    CategorysModule,
    PropertiesModule,
  ],
  exports: [DescriptionService],
})
export class DescriptionModule {}
