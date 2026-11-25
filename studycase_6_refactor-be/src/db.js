// Pengganti database (in-memory). Anggap ini tabel MySQL.
const seed = () => ({
  customers: [
    { id: 1, name: 'Customer Gold', tier: 'gold' },
    { id: 2, name: 'Customer Silver', tier: 'silver' },
    { id: 3, name: 'Customer Reguler', tier: 'regular' },
  ],
  products: [
    { id: 1, name: 'Kopi Arabika 250g', price: 85000, stock: 20 },
    { id: 2, name: 'Teh Melati', price: 15000, stock: 100 },
    { id: 3, name: 'Kacang Mete', price: 60000, stock: 3 },
  ],
  orders: [],
});

const db = seed();

/** Reset data ke kondisi awal (dipakai test). */
function resetDb() {
  Object.assign(db, seed());
}

module.exports = { db, resetDb };
