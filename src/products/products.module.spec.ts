import { Test } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

describe('ProductsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should provide ProductsService', async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    const productsService = module.get<ProductsService>(ProductsService);
    expect(productsService).toBeInstanceOf(ProductsService);
  });

  it('should provide CategoriesService', async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    const categoriesService = module.get<CategoriesService>(CategoriesService);
    expect(categoriesService).toBeInstanceOf(CategoriesService);
  });

  it('should register ProductsController', async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    const productsController = module.get<ProductsController>(ProductsController);
    expect(productsController).toBeInstanceOf(ProductsController);
  });

  it('should register CategoriesController', async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    const categoriesController = module.get<CategoriesController>(CategoriesController);
    expect(categoriesController).toBeInstanceOf(CategoriesController);
  });
});