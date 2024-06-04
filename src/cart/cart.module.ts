import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
