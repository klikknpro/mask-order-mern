require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT;

// fetch Billingo database
const getPartners = require("./controllers/getPartners");
const getInvoices = require("./controllers/getInvoices");
//controllers
const { insertHospitals, insertInvoices } = require("./controllers/controller");

// routes
const partnerRouter = require("./routes/hospital");
const orderRouter = require("./routes/order");

app.use(cors());
app.use(express.json());
// mountpoints
app.use("/api/partners", partnerRouter);
app.use("/api/invoices", orderRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// drop collections
mongoose.connection
  .dropCollection("hospitals")
  .then(() => console.log("hospitals collection deleted"))
  .catch(() => console.log("hospitals not found"));
mongoose.connection
  .dropCollection("invoices")
  .then(() => console.log("invoices collection deleted"))
  .catch(() => console.log("invoices not found"));

// fetch hospitals from billingo and upload to MongoDB
getPartners().then((data) => insertHospitals(data));
getInvoices().then((data) => insertInvoices(data));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
