const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bank_code: { type: String, required: true },
  account_number: { type: String, required: true },
  subaccount_code: { type: String }
});

module.exports = mongoose.model('Business', BusinessSchema);
