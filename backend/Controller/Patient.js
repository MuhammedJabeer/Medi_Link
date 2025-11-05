const Doctor=require('../modals/Doctor')
const Patient=require('../modals/Patients')
const Appointment=require('../modals/Appointments')
const transporter=require('../connect/Email')
const appointmentTemplate = require('../utilits/appointmentTemplate')
const crypto=require('crypto')
const razorpay=require('../connect/razorpay')
const Payment=require('../modals/Payment')


const startHour = 9; // 9 AM
const endHour = 17; // 5 PM
const slotDurationMinutes = 15;




exports.ListDoctor=async(req,res)=>{
    try {

        const doctor=await Doctor.find()
        console.log(doctor);
        
        if(!doctor){
            return res.status(400).json({messagge:"Not Doctor Founded"})
        }

         return res.status(201).json({doctor})


    } catch (error) {
        
    }
}





exports.Bookappoinments=async(req,res)=>{
    try {
        const {patientId,doctorId,dateTime,status,notes,paymentStatus,amount,method}=req.body
        console.log(req.body);

      
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: "Patient or Doctor not found" });
    }

     const totalSlots = ((endHour - startHour) * 60) / slotDurationMinutes;

     const selectedDate = new Date(dateTime);
     selectedDate.setHours(0, 0, 0, 0);

     const today = new Date();
    today.setHours(0, 0, 0, 0);


    if (selectedDate.getTime() === today.getTime()) {
      return res.status(400).json({
        message: "Same-day bookings are not allowed. Please choose a future date.",
      });
    }


      await Appointment.deleteMany({
      patientId,
      doctorId,
      status: "pending",
      paymentStatus: "pending",
      dateTime: {
        $gte: selectedDate,
        $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });

      const existingAppointment = await Appointment.findOne({
      patientId,
      doctorId,
      dateTime: {
        $gte: selectedDate,
        $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "You already have a booking with this doctor on this date.",
      });
    }

      const appointmentsCount = await Appointment.countDocuments({
      doctorId,
      dateTime: {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectedDate.setHours(23, 59, 59, 999)),
      },
    });

    if (appointmentsCount >= totalSlots) {
      return res
        .status(400)
        .json({ message: "All slots are full for this doctor on the selected date." });
    }

    const tokenNumber = appointmentsCount + 1;

    const appointmentTime = new Date(dateTime);
    const minutesToAdd = (tokenNumber - 1) * slotDurationMinutes;
    appointmentTime.setHours(startHour + Math.floor(minutesToAdd / 60));
    appointmentTime.setMinutes(minutesToAdd % 60);
    appointmentTime.setSeconds(0);
    appointmentTime.setMilliseconds(0);

        
        const appointment=new Appointment({
            patientId,
            doctorId,
            dateTime:appointmentTime,
           status: "pending",
            notes,
            paymentStatus,
            token:tokenNumber
        })

        await appointment.save()
     
        
        
         const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `appt_${appointment._id}`,
    };



    const order = await razorpay.orders.create(options);

     const payment = new Payment({
      userId: patientId,
      appointmentId: appointment._id,
      amount,
      status: "pending",
      method,
      transactionId: order.id,
    });
     
     await payment.save();

    res.status(200).json({
      success: true,
      appointmentId: appointment._id,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    });

         
         
    //       const mailOptions = {
    //       from: process.env.EMAIL_USER, 
    //       to: patient.email,
    //       subject: "Appointment Confirmation",
    //   html:appointmentTemplate({ patient, doctor, dateTime, status, notes})
    // };

    //  transporter.sendMail(mailOptions, (err, info) => {
    //   if (err) console.error("Email error:", err);
    //   else console.log("Email sent:", info.response);
    // });

    //     return res.status(201).json({messagge:"Appointment Booked successfully"})

    } catch (error) {
            console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}





exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // 1️⃣ Update Payment
      const payment = await Payment.findOneAndUpdate(
        { transactionId: razorpay_order_id },
        { status: "success" },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      // 2️⃣ Update Appointment
      const appointment = await Appointment.findByIdAndUpdate(
        payment.appointmentId,
        { paymentStatus: "paid", status: "booked" },
        { new: true }
      ).populate("patientId doctorId");

      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }

      // 3️⃣ Extract patient & doctor info
      const patient = appointment.patientId;
      const doctor = appointment.doctorId;
      const { dateTime, status, notes,token} = appointment;

      // 4️⃣ Send Confirmation Mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: patient.email,
        subject: "Appointment Confirmation - MediLink",
        html: appointmentTemplate({ patient, doctor, dateTime, status, notes,token }),
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("Email error:", err);
        else console.log("Email sent:", info.response);
      });

      return res.status(200).json({ success: true, message: "Payment verified & email sent" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.upcomingappointment = async (req, res) => {
  try {
    const { patientId } = req.query;

    if (!patientId) {
      return res.status(401).json({ message: "Patient not found" });
    }

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingappointments = await Appointment.find({
      patientId,
      dateTime: { $gte: today },   
    })
      .populate("doctorId", "name specialization")
      .sort({ dateTime: 1 });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const total = await Appointment.countDocuments({ patientId ,dateTime: { $gte: startOfMonth, $lt: endOfMonth }});
    console.log(total);
    
    


    const lastVisitAppointment= await Appointment.findOne({patientId,dateTime:{$lt:today}}).sort({dateTime:-1})

    const lastVisit = lastVisitAppointment ? lastVisitAppointment.dateTime : null;

    const Nextappointment=await Appointment.findOne({
      patientId,
      dateTime: { $gte: today },   
    })
      .populate("doctorId", "name specialization")
      .sort({ dateTime: 1 });

     console.log(lastVisitAppointment);
     console.log(lastVisit);
     console.log(Nextappointment);
      
     

    return res.status(200).json({ upcomingappointments,total,lastVisit,Nextappointment });

   


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};





exports.Allappointments=async(req,res)=>{
    try {
        
        const {patientId}=req.query
        console.log(req.query);


        const Listall=await Appointment.find({patientId}).populate('doctorId',"name specialization")

       if(!Listall){
         return res.status(401).json({message:"No Appointments Founded"})
       }


       return res.status(201).json({Listall})
        
        
       


    } catch (error) {
        console.log(error);
        
    }
}



