/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} category
 * @property {number} price  dalam Rupiah
 * @property {number} stock
 */

/** @type {Product[]} */
const products = [
  { id: 1, name: 'Kopi Arabika 250g', category: 'minuman', price: 85000, stock: 20 },
  { id: 2, name: 'Teh Melati', category: 'minuman', price: 15000, stock: 0 },
  { id: 3, name: 'Keripik Singkong', category: 'snack', price: 12000, stock: 50 },
  { id: 4, name: 'Cokelat Batang', category: 'snack', price: 25000, stock: 8 },
  { id: 5, name: 'Air Mineral 1L', category: 'minuman', price: 6000, stock: 100 },
  { id: 6, name: 'Kacang Mete', category: 'snack', price: 60000, stock: 3 },
  { id: 7, name: 'Susu UHT', category: 'minuman', price: 7000, stock: 40 },
];

/** @type {import('express').RequestHandler} */
function listProducts(req, res) {
  res.json({ data: products });
}

/** @type {import('express').RequestHandler} */
function getProduct(req, res) {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: { code: 'PRODUCT_NOT_FOUND', message: 'Produk tidak ditemukan' } });
  }
  res.json({ data: product });
}

module.exports = { listProducts, getProduct };
