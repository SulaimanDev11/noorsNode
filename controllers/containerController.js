const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Container = require("../models/container");
const ContainerImages = require("../models/containerImages");

const addContainer = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await Container.create(data, { transaction: t });
        await t.commit();
        return res.json({ status: true, message: "Container added successfully", data: result });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Container Adding Exception: " + e });
    }
}

const getAllPendingContainer = async (req, res) => {
    const data = req.body;

    try {
        const result = await Container.findAll({
            where: {
                status: 'Empty'
            }
        });
        return res.json({ status: true, message: "Container fetch successfully", data: result });
    } catch (e) {
        res.status(500).json({ status: false, message: "Container fetch Exception: " + e });
    }
}

const updateContainer = async (req, res) => {
    const data = req.body;
    const images = data.paths;

    const t = await sequelize.transaction();

    try {
        let createdImages = [];

        const lastImage = await ContainerImages.findOne({
            where: { cid: data.cid },
            order: [['id', 'DESC']], // Get the latest by ID
        });
        const nextStep = lastImage ? lastImage.step + 1 : 1;

        if (images && images.length > 0) {
            const updatedImages = images.map(item => ({
                ...item,
                uid: data.uid,
                cid: data.cid,
                type: data.type,
                status: data.status,
                description: data.description,
                step: nextStep,
            }));

            createdImages = await ContainerImages.bulkCreate(updatedImages, { transaction: t });
        }

        await t.commit();
        return res.json({ status: true, message: "Container updated successfully", data: createdImages });
    } catch (e) {
        if (!t.finished) await t.rollback(); // Safe rollback
        res.status(500).json({ status: false, message: "Container update Exception: " + e.message });
    }
}

const updateContainerFinal = async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();

    try {
        const result = await Container.update(data, { where: { container_id: data.cid } });

        await t.commit();
        return res.json({ status: true, message: "Container update successfully", data: result });

    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Container update Exception", error: e.message });
    }
}


module.exports = {
    addContainer,
    getAllPendingContainer,
    updateContainer,
    updateContainerFinal,
}