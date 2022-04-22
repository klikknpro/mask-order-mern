const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: {
    country_code: String,
    post_code: String,
    city: String,
    address: String,
  },
  emails: [String],
  taxcode: String,
  iban: String,
  swift: String,
  account_number: String,
  phone: String,
  general_ledger_number: String,
  tax_type: String,
  custom_billing_settings: {
    payment_method: String,
    document_form: String,
    due_days: Number,
    document_currency: String,
    template_language_code: String,
    discount: {
      type: String,
      value: Number,
    },
  },
  group_member_tax_number: String,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
