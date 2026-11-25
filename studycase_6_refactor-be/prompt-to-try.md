# Prompt to Try — Studycase 6

Jalankan `npm test` dulu, pastikan 8 test hijau.

## Langkah 1 — Prompt terarah dari slide 25

```
Ekstrak logika kalkulasi stok dan diskon dari order.controller.js ke src/services/order.service.js. Pertahankan JSON response contract utama dan error HTTP 422 tanpa mengubah perilaku endpoint. Jangan ubah test/orders.contract.test.js. Jalankan npm test.
```

## Langkah 2 — Centralized error handling

```
Buat src/errors/app-error.js (class AppError dengan status, code, message) dan error-handling middleware di app.js. Ubah service supaya melempar AppError, dan controller cukup meneruskan error ke next(). Format error response harus tetap sama. Jalankan npm test.
```

## Langkah 3 — Repository pattern

```
Buat src/repositories/ untuk akses customers, products, dan orders. Hanya repository yang boleh require db.js. Jalankan npm test.
```

## Langkah 4 — Bersihkan magic number

```
Pindahkan angka aturan bisnis (persentase diskon, batas promo, minimal belanja) ke satu konstanta yang mudah dibaca. Jangan ubah perilaku. Jalankan npm test.
```

## Langkah 5 — Cari bug (bukan perbaiki)

```
Review order.service.js. Ada bug terkait stok? Jelaskan skenario reproduksinya dan tulis test yang gagal untuk bug itu di file test baru. Jangan perbaiki dulu.
```

Lalu, setelah test merah terbukti:
```
Sekarang perbaiki bug itu dengan perubahan sekecil mungkin.
```

## Checklist Review tiap langkah

- [ ] `npm test` hijau
- [ ] `git diff --stat` → perubahan < 200 baris
- [ ] `test/orders.contract.test.js` tidak berubah (`git diff test/`)
- [ ] Controller tidak lagi berisi logika diskon/stok
- [ ] Service tidak menyentuh `req`/`res`

## Pembanding: tanpa guardrail

Session baru, tanpa test:
```
Refactor order.controller.js biar clean.
```
Lalu jalankan `npm test`. Apakah contract-nya masih utuh?
