const { Router } = require('express');
const auth = require('../middlewares/auth');
const { invoices } = require('../data');
const { averageAmount, invoiceDate, encodeInvoiceRef } = require('../utils/report');

const router = Router();

// List invoice milik user login, opsional filter ?month=YYYY-MM
router.get('/', auth, (req, res) => {
  let mine = invoices.filter((inv) => inv.ownerId === req.user.id);
  if (req.query.month) {
    mine = mine.filter((inv) => invoiceDate(inv.issuedAt).startsWith(req.query.month));
  }
  res.json({
    data: mine.map((inv) => ({ ...inv, customerName: inv.customer.name, ref: encodeInvoiceRef(inv.id) })),
    meta: { average: averageAmount(mine) },
  });
});

// Detail invoice
router.get('/:id', auth, (req, res) => {
  const invoice = invoices.find((inv) => inv.id === Number(req.params.id));
  if (!invoice) {
    return res.status(404).json({ error: { code: 'INVOICE_NOT_FOUND', message: 'Invoice tidak ditemukan' } });
  }
  res.json({ data: invoice });
});

module.exports = router;
