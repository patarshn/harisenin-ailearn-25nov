// CHARACTERIZATION TEST — mengunci perilaku & JSON contract SEBELUM refactor.
// Test ini tidak boleh diubah saat refactor. Kalau merah, berarti perilaku berubah.
const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');
const { resetDb } = require('../src/db');

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});
after(() => server.close());
beforeEach(() => resetDb());

const createOrder = async (body) => {
  const res = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
};

test('regular customer, tanpa promo', async () => {
  const { status, body } = await createOrder({ customerId: 3, items: [{ productId: 1, qty: 2 }] });
  assert.equal(status, 201);
  assert.deepEqual(Object.keys(body.data).sort(), ['createdAt', 'customerId', 'discount', 'id', 'items', 'subtotal', 'total']);
  assert.equal(body.data.subtotal, 170000);
  assert.equal(body.data.discount, 0);
  assert.equal(body.data.total, 170000);
  assert.deepEqual(body.data.items[0], { productId: 1, name: 'Kopi Arabika 250g', qty: 2, price: 85000, lineTotal: 170000 });
});

test('gold customer dapat 10%', async () => {
  const { body } = await createOrder({ customerId: 1, items: [{ productId: 1, qty: 2 }] });
  assert.equal(body.data.discount, 17000);
  assert.equal(body.data.total, 153000);
});

test('silver + grosir (qty >= 10) + HEMAT10 (max 20000)', async () => {
  const { body } = await createOrder({ customerId: 2, items: [{ productId: 2, qty: 20 }], promoCode: 'HEMAT10' });
  // subtotal 300000, grosir 15000, silver 15000, HEMAT10 min(30000, 20000)
  assert.equal(body.data.subtotal, 300000);
  assert.equal(body.data.discount, 50000);
  assert.equal(body.data.total, 250000);
});

test('GRATISONGKIR di bawah minimum → 422 PROMO_NOT_ELIGIBLE', async () => {
  const { status, body } = await createOrder({ customerId: 3, items: [{ productId: 2, qty: 1 }], promoCode: 'GRATISONGKIR' });
  assert.equal(status, 422);
  assert.equal(body.error.code, 'PROMO_NOT_ELIGIBLE');
});

test('promo tidak dikenal → 422 INVALID_PROMO', async () => {
  const { status, body } = await createOrder({ customerId: 3, items: [{ productId: 2, qty: 1 }], promoCode: 'NGASAL' });
  assert.equal(status, 422);
  assert.equal(body.error.code, 'INVALID_PROMO');
});

test('stok kurang → 422 INSUFFICIENT_STOCK dan stok tidak berubah', async () => {
  const { status, body } = await createOrder({ customerId: 3, items: [{ productId: 3, qty: 5 }] });
  assert.equal(status, 422);
  assert.equal(body.error.code, 'INSUFFICIENT_STOCK');
  const ok = await createOrder({ customerId: 3, items: [{ productId: 3, qty: 3 }] });
  assert.equal(ok.status, 201);
});

test('validasi input', async () => {
  assert.equal((await createOrder({ items: [] })).status, 400);
  assert.equal((await createOrder({ customerId: 3, items: [{ productId: 1, qty: 0 }] })).status, 400);
  assert.equal((await createOrder({ customerId: 99, items: [{ productId: 1, qty: 1 }] })).body.error.code, 'CUSTOMER_NOT_FOUND');
  assert.equal((await createOrder({ customerId: 3, items: [{ productId: 99, qty: 1 }] })).body.error.code, 'PRODUCT_NOT_FOUND');
});

test('GET /orders/:id', async () => {
  const { body } = await createOrder({ customerId: 3, items: [{ productId: 1, qty: 1 }] });
  const res = await fetch(`${baseUrl}/orders/${body.data.id}`);
  assert.equal(res.status, 200);
  assert.equal((await fetch(`${baseUrl}/orders/999`)).status, 404);
});
