const { Router } = require('express');
const auth = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');

const router = Router();
router.get('/', auth, orderController.listMyOrders);
router.post('/', auth, orderController.checkout);

module.exports = router;
