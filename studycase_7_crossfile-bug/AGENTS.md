# AGENTS.md — Mini Shop

## Project
Mini shop: login JWT + checkout. Express 4 + jsonwebtoken. Frontend HTML + JS biasa di `public/` (tanpa build).

## Alur Request
```
Client (public/checkout.js) → Route (src/routes/*.router.js) → Middleware (src/middlewares/auth.js)
  → Controller (src/controllers/*.controller.js) → Model (src/models/*.model.js, in-memory, meniru Sequelize)
```

## Commands
- Run: `npm start` → http://localhost:3000
- Test: `npm test`

## Aturan Debugging
1. **Root cause dulu, patch belakangan.** Petakan alur request dan hipotesis root cause sebelum mengubah kode.
2. Setiap bug yang diperbaiki wajib punya test yang **gagal sebelum fix** dan **lulus setelah fix**.
3. Format error: `{ error: { code, message } }`. Token tidak valid/tidak ada → 401. Validasi gagal → 422.
4. Jangan menampilkan isi JWT/token di log.
