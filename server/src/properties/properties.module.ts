import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertiesTyreModule } from './propertiesTyre.module';
import { PropertiesWheelModule } from './propertiesWheel.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ 
    SequelizeModule.forFeature([]),
    PropertiesTyreModule, PropertiesWheelModule, AuthModule
  ],
  exports: [PropertiesTyreModule, PropertiesWheelModule]
})
export class PropertiesModule {}
