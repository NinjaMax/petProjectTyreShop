import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertiesTyreModule } from './propertiesTyre.module';
import { PropertiesWheelModule } from './propertiesWheel.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ 
    SequelizeModule.forFeature([]),
    PropertiesTyreModule,
    PropertiesWheelModule,
    forwardRef(() => AuthModule),
  ],
  exports: [PropertiesTyreModule, PropertiesWheelModule]
})
export class PropertiesModule {}
