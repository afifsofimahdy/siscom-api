import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../src/products/categories.controller';
import { CategoriesService } from '../../src/products/categories.service';
import { CreateCategoryDto } from '../../src/products/dto/create-category.dto';
import { UpdateCategoryDto } from '../../src/products/dto/update-category.dto';
import { PaginationDto } from '../../src/common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../../src/common/response/api-response';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findProductsByCategory: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category and return success response', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Test Category',
        description: 'Test Description',
      };

      const createdCategory = {
        id: 1,
        ...createCategoryDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoriesService.create.mockResolvedValue(createdCategory);

      const result = await controller.create(createCategoryDto);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category created successfully');
      expect(result.data).toEqual(createdCategory);
      expect(mockCategoriesService.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated categories with success response', async () => {
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

      const paginatedResult = {
        data: categories,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockCategoriesService.findAll.mockResolvedValue(paginatedResult);

      const result = await controller.findAll(pagination);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Categories retrieved successfully');
      expect(result.data).toEqual(paginatedResult);
      expect(mockCategoriesService.findAll).toHaveBeenCalledWith(pagination);
    });
  });

  describe('findOne', () => {
    it('should return a category with success response', async () => {
      const categoryId = 1;
      const category = {
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoriesService.findOne.mockResolvedValue(category);

      const result = await controller.findOne(categoryId);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category retrieved successfully');
      expect(result.data).toEqual(category);
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith(categoryId);
    });

    it('should throw NotFoundException if category not found', async () => {
      const categoryId = 999;

      mockCategoriesService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(categoryId)).rejects.toThrow(NotFoundException);
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('findProductsByCategory', () => {
    it('should return products by category with success response', async () => {
      const categoryId = 1;
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      const category = {
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
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
          category,
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
          category,
        },
      ];

      const paginatedResult = {
        data: products,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockCategoriesService.findOne.mockResolvedValue(category);
      mockCategoriesService.findProductsByCategory.mockResolvedValue(paginatedResult);

      const result = await controller.findProductsByCategory(categoryId, pagination);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe(`Products in category '${category.name}' retrieved successfully`);
      expect(result.data).toEqual(paginatedResult);
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith(categoryId);
      expect(mockCategoriesService.findProductsByCategory).toHaveBeenCalledWith(categoryId, pagination);
    });

    it('should throw NotFoundException if category not found', async () => {
      const categoryId = 999;
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;

      mockCategoriesService.findOne.mockResolvedValue(null);

      await expect(controller.findProductsByCategory(categoryId, pagination)).rejects.toThrow(NotFoundException);
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith(categoryId);
      expect(mockCategoriesService.findProductsByCategory).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a category and return success response', async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
        description: 'Updated Description',
      };

      const updatedCategory = {
        id: categoryId,
        name: 'Updated Category',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoriesService.update.mockResolvedValue(updatedCategory);

      const result = await controller.update(categoryId, updateCategoryDto);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category updated successfully');
      expect(result.data).toEqual(updatedCategory);
      expect(mockCategoriesService.update).toHaveBeenCalledWith(categoryId, updateCategoryDto);
    });

    it('should throw NotFoundException if category not found during update', async () => {
      const categoryId = 999;
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
        description: 'Updated Description',
      };

      const error = new Error('Record not found');
      error['code'] = 'P2025';
      mockCategoriesService.update.mockRejectedValue(error);

      await expect(controller.update(categoryId, updateCategoryDto)).rejects.toThrow(NotFoundException);
      expect(mockCategoriesService.update).toHaveBeenCalledWith(categoryId, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should delete a category and return success response', async () => {
      const categoryId = 1;

      mockCategoriesService.remove.mockResolvedValue({});

      const result = await controller.remove(categoryId);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category deleted successfully');
      expect(result.data).toBeNull();
      expect(mockCategoriesService.remove).toHaveBeenCalledWith(categoryId);
    });

    it('should throw NotFoundException if category not found during delete', async () => {
      const categoryId = 999;

      const error = new Error('Record not found');
      error['code'] = 'P2025';
      mockCategoriesService.remove.mockRejectedValue(error);

      await expect(controller.remove(categoryId)).rejects.toThrow(NotFoundException);
      expect(mockCategoriesService.remove).toHaveBeenCalledWith(categoryId);
    });
  });
});