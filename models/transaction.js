const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  amount: { type: Number, required: true },
  reference: { type: String, required: true, unique: true },
  status: { type: String, default: 'pending' },
  payment_method: { type: String, required: true }, // momo, card, etc.
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
