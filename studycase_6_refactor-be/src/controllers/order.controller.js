// ⚠️ FAT CONTROLLER — sengaja dibuat begini untuk latihan refactor.
// Validasi, kalkulasi diskon, cek stok, update stok, dan response HTTP semuanya di sini.
const { db } = require('../db');

exports.createOrder = (req, res) => {
  try {
    const { customerId, items, promoCode } = req.body;

    if (!customerId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'customerId dan items wajib diisi' } });
    }

    const customer = db.customers.find((c) => c.id === customerId);
    if (!customer) {
      return res.status(404).json({ error: { code: 'CUSTOMER_NOT_FOUND', message: 'Customer tidak ditemukan' } });
    }

    let subtotal = 0;
    let discount = 0;
    const lines = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!Number.isInteger(item.qty) || item.qty <= 0) {
        return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'qty harus integer > 0' } });
      }
      const product = db.products.find((p) => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ error: { code: 'PRODUCT_NOT_FOUND', message: `Produk ${item.productId} tidak ditemukan` } });
      }
      if (product.stock < item.qty) {
        return res.status(422).json({
          error: { code: 'INSUFFICIENT_STOCK', message: `Stok ${product.name} tersisa ${product.stock}` },
        });
      }
      let lineTotal = product.price * item.qty;
      // diskon grosir: beli >= 10 pcs dapat 5% untuk item tsb
      if (item.qty >= 10) {
        const bulk = Math.round(lineTotal * 0.05);
        discount = discount + bulk;
      }
      subtotal = subtotal + lineTotal;
      lines.push({ productId: product.id, name: product.name, qty: item.qty, price: product.price, lineTotal: lineTotal });
    }

    // diskon member
    if (customer.tier === 'gold') {
      discount = discount + Math.round(subtotal * 0.1);
    } else if (customer.tier === 'silver') {
      discount = discount + Math.round(subtotal * 0.05);
    }

    // promo code
    if (promoCode) {
      if (promoCode === 'HEMAT10') {
        let promo = Math.round(subtotal * 0.1);
        if (promo > 20000) promo = 20000;
        discount = discount + promo;
      } else if (promoCode === 'GRATISONGKIR') {
        if (subtotal < 100000) {
          return res.status(422).json({
            error: { code: 'PROMO_NOT_ELIGIBLE', message: 'GRATISONGKIR minimal belanja 100000' },
          });
        }
        discount = discount + 15000;
      } else {
        return res.status(422).json({ error: { code: 'INVALID_PROMO', message: 'Kode promo tidak valid' } });
      }
    }

    if (discount > subtotal) discount = subtotal;

    // kurangi stok
    for (let i = 0; i < lines.length; i++) {
      const p = db.products.find((x) => x.id === lines[i].productId);
      p.stock = p.stock - lines[i].qty;
    }

    const order = {
      id: db.orders.length + 1,
      customerId: customer.id,
      items: lines,
      subtotal: subtotal,
      discount: discount,
      total: subtotal - discount,
      createdAt: new Date().toISOString(),
    };
    db.orders.push(order);

    return res.status(201).json({ data: order });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan' } });
  }
};

exports.getOrder = (req, res) => {
  const order = db.orders.find((o) => o.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ error: { code: 'ORDER_NOT_FOUND', message: 'Order tidak ditemukan' } });
  }
  return res.json({ data: order });
};
