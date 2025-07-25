import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hapus data yang ada (opsional)
  await prisma.product.deleteMany({});
  
  console.log('Seeding database...');
  
  // Buat array data product
  const productData = [
    {
      name: 'Laptop Asus ROG',
      description: 'Laptop gaming dengan performa tinggi',
      price: 15000000,
      stock: 10
    },
    {
      name: 'Smartphone Samsung Galaxy S21',
      description: 'Smartphone flagship dengan kamera terbaik',
      price: 12000000,
      stock: 15
    },
    {
      name: 'Monitor LG 27 inch',
      description: 'Monitor dengan resolusi 4K dan refresh rate 144Hz',
      price: 3500000,
      stock: 8
    },
    {
      name: 'Keyboard Mechanical Logitech',
      description: 'Keyboard gaming dengan switch blue',
      price: 1200000,
      stock: 20
    },
    {
      name: 'Mouse Gaming Razer',
      description: 'Mouse gaming dengan DPI tinggi',
      price: 800000,
      stock: 25
    },
    {
      name: 'Headset SteelSeries',
      description: 'Headset gaming dengan noise cancellation',
      price: 1500000,
      stock: 12
    },
    {
      name: 'Webcam Logitech C920',
      description: 'Webcam HD untuk streaming dan meeting',
      price: 950000,
      stock: 7
    },
    {
      name: 'SSD Samsung 1TB',
      description: 'SSD dengan kecepatan baca/tulis tinggi',
      price: 1800000,
      stock: 30
    },
    {
      name: 'RAM Corsair 16GB',
      description: 'RAM DDR4 dengan frekuensi 3200MHz',
      price: 1200000,
      stock: 18
    },
    {
      name: 'Power Supply Corsair 750W',
      description: 'Power supply modular dengan sertifikasi Gold',
      price: 1500000,
      stock: 5
    }
  ];
  
  // Masukkan data ke database
  for (const product of productData) {
    await prisma.product.create({
      data: product
    });
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });