const express = require('express');
const router = express.Router();
const { addCustomer, getAllCustomers } = require('../controllers/customerController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/customer/addCustomer', addCustomer);
router.post('/api/customer/getAllCustomers', getAllCustomers);

module.exports = router;