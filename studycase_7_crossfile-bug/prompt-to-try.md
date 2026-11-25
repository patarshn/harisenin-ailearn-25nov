# Prompt to Try — Studycase 7

## Prompt 0 — Pembanding (prompt asal-asalan)

```
checkout error, fix dong
```

Catat: berapa file yang diubah? Apakah semua 3 masalah ketemu? Apakah ada test? Lalu `git checkout .` dan lanjut ke Prompt 1 di session baru.

## Prompt 1 — Context Pack (slide 18)

Ganti bagian `<...>` dengan hasil reproduksi kamu sendiri.

```
## Bug
Checkout dari frontend selalu HTTP 500. Kalau header Authorization dikirim benar via curl,
response 200 {"data":{"status":"pending"}} tapi order tidak muncul di GET /orders.

## Stack trace / log server
<paste error dari terminal npm start>

## Network response (browser DevTools)
Request: POST /orders, header Authorization: "Bearer  eyJ..." (perhatikan spasinya), body {"productId":1,"quantity":"2"}
Response: <paste>

## Related code paths
- public/checkout.js (CheckoutForm)
- src/routes/order.router.js
- src/middlewares/auth.js
- src/controllers/order.controller.js
- src/models/order.model.js (validasi meniru Sequelize)

## Data schema
Order: { id: int, userId: int, productId: int, quantity: int >= 1, total: int }

## Instruksi
Petakan alur request dari client sampai model. Buat daftar hipotesis root cause per file,
urutkan dari yang paling mungkin. JANGAN tulis patch dulu.
```

## Prompt 2 — Test dulu, baru fix

```
Tulis test di test/checkout.test.js yang mereproduksi setiap root cause (harus gagal sekarang):
1. header "Bearer  <token>" (spasi ganda) → harus tetap diterima atau 401, bukan 500
2. tanpa header Authorization → 401 JSON
3. quantity string → 422 dengan detail field
Jalankan npm test dan tunjukkan test yang gagal.
```

## Prompt 3 — Perbaikan terkoordinasi

```
Perbaiki ketiga file (checkout.js, auth.js, order.controller.js) sesuai root cause. Format error { error: { code, message } }. Jalankan npm test sampai hijau. Ringkas perubahan per file dalam tabel.
```

## Bonus — Code-Driven Documentation (slide 19–21)

### README profesional (prompt dari slide 21)
```
Baca package.json, src/routes, dan src/middlewares. Buat README-API.md dengan bagian: Architecture, Database Setup, Environment Variables, serta Contoh Request & Response JSON.
```

### OpenAPI
```
Buat openapi.yaml (OpenAPI 3.0) dari src/routes dan validasi di src/models. Sertakan security scheme bearerAuth dan semua response error (401, 422).
```

### Mermaid diagram
```
Buat sequence diagram Mermaid untuk alur login lalu checkout: Browser → auth.router → jwt → order.router → auth middleware → order.controller → order.model. Simpan di docs/flow.md.
```

Cek hasilnya: apakah dokumentasi sesuai kode **sebenarnya**? (Halusinasi sering muncul di sini: endpoint atau field yang tidak ada.)
