const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  billingo_id: Number,
  invoice_number: String,
  block_id: Number,
  payment_method: String,
  gross_total: Number,
  invoice_date: String,
  partner: {
    id: Number,
    name: String,
  },
  items: { id: Number, name: String, quantity: Number },
  comment: String,
});
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;

/*

*/
