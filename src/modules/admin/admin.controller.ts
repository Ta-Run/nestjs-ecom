// src/modules/admin/admin.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Category } from '../product/category.entity';
import { Subcategory } from '../product/subcategory.entity';
import { Product } from '../product/product.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('categories')
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully.' })
    async createCategory(@Body() body: { name: string; description: string }): Promise<Category> {
        return this.adminService.createCategory(body.name, body.description);
    }

    @Post('subcategories')
    @ApiOperation({ summary: 'Create a new subcategory' })
    @ApiResponse({ status: 201, description: 'Subcategory created successfully.' })
    async createSubcategory(@Body() body: { categoryId: number; name: string; description: string }): Promise<Subcategory> {
        return this.adminService.createSubcategory(body.categoryId, body.name, body.description);
    }

    @Post('products')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    async createProduct(@Body() body: { subcategoryId: number; name: string; description: string; price: number; stock: number }): Promise<Product> {
        return this.adminService.createProduct(body.subcategoryId, body.name, body.description, body.price, body.stock);
    }

    @Put('categories/:id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: 200, description: 'Category updated successfully.' })
    async updateCategory(@Param('id') id: number, @Body() updateData: Partial<Category>): Promise<Category> {
        return this.adminService.updateCategory(id, updateData);
    }

    @Put('subcategories/:id')
    @ApiOperation({ summary: 'Update a subcategory' })
    @ApiResponse({ status: 200, description: 'Subcategory updated successfully.' })
    async updateSubcategory(@Param('id') id: number, @Body() updateData: Partial<Subcategory>): Promise<Subcategory> {
        return this.adminService.updateSubcategory(id, updateData);
    }

    @Put('products/:id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.' })
    async updateProduct(@Param('id') id: number, @Body() updateData: Partial<Product>): Promise<Product> {
        return this.adminService.updateProduct(id, updateData);
    }

    @Delete('categories/:id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
    async deleteCategory(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteCategory(id);
    }

    @Delete('subcategories/:id')
    @ApiOperation({ summary: 'Delete a subcategory' })
    @ApiResponse({ status: 200, description: 'Subcategory deleted successfully.' })
    async deleteSubcategory(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteSubcategory(id);
    }

    @Delete('products/:id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteProduct(id);
    }
}
