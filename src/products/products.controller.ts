import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '../common/response/api-response';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return ApiResponse.success(product, 'Product created successfully');
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return ApiResponse.success(products, 'Products retrieved successfully');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return ApiResponse.success(product, 'Product retrieved successfully');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productsService.update(id, updateProductDto);
      return ApiResponse.success(product, 'Product updated successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productsService.remove(id);
      return ApiResponse.success(null, 'Product deleted successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }
      throw error;
    }
  }
}