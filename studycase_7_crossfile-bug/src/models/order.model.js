// Meniru perilaku Sequelize: validasi di model melempar ValidationError.
class ValidationError extends Error {
  constructor(errors) {
    super('Validation error');
    this.name = 'SequelizeValidationError';
    this.errors = errors;
  }
}

const products = [
  { id: 1, name: 'Kopi Arabika 250g', price: 85000 },
  { id: 2, name: 'Teh Melati', price: 15000 },
];
const orders = [];

function create({ userId, productId, quantity }) {
  const errors = [];
  if (!Number.isInteger(productId)) errors.push({ path: 'productId', message: 'productId must be an integer' });
  if (!Number.isInteger(quantity) || quantity < 1) errors.push({ path: 'quantity', message: 'quantity must be an integer >= 1' });
  if (errors.length) throw new ValidationError(errors);

  const product = products.find((p) => p.id === productId);
  if (!product) throw new ValidationError([{ path: 'productId', message: 'product not found' }]);

  const order = { id: orders.length + 1, userId, productId, quantity, total: product.price * quantity };
  orders.push(order);
  return order;
}

function findByUser(userId) {
  return orders.filter((o) => o.userId === userId);
}

module.exports = { create, findByUser, ValidationError };
