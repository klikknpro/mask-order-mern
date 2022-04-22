const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  vendor_id: {
    type: String,
    required: false,
    default: null,
  },
  partner_id: {
    type: Number,
    required: true,
  },
  block_id: {
    type: Number,
    required: true,
  },
  bank_account_id: {
    type: Number,
    required: false,
    default: null,
  },
  type: {
    type: String,
    required: true,
    default: "draft",
    lowercase: true,
  },
  fulfillment_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
    default: "elore_utalas",
  },
  language: {
    type: String,
    required: true,
    default: "hu",
    lowercase: true,
  },
  currency: {
    type: String,
    required: true,
    default: "HUF",
    uppercase: true,
  },
  conversion_rate: {
    type: Number,
    required: false,
    default: 1,
  },
  electronic: {
    type: Boolean,
    required: false,
    default: false,
  },
  paid: {
    type: Boolean,
    required: false,
    default: false,
  },
  items: [
    /*     {
      product_id: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    }, */
    {
      name: {
        type: String,
        required: true,
      },
      unit_price: {
        type: Number,
        required: true,
        default: 0,
      },
      unit_price_type: {
        type: String,
        required: true,
        default: "net",
        lowercase: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      unit: {
        type: String,
        required: true,
      },
      vat: {
        type: String,
        required: true,
        default: "27%",
        uppercase: true,
      },
      comment: {
        type: String,
        required: false,
        default: null,
      },
    },
  ],
  comment: {
    type: String,
    required: false,
    default: null,
  },
  settings: {
    mediated_service: {
      type: Boolean,
      required: false,
      default: false,
    },
    without_financial_fulfillment: {
      type: Boolean,
      required: false,
      default: false,
    },
    online_payment: {
      type: String,
      required: false,
      default: "",
    },
    round: {
      type: String,
      required: false,
      default: "none",
      lowercase: true,
    },
    place_id: {
      type: String,
      required: false,
      default: null,
    },
  },
});
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
