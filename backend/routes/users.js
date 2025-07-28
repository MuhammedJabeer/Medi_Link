var express = require('express');
const { patientvalidation, doctorvalidation } = require('../Middleware/Validation');
const {registerpatient,registerdoctor}=require('../Controller/Auth')
var router = express.Router();


router.post("/registerpatient",patientvalidation,registerpatient)
router.post("/registerdoctor",doctorvalidation,registerdoctor)

module.exports = router;
