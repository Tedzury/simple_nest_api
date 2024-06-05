import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { ERROR_MESSSAGES, MODIFY_CART_ACTIONS } from 'src/shared/constants';

@Injectable()
export class DataAccessService {
  constructor(private readonly prismaService: PrismaClientService) {}

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(authDto: AuthPayloadDto) {
    try {
      const result = await this.prismaService.user.create({
        data: { ...authDto, cart: { create: {} } },
      });
      return result;
    } catch {
      return ERROR_MESSSAGES.EMAIL_OCCUPIED;
    }
  }

  async getAllProducts() {
    return await this.prismaService.product.findMany();
  }

  async getSingleProduct(id: string) {
    return await this.prismaService.product.findUnique({ where: { id } });
  }

  async getCart(userId: string) {
    const cart = await this.prismaService.cart.findUnique({ where: { userId } });
    const allCartItems = await this.getAllCartItems(cart.id);

    return { cart, allCartItems };
  }

  async updateCartPrice(
    allCartItems: { price: number; quantity: number }[],
    cartId: string,
  ) {
    const cartPrice = allCartItems.reduce(
      (sum, curr) => sum + curr.price * curr.quantity,
      0,
    );
    await this.prismaService.cart.update({
      where: { id: cartId },
      data: { totalCost: cartPrice },
    });
  }

  async modifyCartItems(userId: string, productId: string, action: string) {
    try {
      const { cart } = await this.getCart(userId);

      if (!cart) {
        throw new Error(ERROR_MESSSAGES.CART_NOT_FOUND);
      }

      const product = await this.getSingleProduct(productId);

      if (!product) {
        throw new Error(ERROR_MESSSAGES.PRODUCT_NOT_FOUND);
      }

      const existingCartItem = await this.prismaService.productCartItem.findFirst({
        where: { cartId: cart.id, productId },
      });

      if (action === MODIFY_CART_ACTIONS.ADD) {
        if (existingCartItem) {
          await this.prismaService.productCartItem.update({
            where: { id: existingCartItem.id },
            data: {
              quantity: { increment: 1 },
            },
          });
        } else {
          await this.prismaService.productCartItem.create({
            data: {
              cartId: cart.id,
              productId,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          });
        }
      } else {
        if (!existingCartItem) throw new Error(ERROR_MESSSAGES.CART_ITEM_NOT_FOUND);
        if (existingCartItem && existingCartItem.quantity >= 2) {
          await this.prismaService.productCartItem.update({
            where: { id: existingCartItem.id },
            data: {
              quantity: { decrement: 1 },
            },
          });
        } else {
          await this.prismaService.productCartItem.delete({
            where: { id: existingCartItem.id },
          });
        }
      }

      const allCartItems = await this.getAllCartItems(cart.id);
      await this.updateCartPrice(allCartItems, cart.id);

      return this.getCart(userId);
    } catch (error) {
      return error.message;
    }
  }

  async getAllCartItems(cartId: string) {
    return await this.prismaService.productCartItem.findMany({
      where: { cartId },
    });
  }
}
