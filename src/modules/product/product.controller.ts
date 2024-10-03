import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@ApiTags('product')  // This tag groups all product endpoints in Swagger
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // Create Product
    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({ summary: 'Create a new product' })
    @ApiConsumes('multipart/form-data')  // Specify that this route consumes multipart data
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                description: { type: 'string' },
                image: { 
                    type: 'string', 
                    format: 'binary',  // Binary data for file uploads
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    async createProduct(
        @Body() body: any,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        const imagePath = file ? file.path : null;
        const productData = {
            ...body,
            imagePath,
        };
        return this.productService.createProduct(productData);
    }

    // Get All Products
    @Get('all')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
    async getAllProducts(): Promise<Product[]> {
        return this.productService.findAllProducts();
    }

    // Get Product by ID
    @Get(':id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: Product })
    async getProductById(@Param('id') id: number): Promise<Product> {
        return this.productService.findProductById(id);
    }

    // Update Product
    @Put('update/:id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({ summary: 'Update product by ID' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                description: { type: 'string' },
                image: { 
                    type: 'string', 
                    format: 'binary',  // Binary data for file uploads
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
    async updateProduct(
        @Param('id') id: number,
        @Body() body: any,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        const imagePath = file ? file.path : body.imagePath;
        const productData = {
            ...body,
            imagePath,
        };
        return this.productService.updateProduct(id, productData);
    }

    // Delete Product
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}
