const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Cars = require("../models/cars");
const CarImages = require("../models/carsImages");
const AuctionVendors = require("../models/auctionVendors");

const getAllAuctions = async (req, res) => {
    const data = req.body;

    try {

        const result = await AuctionVendors.findAll({ where: { status: 1 } });

        return res.json({ status: true, message: "auctions fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "auctions fetched Exception", error: e.message });
    }
}

const addCar = async (req, res) => {
    const data = req.body;
    const images = data.paths;

    const t = await sequelize.transaction();

    try {

        const result = await Cars.create(data, { transaction: t });

        if (images && images.length > 0) {
            try {

                const updatedImages = images.map(item => ({
                    ...item,
                    type: 'image',
                    cid: result.id,
                    status: 0,
                    uid: data.uid
                }));

                await CarImages.bulkCreate(updatedImages, { transaction: t });
            } catch (e) {
                console.log("Error ", e);

            }
        }

        await t.commit();
        return res.json({ status: true, message: "Cars added successfully", data: result });

    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Cars Adding Exception", error: e.message });
    }
}

const getAllCars = async (req, res) => {
    const data = req.body;

    try {

        const result = await Cars.findAll({ where: { status: 'Purchase' } });

        return res.json({ status: true, message: "Cars fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "Cars fetched Exception", error: e.message });
    }
}

const updateCar = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {

        const result = await Cars.update(data, { where: { id: data.car_id } });

        await t.commit();
        return res.json({ status: true, message: "Cars update successfully", data: result });

    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Cars update Exception", error: e.message });
    }
}

module.exports = {
    getAllAuctions,
    addCar,
    getAllCars,
    updateCar
}