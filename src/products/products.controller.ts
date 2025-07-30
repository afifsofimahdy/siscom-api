import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '../common/response/api-response';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat produk baru' })
  @SwaggerResponse({ status: 201, description: 'Produk berhasil dibuat' })
  @SwaggerResponse({ status: 400, description: 'Data tidak valid' })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return ApiResponse.success(product, 'Product created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua produk' })
  @SwaggerResponse({ status: 200, description: 'Daftar produk berhasil diambil' })
  async findAll() {
    const products = await this.productsService.findAll();
    return ApiResponse.success(products, 'Products retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan produk berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Produk berhasil diambil' })
  @SwaggerResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiParam({ name: 'id', description: 'ID produk', example: 1 })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return ApiResponse.success(product, 'Product retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui produk berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Produk berhasil diperbarui' })
  @SwaggerResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @SwaggerResponse({ status: 400, description: 'Data tidak valid' })
  @ApiParam({ name: 'id', description: 'ID produk', example: 1 })
  @ApiBody({ type: UpdateProductDto })
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
  @ApiOperation({ summary: 'Menghapus produk berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Produk berhasil dihapus' })
  @SwaggerResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiParam({ name: 'id', description: 'ID produk', example: 1 })
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