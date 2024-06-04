import { Injectable } from '@nestjs/common';
import { DataAccessService } from 'src/data-access/data-access.service';

@Injectable()
export class ProductsService {
  constructor(private readonly dataAccessService: DataAccessService) {}
  async getAllProducts() {
    const productList = await this.dataAccessService.getAllProducts();
    return productList.map(({ id, name, price }) => ({ id, name, price }));
  }
  async getSingleProduct(id: string) {
    return await this.dataAccessService.getSingleProduct(id);
  }
}
