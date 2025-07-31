import { Test, TestingModule } from '@nestjs/testing';
import { PrismaReadService } from './prisma-read.service';

describe('PrismaReadService', () => {
  let service: PrismaReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaReadService],
    }).compile();

    service = module.get<PrismaReadService>(PrismaReadService);
    // Mock the $connect method to prevent actual database connections during tests
    jest.spyOn(service, '$connect').mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database on module initialization', async () => {
      const connectSpy = jest.spyOn(service, '$connect');
      
      await service.onModuleInit();
      
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });
  });


});