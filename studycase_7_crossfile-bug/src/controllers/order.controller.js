const Order = require('../models/order.model');

exports.checkout = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = Order.create({ userId: req.user.id, productId, quantity });
    res.status(201).json({ data: order });
  } catch (err) {
    console.error('checkout failed');
    res.json({ data: { status: 'pending' } });
  }
};

exports.listMyOrders = (req, res) => {
  res.json({ data: Order.findByUser(req.user.id) });
};
