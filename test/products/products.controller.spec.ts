import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../src/products/products.controller';
import { ProductsService } from '../../src/products/products.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../../src/products/dto/update-product.dto';
import { PaginationDto } from '../../src/common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../../src/common/response/api-response';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return success response', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image_url: 'http://example.com/image.jpg',
        categoryId: 1,
        group_item: 'Test Group',
      };

      const createdProduct = {
        id: 1,
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductsService.create.mockResolvedValue(createdProduct);

      const result = await controller.create(createProductDto);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Product created successfully');
      expect(result.data).toEqual(createdProduct);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated products with success response', async () => {
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

      const paginatedResult = {
        data: products,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockProductsService.findAll.mockResolvedValue(paginatedResult);

      const result = await controller.findAll(pagination);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Products retrieved successfully');
      expect(result.data).toEqual(paginatedResult);
      expect(mockProductsService.findAll).toHaveBeenCalledWith(pagination);
    });
  });

  describe('findOne', () => {
    it('should return a product with success response', async () => {
      const productId = 1;
      const product = {
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

      mockProductsService.findOne.mockResolvedValue(product);

      const result = await controller.findOne(productId);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Product retrieved successfully');
      expect(result.data).toEqual(product);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException if product not found', async () => {
      const productId = 999;

      mockProductsService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(productId)).rejects.toThrow(NotFoundException);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(productId);
    });
  });

  describe('update', () => {
    it('should update a product and return success response', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };

      const updatedProduct = {
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

      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(productId, updateProductDto);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Product updated successfully');
      expect(result.data).toEqual(updatedProduct);
      expect(mockProductsService.update).toHaveBeenCalledWith(productId, updateProductDto);
    });

    it('should throw NotFoundException if product not found during update', async () => {
      const productId = 999;
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };

      const error = new Error('Record not found');
      error['code'] = 'P2025';
      mockProductsService.update.mockRejectedValue(error);

      await expect(controller.update(productId, updateProductDto)).rejects.toThrow(NotFoundException);
      expect(mockProductsService.update).toHaveBeenCalledWith(productId, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should delete a product and return success response', async () => {
      const productId = 1;

      mockProductsService.remove.mockResolvedValue({});

      const result = await controller.remove(productId);

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Product deleted successfully');
      expect(result.data).toBeNull();
      expect(mockProductsService.remove).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException if product not found during delete', async () => {
      const productId = 999;

      const error = new Error('Record not found');
      error['code'] = 'P2025';
      mockProductsService.remove.mockRejectedValue(error);

      await expect(controller.remove(productId)).rejects.toThrow(NotFoundException);
      expect(mockProductsService.remove).toHaveBeenCalledWith(productId);
    });
  });
});