import { CacheStore, Module } from '@nestjs/common';
import { RedisClientOptions, createClient } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { SequelizeModule } from '@nestjs/sequelize';
import { TyresModule } from './tyres/tyres.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PricesModule } from './prices/prices.module';
import { PriceTyres } from './prices/entities/price-tyres.model';
import { Tyres } from './tyres/entities/tyres.model';
import { Supplier } from './suppliers/entities/supplier.model';
import { StockTyres } from './stock/entities/stock-tyres.model';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StockModule } from './stock/stock.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingsModule } from './ratings/ratings.module';
import { RatingTyres } from './ratings/entities/rating-tyres.model';
import { ReviewTyres } from './reviews/entities/review-tyres.model';
import { TyreBrand } from './properties/entities/tyres/tyre-brand.model';
import { TyreModel } from './properties/entities/tyres/tyre-model.model';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.model';
import { CategorysModule } from './categorys/categorys.module';
import { CommentsModule } from './comments/comments.module';
import { StorageModule } from './storage/storage.module';
import { SalesModule } from './sales/sales.module';
import { CashboxModule } from './cashbox/cashbox.module';
import { PaynmentModule } from './paynment/paynment.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ServicesModule } from './add_services/services.module';
import { WheelsModule } from './wheels/wheels.module';
import { BatteriesModule } from './batteries/batteries.module';
import { OilsModule } from './oils/oils.module';
import { IncomesModule } from './incomes/incomes.module';
import { PriceWheels } from './prices/entities/price-wheels.model';
import { PriceBatteries } from './prices/entities/price-battery.model';
import { PriceOil } from './prices/entities/price-oils.model';
import { StockWheels } from './stock/entities/stock-wheels.model';
import { StockBatteries } from './stock/entities/stock-batteries.model';
import { StockOils } from './stock/entities/stock-oils.model';
import { Wheel } from './wheels/entities/wheel.model';
import { Battery } from './batteries/entities/battery.model';
import { Oil } from './oils/entities/oil.model';
import { Comments } from './comments/entities/comment.model';
import { Expense } from './expenses/entities/expense.model';
import { Incomes } from './incomes/entities/income.model';
import { Category } from './categorys/entities/category.model';
import { Sales } from './sales/entities/sale.model';
import { Cashbox } from './cashbox/entities/cashbox.model';
import { Paynment } from './paynment/entities/paynment.model';
import { Service } from './add_services/entities/service.model';
import { OrdersModule } from './orders/orders.module';
import { OrdersSuppliersModule } from './orders-suppliers/orders-suppliers.module';
import { Orders } from './orders/entities/order.model';
import { OrdersSupplier } from './orders-suppliers/entities/orders-supplier.model';
import { SaleStorage } from './sales/entities/sales-storage.model';
import { Order_Storage } from './orders/entities/order-storage.model';
import { Storage } from './storage/entities/storage.model';
import { BasketModule } from './basket/basket.module';
import { Basket } from './basket/entities/basket.model';
import { OrdersSupStorage } from './orders-suppliers/entities/orders-sup-storage.model';
import { ContractModule } from './contract/contract.module';
import { Contract } from './contract/entities/contract.model';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.model';
import { UploaderModule } from './uploader/uploader.module';
import { TyreYear } from './properties/entities/tyres/tyre-year.model';
import { TyreWidth } from './properties/entities/tyres/tyre-width.model';
import { TyreVehicleType } from './properties/entities/tyres/tyre-vehicleType.model';
import { TyreStudded } from './properties/entities/tyres/tyre-studded.model';
import { TyreSpeedIndex } from './properties/entities/tyres/tyre-speedIndex.model';
import { TyreSizeDigits } from './properties/entities/tyres/tyre-sizeDigits.model';
import { TyreSilent } from './properties/entities/tyres/tyre-silent.model';
import { TyreSeason } from './properties/entities/tyres/tyre-season.model';
import { TyreSeal } from './properties/entities/tyres/tyre-seal.model';
import { TyreRunFlat } from './properties/entities/tyres/tyre-runFlat.model';
import { TyreReinforce } from './properties/entities/tyres/tyre-reinforce.model';
import { TyreParams } from './properties/entities/tyres/tyre-params.model';
import { TyreLoadIndex } from './properties/entities/tyres/tyre-loadIndex.model';
import { TyreHomologation } from './properties/entities/tyres/tyre-homologation.model';
import { TyreHeight } from './properties/entities/tyres/tyre-height.model';
import { TyreDiameter } from './properties/entities/tyres/tyre-diameter.model';
import { TyreDemo } from './properties/entities/tyres/tyre-demo.model';
import { TyreCountry } from './properties/entities/tyres/tyre-country.model';
import { WheelBrand } from './properties/entities/wheels/wheel-brand.model';
import { WheelModel } from './properties/entities/wheels/wheel-model.model';
import { WheelWidth } from './properties/entities/wheels/wheel-width.model';
import { WheelType } from './properties/entities/wheels/wheel-type.model';
import { WheelEt } from './properties/entities/wheels/wheel-et.model';
import { WheelDiameter } from './properties/entities/wheels/wheel-diameter.model';
import { WheelDia } from './properties/entities/wheels/wheel-dia.model';
import { WheelColor } from './properties/entities/wheels/wheel-color.model';
import { WheelSizeDigits } from './properties/entities/wheels/wheel-sizeDigits.model';
import { WheelPcd2 } from './properties/entities/wheels/wheel-pcd2.model';
import { WheelBoltCountPcd } from './properties/entities/wheels/wheel-boltCountPcd.model';
import { WheelBoltCount } from './properties/entities/wheels/wheel-boltCount.model';
import { WheelPcd } from './properties/entities/wheels/wheel-pcd.model';
import { AuthModule } from './auth/auth.module';
import { PaytypesModule } from './paytypes/paytypes.module';
import { Paytype } from './paytypes/entities/paytype.entity';
import { DescriptionModule } from './description/description.module';
import { Description } from './description/entities/description.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Basket_Storage } from './basket/entities/basket-storage.model';
import { TyreEuromark } from './properties/entities/tyres/tyre-euromark.model';
import { ReviewStore } from './reviews/entities/review-store.model';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { Answer } from './answers/entities/answer.entity';
import { Question } from './questions/entities/question.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        models: [
          Tyres,
          Wheel,
          Battery,
          Oil,
          Supplier,
          Comments,
          Expense,
          Incomes,
          Category,
          Sales,
          Cashbox,
          Paynment,
          StockTyres,
          StockWheels,
          StockBatteries,
          StockOils,
          PriceTyres,
          PriceWheels,
          PriceBatteries,
          PriceOil,
          RatingTyres,
          ReviewTyres,
          TyreBrand,
          TyreModel,
          TyreCountry,
          TyreDemo,
          TyreDiameter,
          TyreHeight,
          TyreHomologation,
          TyreLoadIndex,
          TyreParams,
          TyreReinforce,
          TyreRunFlat,
          TyreSeal,
          TyreSeason,
          TyreSilent,
          TyreSizeDigits,
          TyreSpeedIndex,
          TyreStudded,
          TyreVehicleType,
          TyreWidth,
          TyreYear,
          TyreEuromark,
          WheelBrand,
          WheelModel,
          WheelBoltCount,
          WheelPcd,
          WheelBoltCountPcd,
          WheelPcd2,
          WheelSizeDigits,
          WheelColor,
          WheelDia,
          WheelDiameter,
          WheelEt,
          WheelType,
          WheelWidth,
          Paytype,
          Users,
          Service,
          Orders,
          OrdersSupplier,
          OrdersSupStorage,
          SaleStorage,
          Order_Storage,
          Storage,
          Basket,
          Contract,
          Customer,
          Description,
          Basket_Storage,
          ReviewStore,
          Answer,
          Question,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule.register({ folder: './config' })],
      useFactory: async (configService: ConfigService) => {

        const store = createClient({
          //ttl: configService.get('CACHE_TTL'),
          //isGlobal: true,
          //store: redisStore as unknown as CacheStore,
          socket: {
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
          },
          // username: configService.get('REDIS_USERNAME'),
          // password: configService.get('REDIS_PASSWORD'),
          
        });
        //isGlobal: true;
        await store.connect();
        return { store: store as unknown as CacheStore };
      },
      isGlobal: true,
      inject: [ConfigService],
    }),
    TyresModule,
    WheelsModule,
    BatteriesModule,
    OilsModule,
    PricesModule,
    StockModule,
    SuppliersModule,
    ReviewsModule,
    RatingsModule,
    PropertiesModule,
    UsersModule,
    CategorysModule,
    CommentsModule,
    StorageModule,
    SalesModule,
    CashboxModule,
    PaynmentModule,
    ExpensesModule,
    ServicesModule,
    IncomesModule,
    OrdersModule,
    OrdersSuppliersModule,
    BasketModule,
    ContractModule,
    CustomersModule,
    UploaderModule,
    AuthModule,
    PaytypesModule,
    DescriptionModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};

