import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Gunakan Winston Logger
  const logger = app.get<AppLoggerService>(AppLoggerService);
  app.useLogger(logger);
  
  // Gunakan ValidationPipe untuk validasi DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Gunakan TransformInterceptor untuk standarisasi response
  // dan LoggingInterceptor untuk logging HTTP requests
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(logger)
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
