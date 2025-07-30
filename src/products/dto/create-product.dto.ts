import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nama produk',
    example: 'Laptop Asus ROG'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Deskripsi produk',
    example: 'Laptop gaming dengan spesifikasi tinggi',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Harga produk',
    example: 15000000,
    minimum: 0
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Stok produk',
    example: 10,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
  
  @ApiProperty({
    description: 'URL gambar produk',
    example: 'https://example.com/laptop.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  image_url?: string; 

  @ApiProperty({
    description: 'ID kategori produk',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    description: 'Grup item produk',
    example: 'Elektronik',
    required: false
  })
  @IsOptional()
  @IsString()
  group_item?: string;
}