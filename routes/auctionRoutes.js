const express = require('express');
const router = express.Router();
const { addAuction } = require('../controllers/auctionController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/auction/add', addAuction);

module.exports = router;