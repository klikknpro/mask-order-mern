const router = require("express").Router();
const { queryAllInvoices, queryInvoicesById, queryInvoicesByPartner } = require("../controllers/controller");

// get all invoices from MongoDB
router.get("/all", queryAllInvoices);
router.get("/id/:id", queryInvoicesById);
router.get("/partner/:id", queryInvoicesByPartner);

// find invoices based on partner id
// router.get("/all/id", async (req, res) => {
//   const partnerid = req.headers.partnerid;
//   try {
//     const response = await Invoice.find({ "partner.id": partnerid }, "gross_total partner.name invoice_number items");
//     return res.status(200).json(response);
//   } catch (err) {
//     return res.status(400).json("Error:" + err);
//   }
// });

// receiving a post request from the Front-End
router.post("/new_order", async (req, res) => {
  // date calculator
  const today = new Date().toISOString().split("T")[0];
  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
  };
  const dueDate = addDays(today, 15);

  // json to send to Billingo
  const newOrder = {
    partner_id: req.body.partnerId, // FE-rol erkezik
    block_id: 146322,
    bank_account_id: 121689,
    type: "invoice",
    fulfillment_date: today,
    due_date: dueDate,
    payment_method: "aruhitel",
    language: "hu",
    currency: "HUF",
    electronic: false,
    paid: false,
    items: [
      {
        product_id: 10111622,
        quantity: req.body.quantity, // FE-rol erkezik
      },
    ],
    comment: req.body.comment, // FE-rol erkezik
  };

  try {
    const invoice = await http.post("https://api.billingo.hu/v3/documents", newOrder, {
      headers: {
        "X-API-KEY": "e1938dbc-bfec-11ec-ab27-0254eb6072a0",
      },
    });

    const newInvoice = new Invoice(invoice.data);
    newInvoice.save((err) => {
      if (err) return console.log(err);
    });

    return res.status(invoice.status).json("Megrendeles elkuldve!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
