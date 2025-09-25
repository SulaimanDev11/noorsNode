const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');


router.post('/api/user/add', addUser);
router.post('/api/user/getUser', getUser);
// router.get('/api/user/filter/:id', getAllTransactions);

module.exports = router;
