const express=require('express')
const router=express.Router()
const {Getallappointment,Todayappointments}=require('../Controller/Doctor')
const authMiddleware=require('../Middleware/authMiddleware')
const checkRole=require('../Middleware/checkRole')

router.get("/Patientappointments",authMiddleware,checkRole(['doctor']),Getallappointment)
router.get("/Todayappointments",authMiddleware,checkRole(['doctor']),Todayappointments)



module.exports=router;