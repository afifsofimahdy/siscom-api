import { Test } from '@nestjs/testing';
import { LoggerModule } from '../../src/common/logger/logger.module';
import { AppLoggerService } from '../../src/common/logger/logger.service';

describe('LoggerModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should provide AppLoggerService', async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    const loggerService = module.get<AppLoggerService>(AppLoggerService);
    expect(loggerService).toBeInstanceOf(AppLoggerService);
  });
});