> Klasifikasi: INTERNAL

# Studycase 8 — Security, Privacy & AI Hallucination

**Materi:** Slide 28–29 (kebocoran data & sanitasi credential), 30 (lisensi), 32–33 (AI limitations & 4 bentuk logical hallucination)

## Project ini untuk apa?

Invoice API yang **terlihat rapi, test-nya hijau, tapi penuh celah** — persis seperti output AI yang "confidently wrong". Tugasmu: pakai AI agent untuk **menemukan** masalahnya, lalu verifikasi sendiri.

| Kategori (slide) | Ada di project ini? |
|---|---|
| API Keys & JWT Secret ter-hardcode | ✅ |
| Phantom Packages (slopsquatting) | ✅ (file contoh, tidak dijalankan) |
| Asumsi Boundary Condition (null, array kosong, timezone) | ✅ |
| IDOR Authorization Bypass | ✅ |
| API Deprecated | ✅ |

Jumlah dan lokasinya ada di kunci jawaban di bawah — coba cari dulu.

## Cara Menjalankan

```bash
npm install
npm start       # http://localhost:3000
npm test        # 2 test lulus (hanya happy path — itu bagian dari masalahnya)
```

User demo: `budi / budi123` (invoice 101, 102) dan `sari / sari123` (invoice 201).

```bash
TOKEN=$(curl -s -X POST localhost:3000/auth/login -H 'Content-Type: application/json' \
  -d '{"username":"budi","password":"budi123"}' | node -pe 'JSON.parse(require("fs").readFileSync(0)).data.token')

curl "localhost:3000/invoices" -H "Authorization: Bearer $TOKEN"
curl "localhost:3000/invoices?month=2026-11" -H "Authorization: Bearer $TOKEN"
curl "localhost:3000/invoices/101" -H "Authorization: Bearer $TOKEN"
```

## Cara Demo

1. Ikuti `prompt-to-try.md` — minta agent me-review, lalu **buktikan** tiap temuan dengan curl/test.
2. Bandingkan temuan agent dengan kunci jawaban. Ada yang terlewat? Ada temuan palsu (halusinasi reviewer)?

## Protokol Sanitasi (slide 29) — cara menerapkannya di Antigravity / OpenCode

- **Prompt hygiene:** jangan paste DB dump / token production / data pelanggan asli ke prompt. Pakai data palsu seperti di `src/data.js`.
- **File ignore:** blokir `.env*`, `*.pem`, `*.key`, `secrets/`, `*dump*.sql`, `customer-exports/` dari agent → contoh lengkap di `studycase_3_hooks-guardrails/` (`opencode.json` permissions + `.agents/hooks.json`).
- **Secret scanner:** pasang pre-commit → contoh di `studycase_3_hooks-guardrails/.githooks/`. Di project nyata: Gitleaks.
- **Akun AI:** kode proprietary hanya dikirim ke akun/plan yang kebijakan datanya sudah disetujui perusahaan.

## Lisensi & copyleft (slide 30)

Tidak ada demo kode untuk ini. Poin praktisnya: kalau AI menghasilkan potongan kode panjang yang terlihat seperti dari library tertentu, cari sumbernya dan cek lisensinya; untuk dependency baru, cek field `license` (`npm view <paket> license`) sebelum dipakai di produk komersial.

## Kunci Jawaban

<details>
<summary>⚠️ Spoiler — buka setelah mencoba</summary>

| # | File | Masalah | Risiko | Perbaikan |
|---|---|---|---|---|
| 1 | `src/config.js` | `JWT_SECRET` & `PAYMENT_API_KEY` hardcoded | Secrets management — siapa pun yang baca repo bisa memalsukan JWT | `process.env.*`, fail-fast kalau kosong, `.env.example`, rotasi secret yang sudah bocor |
| 2 | `src/routes/invoice.router.js` `GET /:id` | Cek token tapi tidak cek `ownerId` → budi bisa baca invoice 201 milik sari | Access control (IDOR) | Filter `inv.ownerId === req.user.id`, balas 404 |
| 3 | `src/utils/report.js` `averageAmount` | Array kosong → `0/0 = NaN` → JSON `null` | Input validation / boundary | Return `0` kalau kosong |
| 4 | `src/routes/invoice.router.js` `GET /` | `inv.customer.name` crash kalau `customer: null` (login sari → 500) | Boundary (null) | Optional chaining `inv.customer?.name ?? null` |
| 5 | `src/utils/report.js` `invoiceDate` | `toISOString()` pakai UTC → invoice `2026-11-01T00:30+07:00` dianggap Oktober | Boundary (timezone) | Hitung tanggal di timezone bisnis (Asia/Jakarta), mis. `Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' })` |
| 6 | `src/utils/report.js` `encodeInvoiceRef` | `new Buffer()` deprecated (Node DEP0005) | Deprecated API | `Buffer.from()` |
| 7 | `src/validators/invoice.validator.example.js` | Import 2 paket yang tidak ada di npm | Supply chain (phantom package / slopsquatting) | Hapus; tulis cek ownership sendiri (lihat #2) |
| 8 | `src/data.js` | Password plain text | Credential storage | Hash (bcrypt/argon2) — di luar scope demo |
| 9 | `test/smoke.test.js` | Hanya happy path, tidak ada test otorisasi / edge case | Verifikasi | Tambah test IDOR, array kosong, null, timezone |

</details>
