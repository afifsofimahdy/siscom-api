import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginatedResult, PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private prismaRead: PrismaReadService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(pagination?: PaginationDto): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;
    
    const [total, data] = await Promise.all([
      this.prismaRead.category.count(),
      this.prismaRead.category.findMany({
        skip,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: number) {
    return this.prismaRead.category.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async findProductsByCategory(categoryId: number, pagination?: PaginationDto): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;
    
    const [total, data] = await Promise.all([
      this.prismaRead.product.count({
        where: {
          categoryId,
        },
      }),
      this.prismaRead.product.findMany({
        where: {
          categoryId,
        },
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}