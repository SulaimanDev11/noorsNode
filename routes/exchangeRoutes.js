const express = require('express');
const router = express.Router();
const { addVendor, addRate, getAllVendors } = require('../controllers/exchangeController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/exchange/addVendor', addVendor);
router.post('/api/exchange/addRate', addRate);
router.post('/api/exchange/getAllVendors', getAllVendors);

module.exports = router;