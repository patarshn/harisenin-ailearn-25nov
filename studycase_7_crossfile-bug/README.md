> Klasifikasi: INTERNAL

# Studycase 7 — Debugging Lintas File + Code-Driven Documentation

**Materi:** Slide 17 (Alur Request), 18 (Context Pack), 19–21 (Dokumentasi otomatis & README), 26 (Bug Auth & Checkout Lintas File)

## Project ini untuk apa?

Mini shop dengan login JWT dan checkout. Ada **bug berlapis di 3 file berbeda**. Tujuannya latihan:
1. Menyusun **context pack** untuk AI agent (stack trace, file terkait, schema, hipotesis).
2. Meminta agent memetakan **root cause** sebelum menulis patch.
3. Bonus: generate **README, OpenAPI, dan Mermaid diagram** dari kode.

```
Client ──► Route ──► Middleware ──► Controller ──► Model
checkout.js  order.router.js  auth.js  order.controller.js  order.model.js
```

## 🐞 Laporan Bug (dari "tim QA")

> **Judul:** Checkout tidak bisa dipakai
> 1. Login sebagai `budi` / `budi123` → "Login berhasil".
> 2. Klik **Checkout** → muncul "Checkout gagal (HTTP 500)".
> 3. Di Postman, kadang checkout bilang sukses (HTTP 200), tapi pesanan **tidak muncul** di "Pesanan Saya".

## Cara Menjalankan

```bash
npm install
npm start          # buka http://localhost:3000
npm test           # 2 test (login) lulus — belum ada test untuk checkout
```

Reproduksi via curl:
```bash
TOKEN=$(curl -s -X POST localhost:3000/auth/login -H 'Content-Type: application/json' \
  -d '{"username":"budi","password":"budi123"}' | node -pe 'JSON.parse(require("fs").readFileSync(0)).data.token')

# seperti frontend (spasi ganda + quantity string) → 500
curl -i -X POST localhost:3000/orders -H "Authorization: Bearer  $TOKEN" \
  -H 'Content-Type: application/json' -d '{"productId":1,"quantity":"2"}'

# header benar, quantity string → 200 tapi order tidak tersimpan
curl -i -X POST localhost:3000/orders -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' -d '{"productId":1,"quantity":"2"}'

# tanpa header → 500 (harusnya 401)
curl -i localhost:3000/orders
```

## Cara Demo

1. Reproduksi bug di browser + curl. Salin error dari terminal server.
2. Ikuti `prompt-to-try.md` → mulai dari prompt **context pack**.
3. Bandingkan dengan prompt asal-asalan ("checkout error, fix dong").

## Kekurangan yang disengaja

<details>
<summary>⚠️ Spoiler — kunci jawaban (buka setelah mencoba)</summary>

| File | Masalah | Perbaikan yang diharapkan |
|---|---|---|
| `public/checkout.js` | Header `'Bearer  '` (spasi ganda) dan `quantity` dikirim sebagai string | Satu spasi, `Number(quantity)` |
| `src/middlewares/auth.js` | `split(' ')[1]` gagal kalau spasi ganda; header kosong → crash 500; `jwt.verify` tanpa try/catch | Validasi format `Bearer <token>`, kembalikan 401 JSON |
| `src/controllers/order.controller.js` | `catch` menelan `SequelizeValidationError` dan membalas 200 `pending` | Kembalikan 422 dengan detail error; error lain → 500 |

Catatan: memperbaiki frontend saja **tidak cukup** — API tetap rapuh untuk client lain (mobile, Postman).
</details>

Lainnya (bukan fokus, bahan diskusi): password plain text di `user.model.js`, fallback `JWT_SECRET` di `config.js`.
