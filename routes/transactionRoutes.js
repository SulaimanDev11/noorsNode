const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions } = require('../controllers/transactionController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/transactions/create', auth, createTransaction);
router.get('/api/transactions/summary', auth, getAllTransactions);
router.get('/api/transactions/filter/:id', auth, getAllTransactions);

module.exports = router;