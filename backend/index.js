require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT;

// controllers
const getPartners = require("./controller/getPartners");
const getInvoices = require("./controller/getInvoices");

// models
const Hospital = require("./models/hospital");
const Invoice = require("./models/invoice");

// routes
const partnerRouter = require("./routes/hospital");
const orderRouter = require("./routes/order");

app.use(cors());
app.use(express.json());

app.use("/api/partners", partnerRouter);
app.use("/api/orders", orderRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));

// empty collection
Hospital.deleteMany({}, function () {
  console.log("Hospital documents deleted");
});
Invoice.deleteMany({}, function () {
  console.log("Invoice documents deleted");
});

// fetch hospitals from billingo and upload to MongoDB
getPartners();
getInvoices();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
