const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions } = require('../controllers/transactionController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/transactions/create', createTransaction);
router.get('/api/transactions/summary', getAllTransactions);
// router.get('/api/transactions/filter/:id', getAllTransactions);

module.exports = router;