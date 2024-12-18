const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentController.js');

// 🏦 Step 1️⃣: Create Business Account & Subaccount
router.post('/subaccount', paymentsController.createSubaccount);

// 🛒 Step 2️⃣: User Initiates Mobile Money Payment (MoMo)
router.post('/momo-payment', paymentsController.initiateMoMoPayment);

// 📦 Step 3️⃣: Receive Payment Confirmation (Webhook)
router.post('/webhook', paymentsController.handleWebhook);

// 🔍 Step 4️⃣: Check Status of Payment (Optional Verification)
router.get('/transaction-status', paymentsController.checkTransactionStatus);

// 📋 Step 5️⃣: View User Transaction History
router.get('/transactions', paymentsController.getUserTransactions);

// 💸 Step 6️⃣: Business Requests Withdrawal
router.post('/withdrawal', paymentsController.requestWithdrawal);

// 💰 Step 7️⃣: Admin Checks Ecentials Account Balance
router.get('/balance', paymentsController.getEcentialsBalance);

module.exports = router;
