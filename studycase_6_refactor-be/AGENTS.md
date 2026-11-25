# AGENTS.md — Order API

## Project
Order API (Express 4). `src/db.js` = pengganti database (in-memory).

## Commands
- Run: `npm start`
- Test: `npm test`

## Struktur Target Refactor
```
src/
├── routes/        # URL → controller
├── controllers/   # HTTP saja: baca req, panggil service, map hasil/error ke response
├── services/      # business logic (diskon, promo, stok) — TANPA req/res
├── repositories/  # akses data (db.js) — satu-satunya layer yang menyentuh db
└── errors/        # class error domain (mis. AppError dengan status + code)
```

## Guardrail Refactor (WAJIB)
1. **Test dulu.** `test/orders.contract.test.js` adalah characterization test. **Jangan ubah file ini.** Harus tetap hijau setelah setiap langkah.
2. **Perubahan kecil.** Satu langkah refactor per perubahan (target < 200 baris diff). Jalankan `npm test` setiap langkah.
3. **Jaga public contract.** Struktur JSON response, status code, dan error code tidak boleh berubah.
4. Jangan menambah dependency.
5. Kalau menemukan bug, **laporkan dulu**, jangan langsung diperbaiki di tengah refactor (refactor ≠ ubah perilaku).
