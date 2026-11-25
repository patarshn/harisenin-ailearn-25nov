# AGENTS.md — Product API

## Project
Product catalog API. Express 4, data in-memory di `src/products.js`.

## Commands
- Run: `npm start`
- Lint: `npm run lint`
- Test: `npm test`
- **Verify (wajib sebelum bilang selesai): `npm run verify`** (lint + test)

## Workflow Wajib
Setiap fitur/perubahan non-trivial mengikuti skill `feature-workflow`:
Prompt → **Plan → (tunggu approval user)** → Dev → Test & Verify.

**Jangan menulis kode sebelum user menyetujui plan.**

## Konvensi
- Response sukses `{ data }`, error `{ error: { code, message } }`.
- Response list yang dipaginasi: `{ data: [...], meta: { page, limit, total } }`.
- Query param invalid → 400 `VALIDATION_ERROR`.
- Jangan tambah dependency baru tanpa izin.
