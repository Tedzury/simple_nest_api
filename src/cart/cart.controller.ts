import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

type RequestUserType = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCart(@Req() req: Request) {
    return this.cartService.getCart((req.user as RequestUserType).id);
  }

  @Patch('addToCart')
  @UseGuards(JwtAuthGuard)
  addItemToCart(@Req() req: Request) {
    return this.cartService.addItemToCart(
      (req.user as RequestUserType).id,
      req.body.productId.toString(),
    );
  }
}
