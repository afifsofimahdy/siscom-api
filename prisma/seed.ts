import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hapus data yang ada (opsional)
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  
  console.log('Seeding database...');
  
  // Buat kategori
  const categories = [
    {
      name: 'Laptop',
      description: 'Perangkat komputer portabel'
    },
    {
      name: 'Smartphone',
      description: 'Perangkat komunikasi mobile'
    },
    {
      name: 'Aksesoris',
      description: 'Perangkat pendukung komputer dan smartphone'
    },
    {
      name: 'Komponen',
      description: 'Komponen perangkat keras komputer'
    }
  ];
  
  // Masukkan kategori ke database
  const categoryMap = {};
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: category
    });
    categoryMap[createdCategory.name] = createdCategory.id;
  }
  
  // Buat array data product
  const productData = [
    {
      name: 'Laptop Asus ROG',
      description: 'Laptop gaming dengan performa tinggi',
      price: 15000000,
      stock: 10,
      image_url: 'https://example.com/images/asus-rog.jpg',
      categoryId: categoryMap['Laptop']
    },
    {
      name: 'Smartphone Samsung Galaxy S21',
      description: 'Smartphone flagship dengan kamera terbaik',
      price: 12000000,
      stock: 15,
      image_url: 'https://example.com/images/samsung-s21.jpg',
      categoryId: categoryMap['Smartphone']
    },
    {
      name: 'Monitor LG 27 inch',
      description: 'Monitor dengan resolusi 4K dan refresh rate 144Hz',
      price: 3500000,
      stock: 8,
      image_url: 'https://example.com/images/lg-monitor.jpg',
      categoryId: categoryMap['Aksesoris']
    },
    {
      name: 'Keyboard Mechanical Logitech',
      description: 'Keyboard gaming dengan switch blue',
      price: 1200000,
      stock: 20,
      image_url: 'https://example.com/images/logitech-keyboard.jpg',
      categoryId: categoryMap['Aksesoris']
    },
    {
      name: 'Mouse Gaming Razer',
      description: 'Mouse gaming dengan DPI tinggi',
      price: 800000,
      stock: 25,
      image_url: 'https://example.com/images/razer-mouse.jpg',
      categoryId: categoryMap['Aksesoris']
    },
    {
      name: 'Headset SteelSeries',
      description: 'Headset gaming dengan noise cancellation',
      price: 1500000,
      stock: 12,
      image_url: 'https://example.com/images/steelseries-headset.jpg',
      categoryId: categoryMap['Aksesoris']
    },
    {
      name: 'Webcam Logitech C920',
      description: 'Webcam HD untuk streaming dan meeting',
      price: 950000,
      stock: 7,
      image_url: 'https://example.com/images/logitech-c920.jpg',
      categoryId: categoryMap['Aksesoris']
    },
    {
      name: 'SSD Samsung 1TB',
      description: 'SSD dengan kecepatan baca/tulis tinggi',
      price: 1800000,
      stock: 30,
      image_url: 'https://example.com/images/samsung-ssd.jpg',
      categoryId: categoryMap['Komponen']
    },
    {
      name: 'RAM Corsair 16GB',
      description: 'RAM DDR4 dengan frekuensi 3200MHz',
      price: 1200000,
      stock: 18,
      image_url: 'https://example.com/images/corsair-ram.jpg',
      categoryId: categoryMap['Komponen']
    },
    {
      name: 'Power Supply Corsair 750W',
      description: 'Power supply modular dengan sertifikasi Gold',
      price: 1500000,
      stock: 5,
      image_url: 'https://example.com/images/corsair-psu.jpg',
      categoryId: categoryMap['Komponen']
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