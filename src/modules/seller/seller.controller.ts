import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Product } from '../product/product.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('seller')
@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {}

    @Post('products')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    async createProduct(@Body() body: { subcategoryId: number; name: string; description: string; price: number; stock: number }): Promise<Product> {
        return this.sellerService.createProduct(body.subcategoryId, body.name, body.description, body.price, body.stock);
    }

    @Put('products/:id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.' })
    async updateProduct(@Param('id') id: number, @Body() updateData: Partial<Product>): Promise<Product> {
        return this.sellerService.updateProduct(id, updateData);
    }

    @Delete('products/:id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return this.sellerService.deleteProduct(id);
    }

    @Get('products')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of products retrieved successfully.' })
    async getProducts(): Promise<Product[]> {
        return this.sellerService.getProducts();
    }
}
