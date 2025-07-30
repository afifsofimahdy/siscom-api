# Storage Directory

Direktori ini digunakan untuk menyimpan file-file yang dihasilkan oleh aplikasi.

## Struktur Direktori

- `/logs`: Berisi file log aplikasi
  - `application.log`: Log utama aplikasi

## Penggunaan

Log aplikasi secara otomatis disimpan di direktori ini. Pastikan direktori ini memiliki izin tulis yang sesuai.

## Konfigurasi

Konfigurasi logging dapat diubah di file `src/common/logger/logger.module.ts`.