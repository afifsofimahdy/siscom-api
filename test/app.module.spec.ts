import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should provide AppController', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const controller = module.get<AppController>(AppController);
    expect(controller).toBeInstanceOf(AppController);
  });

  it('should provide AppService', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const service = module.get<AppService>(AppService);
    expect(service).toBeInstanceOf(AppService);
  });
});