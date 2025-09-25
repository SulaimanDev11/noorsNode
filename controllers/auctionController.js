const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Auction = require("../models/auction");

const addAuction = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        console.log(req.body);
        const result = await Auction.create(data, { transaction: t });
        console.log(result);

        await t.commit();
        return res.json({ status: true, message: "Auction added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Auction Adding Exception: " + e });
    }
}


module.exports = {
    addAuction,
}