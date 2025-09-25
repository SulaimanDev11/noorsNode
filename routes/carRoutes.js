const express = require('express');
const router = express.Router();
const { getAllAuctions, addCar, getAllCars, updateCar } = require('../controllers/carController');
const auth = require('../middlewares/authMiddleware');

router.post('/api/car/getAllAuctions', getAllAuctions);
router.post('/api/car/add', addCar);
router.post('/api/car/getAllCars', getAllCars);
router.post('/api/car/updateCar', updateCar);

module.exports = router;