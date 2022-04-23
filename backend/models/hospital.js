const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  billingo_id: Number,
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
  tax_type: String,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
