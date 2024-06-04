import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ERROR_MESSSAGES } from 'src/shared/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSingleProduct(@Req() req: Request) {
    const product = await this.productsService.getSingleProduct(req.params.id);
    if (!product) {
      throw new HttpException(ERROR_MESSSAGES.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
