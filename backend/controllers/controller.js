const Hospital = require("../models/hospital");
const mongoose = require("mongoose");

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

exports.insertHospitals = insertHospitals;

/*

 */
