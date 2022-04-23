require("dotenv").config();
const http = require("axios").default;

const getInvoices = async () => {
  try {
    const response = await http.get("https://api.billingo.hu/v3/documents", {
      headers: {
        "X-API-KEY": process.env.API_Key,
      },
    });
    const invoicesBillingo = response.data.data;
    return invoicesBillingo;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getInvoices;
