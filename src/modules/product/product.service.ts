import { Injectable } from '@nestjs/common';

import { Product } from './product.entity';  

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private productModel: typeof Product,
    ) {}

    async createProduct(data: any): Promise<Product> {
        return await this.productModel.create(data);
    }

    async findAllProducts(): Promise<Product[]> {
        return await this.productModel.findAll();
    }

    async findProductById(id: number): Promise<Product> {
        return await this.productModel.findByPk(id);
    }

    async updateProduct(id: number, data: any): Promise<Product> {
        const product = await this.findProductById(id);
        return product.update(data);
    }

    async deleteProduct(id: number): Promise<void> {
        const product = await this.findProductById(id);
        await product.destroy();
    }
}
function InjectModel(Product: any): (target: typeof ProductService, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error('Function not implemented.');
}

