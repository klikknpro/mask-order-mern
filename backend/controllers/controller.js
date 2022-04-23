const http = require("axios");
const Hospital = require("../models/hospital");
const Invoice = require("../models/invoice");

// insert hospitals into Mongo (fetched from Billingo)
const insertHospitals = (hospitalsBillingo) => {
  for (const hospital of hospitalsBillingo) {
    const newHospital = new Hospital({
      billingo_id: hospital.id,
      name: hospital.name,
      address: {
        country_code: hospital.address.country_code,
        post_code: hospital.address.post_code,
        city: hospital.address.city,
        address: hospital.address.address,
      },
      emails: hospital.emails,
      taxcode: hospital.taxcode,
      iban: hospital.iban,
      swift: hospital.swift,
      account_number: hospital.account_number,
      phone: hospital.phone,
      tax_type: hospital.tax_type,
    });
    newHospital.save((err) => {
      if (err) console.log(err);
    });
  }
};

// insert invoices into Mongo (fetched from Billingo)
const insertInvoices = (invoicesBillingo) => {
  for (const invoice of invoicesBillingo) {
    const newInvoice = new Invoice({
      billingo_id: invoice.id,
      invoice_number: invoice.invoice_number,
      block_id: invoice.block_id,
      payment_method: invoice.payment_method,
      gross_total: invoice.gross_total,
      invoice_date: invoice.invoice_date,
      partner: {
        id: invoice.partner.id,
        name: invoice.partner.name,
      },
      items: invoice.items,
      comment: invoice.comment,
    });
    newInvoice.save((err) => {
      if (err) console.log(err);
    });
  }
};

const queryAllHospitals = async (req, res) => {
  try {
    const query = await Hospital.find();
    return res.status(200).json(query);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
};

const queryHospitalsById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Hospital.find({ billingo_id: id });
    return res.status(200).json(query);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
};

const queryAllInvoices = async (req, res) => {
  try {
    const response = await Invoice.find();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
};

const queryInvoicesById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Invoice.find({ billingo_id: id });
    return res.status(200).json(query);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
};

const queryInvoicesByPartner = async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Invoice.find({ "partner.id": id });
    return res.status(200).json(query);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
};

const newOrder = async (req, res) => {
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
    const response = await http.post("https://api.billingo.hu/v3/documents", newOrder, {
      headers: {
        "X-API-KEY": "e1938dbc-bfec-11ec-ab27-0254eb6072a0",
      },
    });
    const invoice = response.data;
    const newInvoice = new Invoice({
      billingo_id: invoice.id,
      invoice_number: invoice.invoice_number,
      block_id: invoice.block_id,
      payment_method: invoice.payment_method,
      gross_total: invoice.gross_total,
      invoice_date: invoice.invoice_date,
      partner: {
        id: invoice.partner.id,
        name: invoice.partner.name,
      },
      items: [
        {
          id: invoice.items[0].id,
          name: invoice.items[0].name,
          quantity: invoice.items[0].quantity,
        },
      ],
      comment: invoice.comment,
    });
    newInvoice.save((err) => {
      if (err) return console.log(err);
    });

    return res.status(response.status).json("Megrendeles elkuldve!");
  } catch (err) {
    console.log(err);
  }
};

exports.insertHospitals = insertHospitals;
exports.insertInvoices = insertInvoices;
exports.queryAllHospitals = queryAllHospitals;
exports.queryHospitalsById = queryHospitalsById;
exports.queryAllInvoices = queryAllInvoices;
exports.queryInvoicesById = queryInvoicesById;
exports.queryInvoicesByPartner = queryInvoicesByPartner;
exports.newOrder = newOrder;

/*

 */
