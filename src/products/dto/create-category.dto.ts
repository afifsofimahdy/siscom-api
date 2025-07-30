import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nama kategori',
    example: 'Laptop'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Deskripsi kategori',
    example: 'Kategori untuk produk laptop',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}