const express = require('express');
const router = express.Router();
const { createOrder, receivePayment, getPending } = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/order/create', createOrder);
router.post('/api/order/paymentReceived', receivePayment);
router.post('/api/order/getPending', getPending);

module.exports = router;