const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Accounts = require("../models/accounts");

const addAccount = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await Accounts.create(data, { transaction: t });

        await t.commit();
        return res.json({ status: true, message: "Account added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Account Adding Exception: " + e });
    }
}

const getAccount = async (req, res) => {
    const data = req.body;

    try {

        const result = await User.findAll();

        return res.json({ status: true, message: "Account fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "Account fetched Exception", error: e.message });
    }
}


module.exports = {
    addAccount,
    getAccount,
}