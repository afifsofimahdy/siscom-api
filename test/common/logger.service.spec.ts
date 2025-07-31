import { Test, TestingModule } from '@nestjs/testing';
import { AppLoggerService } from '../../src/common/logger/logger.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('AppLoggerService', () => {
  let service: AppLoggerService;
  let mockWinstonLogger: any;

  beforeEach(async () => {
    // Create mock Winston logger
    mockWinstonLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppLoggerService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockWinstonLogger,
        },
      ],
    }).compile();

    service = module.get<AppLoggerService>(AppLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should call winston info with correct parameters', () => {
      const message = 'Test log message';
      const context = 'TestContext';

      service.log(message, context);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, { context });
    });

    it('should call winston info without context if not provided', () => {
      const message = 'Test log message';

      service.log(message);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, { context: undefined });
    });
  });

  describe('error', () => {
    it('should call winston error with correct parameters', () => {
      const message = 'Test error message';
      const trace = 'Error trace';
      const context = 'TestContext';

      service.error(message, trace, context);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, { trace, context });
    });

    it('should call winston error without trace and context if not provided', () => {
      const message = 'Test error message';

      service.error(message);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, { 
        trace: undefined, 
        context: undefined 
      });
    });
  });

  describe('warn', () => {
    it('should call winston warn with correct parameters', () => {
      const message = 'Test warn message';
      const context = 'TestContext';

      service.warn(message, context);

      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message, { context });
    });
  });

  describe('debug', () => {
    it('should call winston debug with correct parameters', () => {
      const message = 'Test debug message';
      const context = 'TestContext';

      service.debug(message, context);

      expect(mockWinstonLogger.debug).toHaveBeenCalledWith(message, { context });
    });
  });

  describe('verbose', () => {
    it('should call winston verbose with correct parameters', () => {
      const message = 'Test verbose message';
      const context = 'TestContext';

      service.verbose(message, context);

      expect(mockWinstonLogger.verbose).toHaveBeenCalledWith(message, { context });
    });
  });
});