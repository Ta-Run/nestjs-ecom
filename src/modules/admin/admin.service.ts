// src/modules/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { Category } from '../product/category.entity';
import { Subcategory } from '../product/subcategory.entity';
import { Product } from '../product/product.entity';
@Injectable()
export class AdminService {
    async createCategory(name: string, description: string): Promise<Category> {
        return await Category.create({ name, description });
    }

    async createSubcategory(categoryId: number, name: string, description: string): Promise<Subcategory> {
        return await Subcategory.create({ categoryId, name, description });
    }

    async createProduct(subcategoryId: number, name: string, description: string, price: number, stock: number): Promise<Product> {
        return await Product.create({ subcategoryId, name, description, price });
    }

    async updateCategory(id: number, updateData: Partial<Category>): Promise<Category> {
        await Category.update(updateData, { where: { id } });
        return await Category.findByPk(id);
    }

    async updateSubcategory(id: number, updateData: Partial<Subcategory>): Promise<Subcategory> {
        await Subcategory.update(updateData, { where: { id } });
        return await Subcategory.findByPk(id);
    }

    async updateProduct(id: number, updateData: Partial<Product>): Promise<Product> {
        await Product.update(updateData, { where: { id } });
        return await Product.findByPk(id);
    }

    async deleteCategory(id: number): Promise<void> {
        await Category.destroy({ where: { id } });
    }

    async deleteSubcategory(id: number): Promise<void> {
        await Subcategory.destroy({ where: { id } });
    }

    async deleteProduct(id: number): Promise<void> {
        await Product.destroy({ where: { id } });
    }
}
