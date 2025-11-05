var express = require('express');
var router = express.Router();
const {ListDoctor,Bookappoinments,upcomingappointment,Allappointments,verifyPayment}=require('../Controller/Patient')

const authMiddleware=require('../Middleware/authMiddleware')
const checkRole=require('../Middleware/checkRole')

router.get("/List",authMiddleware,checkRole(["patient"]),ListDoctor)
router.get("/upcomingappointment",authMiddleware,checkRole(["patient"]),upcomingappointment)
router.get("/Allappointments",authMiddleware,checkRole(["patient"]),Allappointments)





router.post("/appoinment",authMiddleware,checkRole(["patient"]),Bookappoinments)
router.post("/verifypayment",authMiddleware,checkRole(["patient"]),verifyPayment)

module.exports = router;
