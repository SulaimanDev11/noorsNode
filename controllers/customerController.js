const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Customer = require("../models/customer");

const addCustomer = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await Customer.create(data, { transaction: t });

        await t.commit();
        return res.json({ status: true, message: "Customer added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Customer Adding Exception: " + e });
    }
}

const getAllCustomers = async (req, res) => {
    const data = req.body;

    try {

        const result = await Customer.findAll();

        return res.json({ status: true, message: "Customer fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "Customer fetched Exception", error: e.message });
    }
}


module.exports = {
    addCustomer,
    getAllCustomers
}