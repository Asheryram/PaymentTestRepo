const axios = require('axios'); // For HTTP requests to Paystack
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY; // Ensure this is set in your environment

// ------------------------------------------------------------
// 🏦 Step 1️⃣: Create Business Account & Subaccount
// ------------------------------------------------------------
exports.createSubaccount = async (req, res) => {
  try {
    const { business_name, business_email, bank_code, account_number } = req.body;

    const response = await axios.post('https://api.paystack.co/subaccount', 
      {
        business_name,
        settlement_bank: bank_code,
        account_number,
        percentage_charge: 0.25 // Adjust as needed
      }, 
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(201).json({ message: 'Subaccount created successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subaccount', error: error.message });
  }
};

// ------------------------------------------------------------
// 🛒 Step 2️⃣: User Initiates Mobile Money Payment (MoMo)
// ------------------------------------------------------------
exports.initiateMoMoPayment = async (req, res) => {
  try {
    const { email, amount, phone, provider } = req.body;

    const response = await axios.post('https://api.paystack.co/charge', 
      {
        email,
        amount: amount * 100, // Convert amount to kobo (NGN sub-units)
        phone,
        metadata: { provider },
        channel: ['mobile_money'] // Restrict payment to mobile money only
      }, 
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(200).json({ message: 'MoMo payment initiated successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error: error.message });
  }
};

// ------------------------------------------------------------
// 📦 Step 3️⃣: Receive Payment Confirmation (Webhook)
// ------------------------------------------------------------
exports.handleWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === 'charge.success' && data.status === 'success') {
      // Logic for processing payment confirmation
      // Update payment status in the database
      res.status(200).json({ message: 'Payment confirmation received successfully' });
    } else {
      res.status(400).json({ message: 'Event not handled' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing webhook', error: error.message });
  }
};

// ------------------------------------------------------------
// 🔍 Step 4️⃣: Check Status of Payment (Optional Verification)
// ------------------------------------------------------------
exports.checkTransactionStatus = async (req, res) => {
  try {
    const { reference } = req.query;

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, 
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(200).json({ message: 'Payment status retrieved', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error checking payment status', error: error.message });
  }
};

// ------------------------------------------------------------
// 📋 Step 5️⃣: View User Transaction History
// ------------------------------------------------------------
exports.getUserTransactions = async (req, res) => {
  try {
    const { email } = req.query;

    // Assume you store user transaction history in the database
    const transactions = await TransactionModel.find({ email });

    res.status(200).json({ message: 'User transactions retrieved', data: transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
};

// ------------------------------------------------------------
// 💸 Step 6️⃣: Business Requests Withdrawal
// ------------------------------------------------------------
exports.requestWithdrawal = async (req, res) => {
  try {
    const { email, amount, bank_code, account_number } = req.body;

    const response = await axios.post('https://api.paystack.co/transfer', 
      {
        source: 'balance',
        amount: amount * 100, // Convert amount to kobo (NGN sub-units)
        recipient: account_number,
        reason: 'Withdrawal request'
      }, 
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(200).json({ message: 'Withdrawal request sent successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting withdrawal', error: error.message });
  }
};

// ------------------------------------------------------------
// 💰 Step 7️⃣: Admin Checks Ecentials Account Balance
// ------------------------------------------------------------
exports.getEcentialsBalance = async (req, res) => {
  try {
    const response = await axios.get('https://api.paystack.co/balance', 
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(200).json({ message: 'Account balance retrieved', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving balance', error: error.message });
  }
};
