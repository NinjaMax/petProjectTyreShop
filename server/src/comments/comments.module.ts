import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from './entities/comment.model';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersSuppliersModule } from 'src/orders-suppliers/orders-suppliers.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [ 
    SequelizeModule.forFeature([Comments]),
    forwardRef(()=> OrdersModule),
    OrdersSuppliersModule, UsersModule
  ],
  exports: [CommentsService]
})
export class CommentsModule {}
