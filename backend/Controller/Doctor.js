const Appointment=require("../modals/Appointments")

exports.Getallappointment=async(req,res)=>{
    try {
        
         const {doctorId}=req.query
         console.log("id",req.query)
         if(!doctorId){
            return res.status(401).json({message:"Id Not founded"})
         }

          const Listall=await Appointment.find({doctorId}).populate('patientId',"name email")
          console.log("list",Listall)
         
                if(!Listall){
                     console.log("not founded list");
                  return res.status(401).json({message:"No Appointments Founded"})
                
                 
                }
                

                 return res.status(201).json({Listall})

    } catch (error) {
        
    }
}


exports.Todayappointments=async(req,res)=>{
    try {
        
        const{doctorId}=req.query
 
         if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }


        const Startday=new Date()
        Startday.setHours(0,0,0,0)

        const Endday=new Date()
        Endday.setHours(23, 59, 59, 999)

        const todayAppointments=await Appointment.find({doctorId,dateTime:{$gt:Startday,$lt:Endday}}).sort({dateTime:1}).populate("patientId", "name email")

          console.log(todayAppointments,todayAppointments.length)

      res.status(200).json({
      success: true,
      count: todayAppointments.length,
      data: todayAppointments
    });

    } catch (error) {
        
    }
}

