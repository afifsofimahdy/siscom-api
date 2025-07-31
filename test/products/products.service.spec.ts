import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PrismaReadService } from '../../src/prisma/prisma-read.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../../src/products/dto/update-product.dto';
import { PaginationDto } from '../../src/common/dto/pagination.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: PrismaService;
  let prismaReadService: PrismaReadService;

  const mockPrismaService = {
    product: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPrismaReadService = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PrismaReadService, useValue: mockPrismaReadService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaReadService = module.get<PrismaReadService>(PrismaReadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image_url: 'http://example.com/image.jpg',
        categoryId: 1,
        group_item: 'Test Group',
      };

      const expectedResult = {
        id: 1,
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.create.mockResolvedValue(expectedResult);

      const result = await service.create(createProductDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      const products = [
        {
          id: 1,
          name: 'Test Product 1',
          price: 100,
          description: 'Test Description 1',
          stock: 10,
          image_url: 'http://example.com/image1.jpg',
          categoryId: 1,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: 'Test Category', description: 'Test Category Description' },
        },
        {
          id: 2,
          name: 'Test Product 2',
          price: 200,
          description: 'Test Description 2',
          stock: 20,
          image_url: 'http://example.com/image2.jpg',
          categoryId: 1,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: 'Test Category', description: 'Test Category Description' },
        },
      ];

      const expectedResult = {
        data: products,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockPrismaReadService.product.count.mockResolvedValue(2);
      mockPrismaReadService.product.findMany.mockResolvedValue(products);

      const result = await service.findAll(pagination);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.product.count).toHaveBeenCalled();
      expect(mockPrismaReadService.product.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        include: { category: true },
        orderBy: { id: 'desc' },
      });
    });

    it('should use default pagination values if not provided', async () => {
      const products = [
        {
          id: 1,
          name: 'Test Product 1',
          price: 100,
          description: 'Test Description 1',
          stock: 10,
          image_url: 'http://example.com/image1.jpg',
          categoryId: 1,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: 'Test Category', description: 'Test Category Description' },
        },
      ];

      const expectedResult = {
        data: products,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockPrismaReadService.product.count.mockResolvedValue(1);
      mockPrismaReadService.product.findMany.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.product.count).toHaveBeenCalled();
      expect(mockPrismaReadService.product.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        include: { category: true },
        orderBy: { id: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const productId = 1;
      const expectedResult = {
        id: productId,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image_url: 'http://example.com/image.jpg',
        categoryId: 1,
        group_item: 'Test Group',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: 1, name: 'Test Category', description: 'Test Category Description' },
      };

      mockPrismaReadService.product.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(productId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.product.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
        include: { category: true },
      });
    });

    it('should return null if product not found', async () => {
      const productId = 999;

      mockPrismaReadService.product.findUnique.mockResolvedValue(null);

      const result = await service.findOne(productId);

      expect(result).toBeNull();
      expect(mockPrismaReadService.product.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
        include: { category: true },
      });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };

      const expectedResult = {
        id: productId,
        name: 'Updated Product',
        price: 200,
        description: 'Test Description',
        stock: 10,
        image_url: 'http://example.com/image.jpg',
        categoryId: 1,
        group_item: 'Test Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.update.mockResolvedValue(expectedResult);

      const result = await service.update(productId, updateProductDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: updateProductDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const productId = 1;
      const expectedResult = {
        id: productId,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image_url: 'http://example.com/image.jpg',
        categoryId: 1,
        group_item: 'Test Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.product.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(productId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: productId },
      });
    });
  });
});