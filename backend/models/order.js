const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    hospitalName: String,
    orderDate: String,
    amount: Number,
    price: Number,
    VATnumber: Number,
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
