const router = require("express").Router();
const { queryAllHospitals, queryHospitalsById } = require("../controllers/controller");

// get hospitals from MongoDB
router.get("/all", queryAllHospitals);
router.get("/id/:id", queryHospitalsById);

module.exports = router;
