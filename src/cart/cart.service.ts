import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataAccessService } from 'src/data-access/data-access.service';

@Injectable()
export class CartService {
  constructor(private readonly dataAccessService: DataAccessService) {}
  async getCart(userId: string) {
    return await this.dataAccessService.getCart(userId);
  }

  async addItemToCart(userId: string, productId: string) {
    const result = await this.dataAccessService.addItemToCart(userId, productId);
    if (typeof result === 'string') {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
