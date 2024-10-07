import { Inject, Injectable } from '@nestjs/common';

import { Product } from './product.entity';  
import { PRODUCT_REPOSITORY } from 'src/core/database/constant';
@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository:typeof Product
    ) {}

    async createProduct(data: any): Promise<Product> {
        return await this.productRepository.create(data);
    }

    async findAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async findProductById(id: number): Promise<Product> {
        return await this.productRepository.findByPk(id);
    }

    // async updateProduct(id: number, data: any): Promise<Product> {
    //     const product = await this.productRepository.findProductById(id);
    //     return product.update(data);
    // }

    // async deleteProduct(id: number): Promise<void> {
    //     const product = await this.productRepository.findProductById(id);
    //     await product.destroy();
    // }
}
