const { Transaction } = require('../models');

const createTransaction = async (req, res) => {
    try {
        const { type, amount, description, category, relatedModel, relatedId } = req.body;

        const transaction = await Transaction.create({
            type,
            amount,
            description,
            category,
            relatedModel,
            relatedId,
        });

        res.status(201).json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating transaction' });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ order: [['createdAt', 'DESC']] });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

exports.module = {
    createTransaction,
    getAllTransactions,
}