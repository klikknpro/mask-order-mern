const router = require("express").Router();
const { queryAllInvoices, queryInvoicesById, queryInvoicesByPartner, newOrder } = require("../controllers/controller");

// get all invoices from MongoDB
router.get("/all", queryAllInvoices);
router.get("/id/:id", queryInvoicesById);
router.get("/partner/:id", queryInvoicesByPartner);
router.post("/new_order", newOrder);

module.exports = router;
