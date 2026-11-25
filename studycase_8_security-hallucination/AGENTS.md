# AGENTS.md — Invoice API (Security Review Lab)

## Project
Invoice API (Express 4 + jsonwebtoken). Data in-memory di `src/data.js`. Kode ini **sengaja mengandung celah** untuk latihan review.

## Commands
- Run: `npm start`
- Test: `npm test`

## Aturan Review & Perbaikan
- Setiap temuan wajib menyebut: file:baris, kategori risiko (secrets management / access control / input validation / dependency / deprecated API), skenario eksploitasi, dan perbaikan.
- **Dilarang `npm install` paket baru** tanpa membuktikan paketnya ada: `npm view <nama> name repository.url`. Kalau E404, paket itu tidak ada (halusinasi).
- Jangan menampilkan nilai secret di output. Sebut nama variabelnya saja.
- Perbaikan celah keamanan wajib disertai test yang membuktikan celah tertutup (mis. user A → invoice user B = 404/403).
- Kalau ragu apakah API/method masih didukung, cek dokumentasi resmi — jangan menebak.
