const express = require('express');
const router = express.Router();
const { addContainer, updateContainer, getAllPendingContainer, updateContainerFinal } = require('../controllers/containerController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/container/add', addContainer);
router.post('/api/container/getAllPendingContainer', getAllPendingContainer);
router.post('/api/container/update', updateContainer);
router.post('/api/container/final', updateContainerFinal);

module.exports = router;