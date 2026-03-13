var express = require('express');
const { patientvalidation, doctorvalidation } = require('../Middleware/Validation');
const {registerpatient,registerdoctor,Login,logout,forgetpassword,resetpassword}=require('../Controller/Auth')
var router = express.Router();


router.post("/registerpatient",patientvalidation,registerpatient)
router.post("/registerdoctor",doctorvalidation,registerdoctor)
router.post("/login",Login)
router.post("/forgotpassword",forgetpassword)
router.post("/resetpassword",resetpassword)
router.post("/logout",logout)
module.exports = router;
