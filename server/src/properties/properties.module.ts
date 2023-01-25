import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertiesTyreModule } from './propertiesTyre.module';
import { PropertiesWheelModule } from './propertiesWheel.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ 
    SequelizeModule.forFeature([]),
    PropertiesTyreModule, PropertiesWheelModule
  ],
  exports: [PropertiesTyreModule, PropertiesWheelModule]
})
export class PropertiesModule {}
