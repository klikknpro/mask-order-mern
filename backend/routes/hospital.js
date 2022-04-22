const router = require("express").Router();
const Hospital = require("../models/hospital");

// get hospitals from MongoDB
router.get("/all", async (req, res) => {
  try {
    const response = await Hospital.find();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json("Error:" + err);
  }
});

module.exports = router;
