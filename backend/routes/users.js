var express = require('express');
const { patientvalidation, doctorvalidation } = require('../Middleware/Validation');
const {registerpatient,registerdoctor,Login,logout}=require('../Controller/Auth')
var router = express.Router();


router.post("/registerpatient",patientvalidation,registerpatient)
router.post("/registerdoctor",doctorvalidation,registerdoctor)
router.post("/login",Login)
router.post("/logout",logout)
module.exports = router;
