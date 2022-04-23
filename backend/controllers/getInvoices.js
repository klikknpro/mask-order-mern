require("dotenv").config();
const http = require("axios").default;
const Invoice = require("../models/invoice");

const getInvoices = async () => {
  try {
    const response = await http.get("https://api.billingo.hu/v3/documents", {
      headers: {
        "X-API-KEY": process.env.API_Key,
      },
    });
    const invoicesBillingo = response.data.data;
    Invoice.collection.insertMany(invoicesBillingo, function (err, docs) {
      if (err) console.log(err);
      console.log("invoices inserted");
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = getInvoices;
