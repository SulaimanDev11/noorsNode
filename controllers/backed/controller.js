const { sequelize } = require('../../config/dbconnection');
const { literal, QueryTypes } = require('sequelize');
const jwt = require("../../helper/jwt");
const bcrypt = require('bcrypt');
const User = require("../../models/ims_admin/users");

//Business Partner
const BPM1 = require("../models/ims_admin/bp_master/bpm1");
const BPM2 = require("../models/ims_admin/bp_master/bpm2");

//Account Payable Invoice
const OAPI = require("../../models/ims_admin/ap_invoice/oapi");
const API1 = require("../../models/ims_admin/ap_invoice/api1");

//Items
const OIM = require("../../models/ims_admin/item_master/oim");

//Branches
const OBM = require("../../models/ims_admin/branch_master/obm");

//Warehouse
const OWM = require("../../models/ims_admin/warehose_master/owm");

//Cashbook
const OCB = require("../../models/ims_admin/cash_book/ocb");
const CB1 = require("../../models/ims_admin/cash_book/cb1");



const login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ where: { UserName: userName } });

        if (user) {

            const isPasswordMatch = await bcrypt.compare(password, user.Password);

            if (isPasswordMatch) {
                const result = await jwt.generateToken({ user })
                res.status(200).json({ status: true, message: "Successfully Login", loginData: user, tokken: result });
            } else {
                res.status(401).json({ status: false, message: "Wrong Credentials" });
            }
        } else {
            res.status(401).json({ status: false, message: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ status: false, message: "Login Exception: " + e });
    }
}

//Business Partner
const createBusinessPartner = async (req, res) => {
    const OBPMdata = req.body.OBPM;
    const BPM1data = req.body.BPM1;
    const BPM2data = req.body.BPM2;

    const t = await sequelize.transaction();

    try {
        // Create OBPM record and get its ID
        const obpmResult = await OBPM.create(OBPMdata, { transaction: t });
        const obpmCode = obpmResult.Code;

        // Add OBPM ID to BPM1data and BPM2data
        const updatedBPM1data = BPM1data.map(item => ({
            ...item,
            OBPMCode: obpmCode // Add the OBPM ID to BPM1 records
        }));
        const updatedBPM2data = BPM2data.map(item => ({
            ...item,
            OBPMCode: obpmCode // Add the OBPM ID to BPM2 records
        }));

        // Insert BPM1 and BPM2 records
        await BPM1.bulkCreate(updatedBPM1data, { transaction: t });
        await BPM2.bulkCreate(updatedBPM2data, { transaction: t });

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Business Partner created successfully", data: [req.body] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Business Partner Exception: " + e });
    }
}

const searchBusinessPartner = async (req, res) => {

    try {
        const result = await sequelize.query(`
            SELECT (
                SELECT obpm.*,
    
                (SELECT * 
                FROM ims.dbo.BPM1 
                WHERE OBPMCode = obpm.Code 
                FOR JSON AUTO) AS FocalPerson,
    
                (SELECT * 
                FROM ims.dbo.BPM2 
                WHERE OBPMCode = obpm.Code 
                FOR JSON AUTO) AS Addresses
    
                FROM ims.dbo.OBPM obpm
                FOR JSON AUTO
            ) AS Parent;`, { type: sequelize.SELECT });

        if (result[0][0]['Parent']) {
            const jsonData = JSON.parse(result[0][0].Parent);
            return res.json({ status: true, message: 'Record found successfully', data: jsonData });
        }
        return res.json({ status: true, message: "There is no record for Business Partner", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Business Partner Exception: " + e });
    }
}

const getAllBusinessPartner = async (req, res) => {
    
    try {
        const result = await OBPM.findAll({attributes:['Code', 'BPName', 'TRNnumber']});

        if (result.length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Business Partner", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Business Partner Exception: " + e });
    }
}

const getAllDeliveryAddresses = async (req, res) => {
    
    try {
        const result = await BPM1.findAll({
            attributes: [
              'Code',
              [literal("CONCAT(Address1, ' ', Address2, ' ', Address3)"), 'Address']
            ],
            where: {
              OBPMCode:req.query.BPCode
            }
          });

        if (result.length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Delivery Addresses", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Delivery Addresses Exception: " + e });
    }
}

//Invoice
const createInvoice = async (req, res) => {
    const OAPIdata = req.body.Parent;
    const API1data = req.body.Child;

    const t = await sequelize.transaction();

    try {
        const oapiResult = await OAPI.create(OAPIdata, { transaction: t });
        const oapiCode = oapiResult.Code;

        const updatedAPI1data = API1data.map(item => ({
            ...item,
            OAPICode: oapiCode
        }));

        await API1.bulkCreate(updatedAPI1data, { transaction: t });

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Invoice created successfully", data: [req.body] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Invoice Exception: " + e });
    }
}

const searchInvoice = async (req, res) => {

    try {
        const result = await sequelize.query(`
            SELECT (
                SELECT oapi.*,
    
                (SELECT * 
                FROM ims.dbo.api1 
                WHERE OAPICode = obpm.Code 
                FOR JSON AUTO) AS Child,
    
                FROM ims.dbo.OAPI oapi
                FOR JSON AUTO
            ) AS Parent;`, { type: sequelize.SELECT });

        if (result[0][0]['Parent']) {
            const jsonData = JSON.parse(result[0][0].Parent);
            return res.json({ status: true, message: 'Record found successfully', data: jsonData });
        }
        return res.json({ status: true, message: "There is no record for Invoice", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Invoice Exception: " + e });
    }
}

//Items
const createItem = async (req, res) => {
    const OIMdata = req.body.Parent;

    const t = await sequelize.transaction();

    try {
        const result = await OIM.create(OIMdata, { transaction: t });

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Items created successfully", data: [result] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Items Exception: " + e });
    }
}

const searchItem = async (req, res) => {

    try {
        const result = await sequelize.query(
            `WITH DistinctItems AS (
                SELECT 
                    Code, ItemName, UOM, PPrice, SPrice, Currency, InventoryItem, SaleItem, 
                    PItem, QrCode, Status, createdAt, updatedAt, ItemDesc,
                    ROW_NUMBER() OVER (PARTITION BY ItemName ORDER BY createdAt) as rn,
					COUNT(*) OVER (PARTITION BY ItemName) AS TotalQty
                FROM ims.dbo.OIM
            )
            SELECT 
                Code, ItemName, UOM, PPrice, SPrice, Currency, InventoryItem,
                SaleItem, PItem, QrCode, Status, createdAt,
                updatedAt, ItemDesc, TotalQty
            FROM DistinctItems
            WHERE rn = 1;`);

        if (result[0].length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result[0] });
        }
        return res.json({ status: true, message: "There is no record for Items", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Items Exception: " + e });
    }
}

const updateItem = async (req, res) => {
    const data = req.body.Parent;

    const {Code, ...OIMdata } = data;

    const t = await sequelize.transaction();

    try {
        const result = await OIM.update(
            OIMdata, 
            {
                where: { Code:Code },
                transaction: t 
            }
        );

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Items updated successfully", data: [result] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Items Exception: " + e });
    }
}

const getAllItem = async (req, res) => {

    try {
        const result = await OIM.findAll({attributes:['Code','ItemName', 'UOM', 'SPrice', 'PPrice']});
        if (result.length > 0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Items", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Items Exception: " + e });
    }
}

//Branches
const createBranch = async (req, res) => {
    const OBMdata = req.body.Parent;

    const t = await sequelize.transaction();

    try {
        const obmResult = await OBM.create(OBMdata, { transaction: t });

        // Commit the transaction
        await t.commit();
        return res.json({ status: true, message: "Branch created successfully", data: obmResult });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Branch Exception: " + e });
    }
}

const searchBranch = async (req, res) => {
    
    try {
        const result = await sequelize.query(`
            SELECT a.*, b.WHouseName FROM ims.dbo.OBM a
            LEFT JOIN ims.dbo.OWM b ON b.code = a.WHSCode`);
        if (result[0].length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result[0] });
        }
        return res.json({ status: true, message: "There is no record for Branch Master", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Branch Exception: " + e });
    }
}

const updateBranch = async (req, res) => {
    const data = req.body.Parent;

    const {Code, ...OBMMdata } = data;

    const t = await sequelize.transaction();

    try {
        const result = await OBM.update(
            OBMMdata, 
            {
                where: { Code:Code },
                transaction: t 
            }
        );

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Branch updated successfully", data: [result] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Branch Exception: " + e });
    }
}

const getAllBranches = async (req, res) => {
    
    try {
        const result = await OBM.findAll({attributes:['Code','BName']});

        if (result.length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Branches", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Branches Exception: " + e });
    }
}

///Warehouse
const createWarehouse = async (req, res) => {
    const OWMdata = req.body.Parent;

    const t = await sequelize.transaction();

    try {
        const owmResult = await OWM.create(OWMdata, { transaction: t });

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Warehouse created successfully", data: owmResult });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Warehouse Exception: " + e });
    }
}

const searchWarehouse = async (req, res) => {

    try {
        const result = await OWM.findAll();
        if (result.length > 0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Warehouse", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Warehouse Exception: " + e });
    }
}

const updateWarehouse = async (req, res) => {
    const data = req.body.Parent;

    const {Code, ...OWMdata } = data;

    const t = await sequelize.transaction();

    try {
        const result = await OWM.update(
            OWMdata, 
            {
                where: { Code:Code },
                transaction: t 
            }
        );

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Warehouse updated successfully", data: [result] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Warehouse Exception: " + e });
    }
}

const getAllWarehouse = async (req, res) => {
    
    try {
        const result = await OWM.findAll({attributes:['Code','WHouseName']});

        if (result.length>0) {
            return res.json({ status: true, message: 'Record found successfully', data: result });
        }
        return res.json({ status: true, message: "There is no record for Warehouse", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Warehouse Exception: " + e });
    }
}

//Cashbook
const createCashbook = async (req, res) => {
    const OCBdata = req.body.Parent;
    const CB1data = req.body.Child;

    const t = await sequelize.transaction();

    try {
        const ocbResult = await OCB.create(OCBdata, { transaction: t });
        const ocbCode = ocbResult.Code;

        const updatedCB1data = CB1data.map(item => ({
            ...item,
            OCBCode: ocbCode
        }));

        await CB1.bulkCreate(updatedCB1data, { transaction: t });

        // Commit the transaction
        await t.commit();

        return res.json({ status: true, message: "Cashbook created successfully", data: [req.body] });
    } catch (e) {
        // Rollback the transaction in case of an error
        await t.rollback();
        res.status(500).json({ status: false, message: "Cashbook Exception: " + e });
    }
}

const searchCashbook = async (req, res) => {

    try {
        const result = await sequelize.query(`
            SELECT (
                SELECT ocb.*,
    
                (SELECT * 
                FROM ims.dbo.CB1 
                WHERE OCBCode = ocb.Code 
                FOR JSON AUTO) AS Child,
    
                FROM ims.dbo.OCB ocb
                FOR JSON AUTO
            ) AS Parent;`, { type: sequelize.SELECT });

        if (result[0][0]['Parent']) {
            const jsonData = JSON.parse(result[0][0].Parent);
            return res.json({ status: true, message: 'Record found successfully', data: jsonData });
        }
        return res.json({ status: true, message: "There is no record for cashbook", data: [] });
    } catch (e) {
        res.status(500).json({ status: false, message: "Cashbook Exception: " + e });
    }
}

module.exports = {
    login,
    createBusinessPartner,
    searchBusinessPartner,
    getAllBusinessPartner,
    getAllDeliveryAddresses,
    createInvoice,
    searchInvoice,
    createItem,
    searchItem,
    updateItem,
    getAllItem,
    createBranch,
    searchBranch,
    updateBranch,
    getAllBranches,
    createWarehouse,
    searchWarehouse,
    updateWarehouse,
    getAllWarehouse,
    createCashbook,
    searchCashbook,
}