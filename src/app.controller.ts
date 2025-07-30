import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Mendapatkan pesan selamat datang' })
  @ApiResponse({ status: 200, description: 'Pesan selamat datang berhasil diambil' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
