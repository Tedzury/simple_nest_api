import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
