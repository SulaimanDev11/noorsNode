const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const ExchangeQuote = require("../models/exchangeVendors");
const ExchangeRate = require("../models/exchangeRates");

const addVendor = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await ExchangeQuote.create(data, { transaction: t });

        await t.commit();
        return res.json({ status: true, message: "Vendor added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Vendor Adding Exception: " + e });
    }
}

const addRate = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    console.log(data);


    try {
        const result = await ExchangeRate.create(data, { transaction: t });
        console.log(result);

        await t.commit();
        return res.json({ status: true, message: "Exchange rate added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Exchange rate adding Exception: " + e });
    }
}

const getAllVendors = async (req, res) => {
    const data = req.body;

    try {

        const result = await ExchangeQuote.findAll();

        return res.json({ status: true, message: "Exchange fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "Exchange fetched Exception", error: e.message });
    }
}


module.exports = {
    addVendor,
    addRate,
    getAllVendors
}