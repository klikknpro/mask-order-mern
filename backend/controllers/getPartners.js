require("dotenv").config();
const http = require("axios");

const getPartners = async () => {
  try {
    const response = await http.get("https://api.billingo.hu/v3/partners", {
      headers: {
        "X-API-KEY": process.env.API_Key,
      },
    });
    const hospitalsBillingo = response.data.data;
    return hospitalsBillingo;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getPartners;
