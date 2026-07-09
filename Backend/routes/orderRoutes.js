const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, orderController.placeOrder);
router.get('/user/:userId?', protect, orderController.getUserOrders);
router.get('/order/:id', protect, orderController.getOrderById);
router.get('/', protect, isAdmin, orderController.getAllOrders);
router.put('/:id/status', protect, isAdmin, orderController.updateOrderStatus);

module.exports = router;
