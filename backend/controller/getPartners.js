require("dotenv").config();
const http = require("axios").default;
const Hospital = require("../models/hospital");

const getPartners = async () => {
  try {
    const response = await http.get("https://api.billingo.hu/v3/partners?page=1&per_page=25", {
      headers: {
        "X-API-KEY": process.env.API_Key,
      },
    });
    const hospitalsBillingo = response.data.data;
    Hospital.collection.insertMany(hospitalsBillingo, function (err, docs) {
      if (err) console.log(err);
      console.log("Multiple documents inserted into hospitals collection");
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = getPartners;
