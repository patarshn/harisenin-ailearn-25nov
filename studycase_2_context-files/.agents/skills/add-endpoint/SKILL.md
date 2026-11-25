---
name: add-endpoint
description: SOP menambah endpoint REST baru di Notes API (router, validator, controller, test). Gunakan saat user minta endpoint/route/API baru atau mengubah endpoint.
---

# Skill: add-endpoint

## Langkah

1. **Rencana dulu.** Tulis ke user sebelum coding:
   - Method + path (contoh: `DELETE /notes/:id`)
   - Request body / params
   - Response sukses + semua kemungkinan error (status + code)
   - File yang akan diubah
2. **Validator** — tambah di `src/validators/<resource>.validator.js`. Reuse `validateIdParam` kalau ada `:id`.
3. **Controller** — tambah function di `src/controllers/<resource>.controller.js` dengan JSDoc `@type {import('express').RequestHandler}`.
4. **Router** — daftarkan di `src/routes/<resource>.router.js` dengan urutan `validator → controller`.
5. **Test** — tambah di `test/<resource>.test.js`: happy path + tiap error case.
6. **Verifikasi** — jalankan `npm test`. Kalau gagal, baca error, perbaiki, ulangi.

## Checklist Sebelum Bilang Selesai

- [ ] Response mengikuti format `{ data }` / `{ error: { code, message } }`
- [ ] Status code sesuai tabel di `Instruction.md`
- [ ] Tidak ada dependency baru
- [ ] Endpoint lama tidak berubah
- [ ] `npm test` hijau (tampilkan output-nya)
- [ ] Ringkasan: endpoint baru + contoh `curl`
