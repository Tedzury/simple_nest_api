import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataAccessService } from 'src/data-access/data-access.service';
import { MODIFY_CART_ACTIONS } from 'src/shared/constants';

@Injectable()
export class CartService {
  constructor(private readonly dataAccessService: DataAccessService) {}
  async getCart(userId: string) {
    return await this.dataAccessService.getCart(userId);
  }

  async addItemToCart(userId: string, productId: string) {
    const result = await this.dataAccessService.modifyCartItems(
      userId,
      productId,
      MODIFY_CART_ACTIONS.ADD,
    );
    if (typeof result === 'string') {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async removeItemFromCart(userId: string, productId: string) {
    const result = await this.dataAccessService.modifyCartItems(
      userId,
      productId,
      MODIFY_CART_ACTIONS.SUBSTRACT,
    );
    if (typeof result === 'string') {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
