const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  business_email: { type: String, required: true },
  amount: { type: Number, required: true },
  bank_code: { type: String, required: true },
  account_number: { type: String, required: true },
  status: { type: String, default: 'pending' },
  reference: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
