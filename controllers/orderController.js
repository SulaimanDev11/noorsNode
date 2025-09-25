const { sequelize } = require('../config/db');
const { literal, QueryTypes } = require('sequelize');
const Order = require("../models/order");
const Transactions = require("../models/transaction");
const Ledger = require("../models/ledger");
const Accounts = require("../models/accounts");

// helper to create double-entry
async function createTransactionWithLedger({ t, type, amount, debitAccountId, creditAccountId, source, reference }) {

    const transaction = await Transactions.create({
        type,
        source,
        amount,
        reference_table: reference?.table || null,
        reference_id: reference?.ref_id || null,
        payment_method: reference?.payment_method || null,
        received_by_uid: reference?.received_by_uid,
        description: reference?.description,
        uid: reference?.uid,
    }, { transaction: t });

    await Ledger.bulkCreate([
        {
            transaction_id: transaction.id,
            account_id: debitAccountId,
            entry_type: 'debit',
            amount,
            reference_table: reference?.table,
            order_id: reference?.id,
            source,
            entry_date: new Date(),

        },
        {
            transaction_id: transaction.id,
            account_id: creditAccountId,
            entry_type: 'credit',
            amount,
            reference_table: reference?.table,
            order_id: reference?.id,
            source,
            entry_date: new Date(),
        }
    ], { transaction: t });

    return transaction;
}

const createOrder = async (req, res) => {
    const data = req.body;
    const { total_amount, paid_amount = 0, cid, uid } = data;

    const t = await sequelize.transaction();
    Accounts.create();

    try {

        // 1. create order
        const order = await Order.create(data, { transaction: t });

        // 2. create transaction + ledger
        if (total_amount && total_amount > 0) {
            // accounts (for example IDs, you can map dynamically later)
            const CASH_ACCOUNT_ID = 1;
            const RECEIVABLE_ACCOUNT_ID = 2;
            const SALES_REVENUE_ACCOUNT_ID = 4;

            if (paid_amount > 0 && paid_amount < total_amount) {
                // partial payment
                // (1) Cash part
                await createTransactionWithLedger({
                    t,
                    type: 'income',
                    amount: paid_amount,
                    debitAccountId: CASH_ACCOUNT_ID,
                    creditAccountId: SALES_REVENUE_ACCOUNT_ID,
                    source: 'order_payment_partial',
                    reference: { table: 'Orders', id: order.id, order_id: order.id, uid }
                });

                // (2) Receivable part
                await createTransactionWithLedger({
                    t,
                    type: 'income',
                    amount: total_amount - paid_amount,
                    debitAccountId: RECEIVABLE_ACCOUNT_ID,
                    creditAccountId: SALES_REVENUE_ACCOUNT_ID,
                    source: 'order_credit_partial',
                    reference: { table: 'Orders', id: order.ref_id, order_id: order.id, uid }
                });
            } else if (paid_amount >= total_amount) {
                // full payment immediately
                await createTransactionWithLedger({
                    t,
                    type: 'income',
                    amount: total_amount,
                    debitAccountId: CASH_ACCOUNT_ID,
                    creditAccountId: SALES_REVENUE_ACCOUNT_ID,
                    source: 'order_payment_full',
                    reference: { table: 'Orders', id: order.id, order_id: order.id, uid }
                });
            } else {
                // full credit sale
                await createTransactionWithLedger({
                    t,
                    type: 'income',
                    amount: total_amount,
                    debitAccountId: RECEIVABLE_ACCOUNT_ID,
                    creditAccountId: SALES_REVENUE_ACCOUNT_ID,
                    source: 'order_credit_full',
                    reference: { table: 'Orders', id: order.id, order_id: order.id, uid }
                });
            }
        }

        await t.commit();
        return res.json({ status: true, message: "Order created successfully", data: order });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Order Creation Exception: " + e });
    }
};

const receivePayment = async (req, res) => {
    const { order_id, customer_id, amount, payment_method, uid } = req.body;

    const t = await sequelize.transaction();

    try {
        // fetch order (optional, to validate)
        const order = await Order.findByPk(order_id);
        if (!order) {
            await t.rollback();
            return res.status(404).json({ status: false, message: "Order not found" });
        }

        // Accounts (replace with dynamic lookup from Accounts table later)
        const CASH_ACCOUNT_ID = 1;
        const RECEIVABLE_ACCOUNT_ID = 2;

        // create transaction + ledger
        await createTransactionWithLedger({
            t,
            type: 'income',
            amount,
            debitAccountId: CASH_ACCOUNT_ID,
            creditAccountId: RECEIVABLE_ACCOUNT_ID,
            source: 'order_payment_received',
            reference: { table: 'Orders', id: order.id, order_id: order.id, uid, payment_method }
        });

        await t.commit();
        return res.json({ status: true, message: "Payment recorded successfully" });
    } catch (e) {
        await t.rollback();
        res.status(500).json({ status: false, message: "Payment Entry Exception: " + e });
    }
};

const getPending = async (req, res) => {
    const data = req.body;

    try {

        const result = await Order.findAll({ where: { status: 'Pending' || 'Partial' } });

        return res.json({ status: true, message: "Pending orders fetched successfully", data: result });

    } catch (e) {
        res.status(500).json({ status: false, message: "Pending orders fetched Exception", error: e.message });
    }
}

module.exports = {
    createOrder,
    receivePayment,
    getPending,
};
