import { Injectable } from '@nestjs/common';
import { Product } from '../product/product.entity';

@Injectable()
export class SellerService {
    async createProduct(subcategoryId: number, name: string, description: string, price: number, stock: number): Promise<Product> {
        return await Product.create({ subcategoryId, name, description, price });
    }

    async updateProduct(id: number, updateData: Partial<Product>): Promise<Product> {
        await Product.update(updateData, { where: { id } });
        return await Product.findByPk(id);
    }

    async deleteProduct(id: number): Promise<void> {
        await Product.destroy({ where: { id } });
    }

    async getProducts(): Promise<Product[]> {
        return await Product.findAll();
    }
}
