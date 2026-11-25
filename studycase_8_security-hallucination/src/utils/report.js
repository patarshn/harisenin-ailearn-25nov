/** Rata-rata nilai invoice. */
function averageAmount(invoices) {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  return total / invoices.length;
}

/** Ambil tanggal (YYYY-MM-DD) dari timestamp invoice. */
function invoiceDate(issuedAt) {
  return new Date(issuedAt).toISOString().slice(0, 10);
}

/** Nomor invoice untuk ditampilkan di PDF. */
function encodeInvoiceRef(id) {
  return new Buffer('INV-' + id).toString('base64');
}

module.exports = { averageAmount, invoiceDate, encodeInvoiceRef };
