import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '../common/response/api-response';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat kategori baru' })
  @SwaggerResponse({ status: 201, description: 'Kategori berhasil dibuat' })
  @SwaggerResponse({ status: 400, description: 'Data tidak valid' })
  @ApiBody({ type: CreateCategoryDto })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return ApiResponse.success(category, 'Category created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua kategori' })
  @SwaggerResponse({ status: 200, description: 'Daftar kategori berhasil diambil' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Halaman yang ingin ditampilkan', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Jumlah item per halaman', example: 10 })
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.categoriesService.findAll(pagination);
    return ApiResponse.success(result, 'Categories retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan kategori berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Kategori berhasil diambil' })
  @SwaggerResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @ApiParam({ name: 'id', description: 'ID kategori', example: 1 })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return ApiResponse.success(category, 'Category retrieved successfully');
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Mendapatkan produk berdasarkan kategori' })
  @SwaggerResponse({ status: 200, description: 'Daftar produk dalam kategori berhasil diambil' })
  @SwaggerResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @ApiParam({ name: 'id', description: 'ID kategori', example: 1 })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Halaman yang ingin ditampilkan', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Jumlah item per halaman', example: 10 })
  async findProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationDto
  ) {
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const result = await this.categoriesService.findProductsByCategory(id, pagination);
    return ApiResponse.success(result, `Products in category '${category.name}' retrieved successfully`);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui kategori berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Kategori berhasil diperbarui' })
  @SwaggerResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @SwaggerResponse({ status: 400, description: 'Data tidak valid' })
  @ApiParam({ name: 'id', description: 'ID kategori', example: 1 })
  @ApiBody({ type: UpdateCategoryDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoriesService.update(id, updateCategoryDto);
      return ApiResponse.success(category, 'Category updated successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus kategori berdasarkan ID' })
  @SwaggerResponse({ status: 200, description: 'Kategori berhasil dihapus' })
  @SwaggerResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @ApiParam({ name: 'id', description: 'ID kategori', example: 1 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.categoriesService.remove(id);
      return ApiResponse.success(null, 'Category deleted successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      throw error;
    }
  }
}