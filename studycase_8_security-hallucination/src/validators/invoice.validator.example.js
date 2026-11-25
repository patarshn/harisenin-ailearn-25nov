// ⚠️ CONTOH OUTPUT AI YANG BERHALUSINASI — file ini TIDAK dipakai oleh app.
// Paket di bawah TIDAK ADA di npm (dicek: `npm view <nama>` → E404, November 2026).
// JANGAN `npm install` nama ini: penyerang bisa mendaftarkan nama paket hasil halusinasi
// dan mengisinya dengan malware (slopsquatting).
const { ownershipGuard } = require('express-jwt-ownership-guard');
const { validateInvoice } = require('express-secure-invoice-validator');

module.exports = [ownershipGuard({ field: 'ownerId' }), validateInvoice({ strict: true })];
