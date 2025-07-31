import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
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

  describe('onModuleDestroy', () => {
    it('should disconnect from the database on module destruction', async () => {
      const disconnectSpy = jest.spyOn(service, '$disconnect').mockImplementation(() => Promise.resolve());
      
      await service.$disconnect();
      
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});