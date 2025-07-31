import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaService: PrismaService;
  let prismaReadService: PrismaReadService;

  const mockPrismaService = {
    category: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPrismaReadService = {
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PrismaReadService, useValue: mockPrismaReadService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
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
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Test Category',
        description: 'Test Description',
      };

      const expectedResult = {
        id: 1,
        ...createCategoryDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.create.mockResolvedValue(expectedResult);

      const result = await service.create(createCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated categories', async () => {
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      const categories = [
        {
          id: 1,
          name: 'Test Category 1',
          description: 'Test Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test Category 2',
          description: 'Test Description 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedResult = {
        data: categories,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockPrismaReadService.category.count.mockResolvedValue(2);
      mockPrismaReadService.category.findMany.mockResolvedValue(categories);

      const result = await service.findAll(pagination);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.category.count).toHaveBeenCalled();
      expect(mockPrismaReadService.category.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { id: 'desc' },
      });
    });

    it('should use default pagination values if not provided', async () => {
      const categories = [
        {
          id: 1,
          name: 'Test Category 1',
          description: 'Test Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedResult = {
        data: categories,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockPrismaReadService.category.count.mockResolvedValue(1);
      mockPrismaReadService.category.findMany.mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.category.count).toHaveBeenCalled();
      expect(mockPrismaReadService.category.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { id: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const categoryId = 1;
      const expectedResult = {
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaReadService.category.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(categoryId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.category.findUnique).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });

    it('should return null if category not found', async () => {
      const categoryId = 999;

      mockPrismaReadService.category.findUnique.mockResolvedValue(null);

      const result = await service.findOne(categoryId);

      expect(result).toBeNull();
      expect(mockPrismaReadService.category.findUnique).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
        description: 'Updated Description',
      };

      const expectedResult = {
        id: categoryId,
        name: 'Updated Category',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.update.mockResolvedValue(expectedResult);

      const result = await service.update(categoryId, updateCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.category.update).toHaveBeenCalledWith({
        where: { id: categoryId },
        data: updateCategoryDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const categoryId = 1;
      const expectedResult = {
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(categoryId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.category.delete).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });
  });

  describe('findProductsByCategory', () => {
    it('should return paginated products by category id', async () => {
      const categoryId = 1;
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
          categoryId: categoryId,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: categoryId, name: 'Test Category', description: 'Test Category Description' },
        },
        {
          id: 2,
          name: 'Test Product 2',
          price: 200,
          description: 'Test Description 2',
          stock: 20,
          image_url: 'http://example.com/image2.jpg',
          categoryId: categoryId,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: categoryId, name: 'Test Category', description: 'Test Category Description' },
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

      const result = await service.findProductsByCategory(categoryId, pagination);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.product.count).toHaveBeenCalledWith({
        where: { categoryId },
      });
      expect(mockPrismaReadService.product.findMany).toHaveBeenCalledWith({
        where: { categoryId },
        skip: 0,
        take: 10,
        include: { category: true },
        orderBy: { id: 'desc' },
      });
    });

    it('should use default pagination values if not provided', async () => {
      const categoryId = 1;
      const products = [
        {
          id: 1,
          name: 'Test Product 1',
          price: 100,
          description: 'Test Description 1',
          stock: 10,
          image_url: 'http://example.com/image1.jpg',
          categoryId: categoryId,
          group_item: 'Test Group',
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: categoryId, name: 'Test Category', description: 'Test Category Description' },
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

      const result = await service.findProductsByCategory(categoryId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaReadService.product.count).toHaveBeenCalledWith({
        where: { categoryId },
      });
      expect(mockPrismaReadService.product.findMany).toHaveBeenCalledWith({
        where: { categoryId },
        skip: 0,
        take: 10,
        include: { category: true },
        orderBy: { id: 'desc' },
      });
    });
  });
});