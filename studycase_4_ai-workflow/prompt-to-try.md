# Prompt to Try — Studycase 4

## Tahap 1 + 2 — Prompt & Plan

```
Saya mau GET /products mendukung:
- filter category (contoh: ?category=snack)
- filter harga (?minPrice=10000&maxPrice=50000)
- filter hanya yang ada stok (?inStock=true)
- pagination (?page=1&limit=3), default limit 10, maksimal 50

Context: src/products.js, src/app.js, test/products.test.js, AGENTS.md.
Ikuti skill feature-workflow. Buat PLAN.md dulu, JANGAN tulis kode sebelum saya approve.
```

## Tahap 3 — Human Review

Baca `PLAN.md`. Cek minimal hal-hal ini — kalau belum ada, minta revisi:

- [ ] `minPrice > maxPrice` → apa yang terjadi?
- [ ] `page=0`, `page=-1`, `limit=1000`, `limit=abc` → 400 atau di-clamp?
- [ ] `category` beda huruf besar/kecil (`Snack`)?
- [ ] `inStock=yes` (bukan `true`/`false`)?
- [ ] Response contract: apakah `{ data, meta }` merusak client lama yang membaca `data`?
- [ ] Halaman melebihi total (`page=99`) → data kosong, bukan error?

Contoh prompt revisi:
```
Revisi plan: limit di atas 50 jangan error, tapi di-clamp ke 50. minPrice > maxPrice harus 400. Update PLAN.md lalu minta review lagi.
```

Kalau sudah oke:
```
Plan approved. Lanjut ke tahap Development dan Test & Verify.
```

## Tahap 5 — Verify

Setelah agent bilang selesai:
```
Tunjukkan output npm run verify dan ringkas diff-nya per file.
```

Lalu review sendiri: `git diff`.

## Bonus — Simulasi feedback loop

```
Ubah ESLint rule supaya melarang console.log di folder src/ kecuali src/server.js, lalu jalankan npm run verify dan perbaiki kalau gagal.
```

## Diskusi
- Edge case apa yang **tidak** ditemukan agent di plan, tapi kamu temukan saat review?
- Apa yang terjadi kalau tahap 3 dilewati?
