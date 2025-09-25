const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const User = require("../models/user");

const addUser = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await User.create(data, { transaction: t });

        await t.commit();
        return res.json({ status: true, message: "User added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "User Adding Exception: " + e });
    }
}

const getUser = async (req, res) => {
    const data = req.body;

    try {

        const result = await User.findAll();

        return res.json({ status: true, message: "User fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "User fetched Exception", error: e.message });
    }
}


module.exports = {
    addUser,
    getUser,
}