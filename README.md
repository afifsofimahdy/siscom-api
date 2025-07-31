# SISCOM API

API menggunakan NestJS, Prisma, dan MySQL.

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

- Node.js (versi 18 atau lebih baru)
- npm (versi 8 atau lebih baru)
- MySQL (versi 8 atau lebih baru)

## Step by Step untuk Menjalankan Proyek di Lokal

### 1. Clone Repository

```bash
git clone https://github.com/pips/siscom-api.git
cd siscom-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Database

Buat file `.env` di root proyek dan isi dengan konfigurasi database Anda:

```env
DATABASE_URL="mysql://username:password@localhost:3306/siscom"
```

Ganti `username`, `password`, dan nama database sesuai dengan konfigurasi MySQL Anda.

### 4. Jalankan Migrasi Database dan Seeder

```bash
# Jalankan migrasi untuk membuat skema database
npx prisma migrate dev

# Isi database dengan data awal
npx prisma db seed
```

### 5. Jalankan Aplikasi dalam Mode Development

```bash
npm run start:dev
```

Aplikasi akan berjalan di `http://localhost:3000` dan Swagger UI dapat diakses di `http://localhost:3000/api/docs`.

### 6. Build dan Jalankan Aplikasi dalam Mode Production

```bash
# Build aplikasi
npm run build

# Jalankan aplikasi dalam mode production
npm run start:prod
```

## Menjalankan Pengujian

```bash
# Menjalankan semua pengujian
npm test

# Menjalankan pengujian dengan mode watch
npm run test:watch

# Menjalankan pengujian dengan coverage
npm run test:cov

# Menjalankan pengujian end-to-end
npm run test:e2e
```

## Struktur Proyek

```
src/
├── app.module.ts          # Module utama aplikasi
├── main.ts               # Entry point aplikasi
├── common/               # Komponen umum yang digunakan di seluruh aplikasi
│   ├── dto/              # Data Transfer Objects umum (termasuk pagination)
│   ├── interceptors/     # Interceptors untuk menangani request/response
│   ├── logger/           # Konfigurasi logger
│   └── response/         # Format response standar
├── prisma/               # Konfigurasi dan service Prisma ORM
└── products/             # Module produk dan kategori
    ├── categories.controller.ts  # Controller untuk endpoint kategori
    ├── categories.service.ts     # Service untuk logika bisnis kategori
    ├── products.controller.ts    # Controller untuk endpoint produk
    ├── products.service.ts       # Service untuk logika bisnis produk
    ├── dto/                      # Data Transfer Objects untuk produk/kategori
    └── entities/                 # Entity definitions
```

## Fitur Utama

- CRUD Produk dengan pagination
- CRUD Kategori dengan pagination
- Swagger UI untuk dokumentasi API
- Validasi data menggunakan class-validator
- Logging menggunakan Winston
- Database MySQL dengan Prisma ORM

## Struktur API

### Products
- `GET /products` - Mendapatkan semua produk dengan pagination
- `GET /products/:id` - Mendapatkan produk berdasarkan ID
- `POST /products` - Membuat produk baru
- `PATCH /products/:id` - Memperbarui produk
- `DELETE /products/:id` - Menghapus produk

### Categories
- `GET /categories` - Mendapatkan semua kategori dengan pagination
- `GET /categories/:id` - Mendapatkan kategori berdasarkan ID
- `GET /categories/:id/products` - Mendapatkan produk berdasarkan kategori
- `POST /categories` - Membuat kategori baru
- `PATCH /categories/:id` - Memperbarui kategori
- `DELETE /categories/:id` - Menghapus kategori

## Troubleshooting

### Error: Cannot find module 'dist/main'

Jika Anda mendapatkan error ini saat menjalankan `npm run start:prod`, pastikan Anda telah menjalankan `npm run build` terlebih dahulu untuk mengkompilasi kode TypeScript ke JavaScript.

### Error: EADDRINUSE: address already in use :::3000

Jika port 3000 sudah digunakan, Anda dapat mengubah port dengan menjalankan:

```bash
PORT=3001 npm run start:dev
# atau
PORT=3001 npm run start:prod
```

### Error: Prisma Database Connection

Jika Anda mengalami masalah koneksi database, pastikan:
1. PostgreSQL berjalan di mesin Anda
2. Kredensial database di file `.env` benar
3. Database yang ditentukan dalam URL sudah dibuat

Anda dapat membuat database baru dengan perintah PostgreSQL:
```bash
psql -U postgres -c "CREATE DATABASE siscom;"
```
  