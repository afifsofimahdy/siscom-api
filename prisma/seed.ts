import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hapus data yang ada (opsional)
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  
  console.log('Seeding database...');
  
  // Buat kategori
  const category = {
    name: 'Elektronik',
    description: 'Perangkat elektronik dan komponen'
  };
  
  // Masukkan kategori ke database
  const createdCategory = await prisma.category.create({
    data: category
  });
  const categoryId = createdCategory.id;
  
  // Buat array data product (15 data)
  const productData = [
    {
      name: 'Laptop Asus ROG',
      description: 'Laptop gaming dengan performa tinggi',
      price: 15000000,
      stock: 10,
      image_url: 'https://example.com/images/asus-rog.jpg',
      group_item: 'Laptop',
      categoryId: categoryId
    },
    {
      name: 'Smartphone Samsung Galaxy S21',
      description: 'Smartphone flagship dengan kamera terbaik',
      price: 12000000,
      stock: 15,
      image_url: 'https://example.com/images/samsung-s21.jpg',
      group_item: 'Smartphone',
      categoryId: categoryId
    },
    {
      name: 'Monitor LG 27 inch',
      description: 'Monitor dengan resolusi 4K dan refresh rate 144Hz',
      price: 3500000,
      stock: 8,
      image_url: 'https://example.com/images/lg-monitor.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Keyboard Mechanical Logitech',
      description: 'Keyboard gaming dengan switch blue',
      price: 1200000,
      stock: 20,
      image_url: 'https://example.com/images/logitech-keyboard.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Mouse Gaming Razer',
      description: 'Mouse gaming dengan DPI tinggi',
      price: 800000,
      stock: 25,
      image_url: 'https://example.com/images/razer-mouse.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Headset SteelSeries',
      description: 'Headset gaming dengan noise cancellation',
      price: 1500000,
      stock: 12,
      image_url: 'https://example.com/images/steelseries-headset.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Webcam Logitech C920',
      description: 'Webcam HD untuk streaming dan meeting',
      price: 950000,
      stock: 7,
      image_url: 'https://example.com/images/logitech-c920.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'SSD Samsung 1TB',
      description: 'SSD dengan kecepatan baca/tulis tinggi',
      price: 1800000,
      stock: 30,
      image_url: 'https://example.com/images/samsung-ssd.jpg',
      group_item: 'Komponen',
      categoryId: categoryId
    },
    {
      name: 'RAM Corsair 16GB',
      description: 'RAM DDR4 dengan frekuensi 3200MHz',
      price: 1200000,
      stock: 18,
      image_url: 'https://example.com/images/corsair-ram.jpg',
      group_item: 'Komponen',
      categoryId: categoryId
    },
    {
      name: 'Power Supply Corsair 750W',
      description: 'Power supply modular dengan sertifikasi Gold',
      price: 1500000,
      stock: 5,
      image_url: 'https://example.com/images/corsair-psu.jpg',
      group_item: 'Komponen',
      categoryId: categoryId
    },
    {
      name: 'Tablet Apple iPad Air',
      description: 'Tablet ringan dengan performa tinggi',
      price: 9000000,
      stock: 9,
      image_url: 'https://example.com/images/ipad-air.jpg',
      group_item: 'Tablet',
      categoryId: categoryId
    },
    {
      name: 'Printer Canon Pixma',
      description: 'Printer warna multifungsi',
      price: 2000000,
      stock: 6,
      image_url: 'https://example.com/images/canon-printer.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Speaker Bluetooth JBL',
      description: 'Speaker portable dengan suara jernih',
      price: 750000,
      stock: 14,
      image_url: 'https://example.com/images/jbl-speaker.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Smartwatch Xiaomi Mi Band 6',
      description: 'Smartwatch dengan fitur kesehatan lengkap',
      price: 500000,
      stock: 22,
      image_url: 'https://example.com/images/mi-band6.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
    },
    {
      name: 'Router TP-Link Archer',
      description: 'Router WiFi dual band dengan kecepatan tinggi',
      price: 600000,
      stock: 11,
      image_url: 'https://example.com/images/tplink-router.jpg',
      group_item: 'Aksesoris',
      categoryId: categoryId
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