import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Gunakan ValidationPipe untuk validasi DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Gunakan TransformInterceptor untuk standarisasi response
  app.useGlobalInterceptors(new TransformInterceptor());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
