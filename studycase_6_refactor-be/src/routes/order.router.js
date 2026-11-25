const { Router } = require('express');
const orderController = require('../controllers/order.controller');

const router = Router();
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);

module.exports = router;
