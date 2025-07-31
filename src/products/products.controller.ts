import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '../common/response/api-response';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DeleteManyDto } from './dto/delete-product.dto';

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
  @ApiOperation({ summary: 'Mendapatkan semua produk dengan pagination' })
  @SwaggerResponse({ status: 200, description: 'Daftar produk berhasil diambil' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Halaman yang ingin ditampilkan', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Jumlah item per halaman', example: 10 })
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.productsService.findAll(pagination);
    return ApiResponse.success(result, 'Products retrieved successfully');
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

  @Delete('batch')
  @ApiOperation({ summary: 'Delete multiple products by IDs' })
  @SwaggerResponse({ status: 200, description: 'Products successfully deleted' })
  @SwaggerResponse({ status: 400, description: 'Invalid input data' })
  @SwaggerResponse({ status: 404, description: 'One or more products not found' })
  @ApiBody({ type: DeleteManyDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async removeMany(@Body() dto: DeleteManyDto) {
    try {
      await this.productsService.removeMany(dto.ids);
      return ApiResponse.success(null, 'Products deleted successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('One or more products not found');
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