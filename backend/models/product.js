const mongoose = require("mongoose");

const maskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "FFP2/KN95",
  },
  net_unit_price: {
    type: Number,
    required: true,
    default: 100,
  },
  vat: {
    type: Number,
    required: true,
    default: 27,
  },

  unit: {
    type: String,
    required: true,
    default: "db",
  },
  comment: {
    type: String,
    required: false,
    default: null,
  },
  stock: {
    type: Number,
    required: true,
    default: 10000,
  },
});
const Mask = mongoose.model("Mask", maskSchema);

module.exports = Mask;

/*
product lekerve a billingo-rol

{
"id": 10111622,
"name": "FFP2/KN95",
"comment": "",
"currency": "HUF",
"vat": "27%",
"net_unit_price": 100,
"gross_unit_price": 127,
"unit": "db",
"general_ledger_number": "",
"general_ledger_taxcode": "",
"entitlement": null,
"ean": "",
"sku": "",
"is_manage": true,
"purchase_price": 80
}
*/
