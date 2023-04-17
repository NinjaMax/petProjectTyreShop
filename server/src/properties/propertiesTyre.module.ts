import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropsBrandService } from './props-tyres-services/props-tyre-brand.service';
import { PropertiesBrandController } from './props-tyres-controllers/props-tyre-brand.controller';
import { PropertiesModelController } from './props-tyres-controllers/props-tyre-model.controller';
import { PropsModelService } from './props-tyres-services/props-tyre-model.service';
import { Tyres } from '../tyres/entities/tyres.model';
import { RatingTyres } from '../ratings/entities/rating-tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { RatingsModule } from '../ratings/ratings.module';
import { TyreModel } from './entities/tyres/tyre-model.model';
import { TyreBrand } from './entities/tyres/tyre-brand.model';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { PropsTyreCountryService } from './props-tyres-services/props-tyre-country.service';
import { PropsTyreDemoService } from './props-tyres-services/props-tyre-demo.service';
import { PropsTyrDiametrService } from './props-tyres-services/props-tyre-diameter.service';
import { PropsTyreHeightService } from './props-tyres-services/props-tyre-height.service';
import { PropsTyreHomologationService } from './props-tyres-services/props-tyre-homologation.service';
import { PropsTyreLoadIndexService } from './props-tyres-services/props-tyre-loadIndex.service';
import { PropsTyreParamsService } from './props-tyres-services/props-tyre-params.service';
import { PropsTyreReinforceService } from './props-tyres-services/props-tyre-reinforce.service';
import { PropsTyreRunFlatService } from './props-tyres-services/props-tyre-runFlat.service';
import { PropsTyreSealService } from './props-tyres-services/props-tyre-seal.service';
import { PropsTyreSeasonService } from './props-tyres-services/props-tyre-season.service';
import { PropsTyreSilentService } from './props-tyres-services/props-tyre-silent.service';
import { PropsTyreSizeDigitsService } from './props-tyres-services/props-tyre-sizeDigits.service';
import { PropsTyreSpeedIndexService } from './props-tyres-services/props-tyre-speedIndex.service';
import { PropsTyreStuddedService } from './props-tyres-services/props-tyre-studded.service';
import { PropsTyreVehicleTypeService } from './props-tyres-services/props-tyre-vehicleType.service';
import { PropsTyreWidthService } from './props-tyres-services/props-tyre-width.service';
import { PropsTyreYearService } from './props-tyres-services/props-tyre-year.service';
import { TyreYear } from './entities/tyres/tyre-year.model';
import { TyreWidth } from './entities/tyres/tyre-width.model';
import { TyreVehicleType } from './entities/tyres/tyre-vehicleType.model';
import { TyreStudded } from './entities/tyres/tyre-studded.model';
import { TyreSpeedIndex } from './entities/tyres/tyre-speedIndex.model';
import { TyreSizeDigits } from './entities/tyres/tyre-sizeDigits.model';
import { TyreSilent } from './entities/tyres/tyre-silent.model';
import { TyreSeason } from './entities/tyres/tyre-season.model';
import { TyreSeal } from './entities/tyres/tyre-seal.model';
import { TyreRunFlat } from './entities/tyres/tyre-runFlat.model';
import { TyreReinforce } from './entities/tyres/tyre-reinforce.model';
import { TyreParams } from './entities/tyres/tyre-params.model';
import { TyreLoadIndex } from './entities/tyres/tyre-loadIndex.model';
import { TyreHomologation } from './entities/tyres/tyre-homologation.model';
import { TyreHeight } from './entities/tyres/tyre-height.model';
import { TyreDiameter } from './entities/tyres/tyre-diameter.model';
import { TyreDemo } from './entities/tyres/tyre-demo.model';
import { TyreCountry } from './entities/tyres/tyre-country.model';

@Module({
  controllers: [PropertiesBrandController, PropertiesModelController],
  providers: [PropsBrandService, PropsModelService, PropsTyreCountryService,
    PropsTyreDemoService, PropsTyrDiametrService, PropsTyreHeightService,
    PropsTyreHomologationService, PropsTyreLoadIndexService, PropsTyreParamsService,
    PropsTyreReinforceService, PropsTyreRunFlatService, PropsTyreSealService, 
    PropsTyreSeasonService, PropsTyreSilentService, PropsTyreSizeDigitsService,
    PropsTyreSpeedIndexService, PropsTyreStuddedService, PropsTyreVehicleTypeService,
    PropsTyreWidthService, PropsTyreYearService],
  imports: [ 
    SequelizeModule.forFeature([ Tyres, RatingTyres, ReviewTyres, TyreModel, 
    TyreBrand, TyreCountry, TyreDemo, TyreDiameter, TyreHeight, TyreHomologation,
    TyreLoadIndex, TyreParams, TyreReinforce, TyreRunFlat, TyreSeal, TyreSeason,
    TyreSilent, TyreSizeDigits, TyreSpeedIndex, TyreStudded, TyreVehicleType, 
    TyreWidth, TyreYear]),
    forwardRef(() => TyresModule), RatingsModule
  ],
  exports: [PropsBrandService, PropsModelService, PropsTyreCountryService,
    PropsTyreDemoService, PropsTyrDiametrService, PropsTyreHeightService,
    PropsTyreHomologationService, PropsTyreLoadIndexService, PropsTyreParamsService,
    PropsTyreReinforceService, PropsTyreRunFlatService, PropsTyreSealService, 
    PropsTyreSeasonService, PropsTyreSilentService, PropsTyreSizeDigitsService,
    PropsTyreSpeedIndexService, PropsTyreStuddedService, PropsTyreVehicleTypeService,
    PropsTyreWidthService, PropsTyreYearService]
})
export class PropertiesTyreModule {}