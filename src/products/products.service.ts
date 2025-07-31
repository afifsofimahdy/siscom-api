import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResult, PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private prismaRead: PrismaReadService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(pagination?: PaginationDto): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;
    
    const [total, data] = await Promise.all([
      this.prismaRead.product.count(),
      this.prismaRead.product.findMany({
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

  async findOne(id: number) {
    return this.prismaRead.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]) {
    return this.prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}