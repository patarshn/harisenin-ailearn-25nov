# AGENTS.md — Todo API

## Project
REST API todo sederhana. Express 4, data in-memory (array di `server.js`), tanpa database.

## Commands
- Install: `npm install`
- Run: `npm start` (port 3000)
- Test: `npm test` (Node built-in test runner, file di `test/*.test.js`)

## Aturan Wajib
1. Setiap endpoint baru atau perubahan endpoint WAJIB punya test di `test/`. Tulis test happy path + minimal 1 test error.
2. Jalankan `npm test` setelah mengubah kode. Jangan bilang "selesai" kalau test belum hijau.
3. Format response:
   - Sukses: `{ "data": ... }`
   - Error: `{ "error": { "code": "UPPER_SNAKE_CASE", "message": "..." } }`
   - 400 untuk input tidak valid, 404 untuk resource tidak ditemukan.
4. Validasi semua input dari `req.body` dan `req.params` (tipe + nilai kosong). `:id` harus integer positif.
5. Jangan tambah dependency baru tanpa izin. Express + Node built-in sudah cukup.
6. Jangan ubah struktur response endpoint yang sudah ada (public contract).

## Batasan
- Jangan baca/ubah file `.env` atau file credential apa pun.
- Jangan jalankan command destruktif (`rm -rf`, `git push`, `git reset --hard`).
- Sebelum mengedit lebih dari 1 file, tuliskan rencana singkat dulu.
