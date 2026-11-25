> Klasifikasi: INTERNAL

# Studycase 6 — Refactoring Layer Backend

**Materi:** Slide 16 (4 Guardrails Refactoring yang Aman), Slide 25 (Memecah Fat Controller)

## Project ini untuk apa?

Order API dengan **fat controller**: [`src/controllers/order.controller.js`](src/controllers/order.controller.js) berisi validasi, kalkulasi diskon (member tier, grosir, promo code), cek stok, update stok, dan response HTTP sekaligus.

Tugasnya: pecah ke **service layer** + **repository** + **centralized error handling** tanpa mengubah perilaku.

### Aturan bisnis (biar gampang verifikasi)

| Aturan | Detail |
|---|---|
| Diskon member | gold 10%, silver 5% dari subtotal |
| Diskon grosir | qty ≥ 10 untuk satu item → 5% dari line total item itu |
| `HEMAT10` | 10% dari subtotal, maksimal Rp20.000 |
| `GRATISONGKIR` | potongan Rp15.000, minimal belanja Rp100.000 (kalau kurang → 422 `PROMO_NOT_ELIGIBLE`) |
| Promo lain | 422 `INVALID_PROMO` |
| Stok kurang | 422 `INSUFFICIENT_STOCK` |

### 4 Guardrail Refactoring (slide 16) di project ini

| Guardrail | Wujudnya |
|---|---|
| Test sebelum mengubah | `test/orders.contract.test.js` (8 characterization test, sudah hijau) |
| PR maksimal 200 baris | Refactor bertahap, 1 langkah per prompt |
| Jaga public contract | Test mengecek key JSON, status, dan error code |
| File konfigurasi AI | `AGENTS.md` berisi struktur target + aturan refactor |

## Cara Menjalankan

```bash
npm install
npm start      # http://localhost:3000
npm test       # 8 test harus lulus — sebelum DAN sesudah refactor
```

```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" \
  -d '{"customerId":1,"items":[{"productId":1,"qty":2}],"promoCode":"HEMAT10"}'
```

## Cara Demo

Ikuti `prompt-to-try.md`. Setelah tiap langkah: `npm test` + `git diff --stat`.

## Kekurangan yang disengaja

- Fat controller, magic number (0.1, 0.05, 20000, 15000), `console.log` di catch.
- **Bug tersembunyi:** item dengan `productId` yang sama dikirim 2x (`[{productId:3,qty:2},{productId:3,qty:2}]`) lolos cek stok → stok jadi minus. Lihat apakah agent melaporkannya tanpa langsung "diam-diam" memperbaiki.
- `id` order memakai `orders.length + 1`.
- Slide memakai `OrderService.ts`; di sini JavaScript supaya tidak perlu setup TypeScript.
