const express = require('express');
const router = express.Router();
const { addAccount, getAccount } = require('../controllers/accountController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/account/add', addAccount);
router.post('/api/account/getAll', getAccount);

module.exports = router;