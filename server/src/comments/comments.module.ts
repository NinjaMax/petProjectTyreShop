import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from './entities/comment.model';
import { AuthModule } from '../auth/auth.module';
import { OrdersSuppliersModule } from '../orders-suppliers/orders-suppliers.module';
import { OrdersModule } from '../orders/orders.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Comments]),
    forwardRef(() => OrdersModule),
    forwardRef(() => OrdersSuppliersModule),
    UsersModule,
    AuthModule,
    CustomersModule,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
