import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { Calendar, Clock, User, Mail, FileText, ArrowLeft, Star, MapPin, Heart, Award, Clock as TimeIcon, Shield } from "lucide-react";
import usericon from '../../assets/user-profile.webp'
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Axios/axios";

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const location=useLocation();
  const {doctor}=location.state|| {}
  
  
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    
    date: "",
   
    notes: "",
  });

  const [errors, setErrors] = useState({});



  const fetchDoctorInfo=async()=>{
         try {
          await new Promise(resolve => setTimeout(resolve, 500));

          setDoctorInfo(doctor)
         
               
         } catch (error) {
          
         }
  }
  useEffect(()=>{
    fetchDoctorInfo()
  },[doctorId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    
    if (!formData.date) newErrors.date = "Date is required";
   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const appointmentData = {
        doctorId,
        dateTime:formData.date,
        notes: formData.notes,
        patientId:user._id , 
        amount: doctorInfo.fee || 500, 
        method: "upi", 
      };
      
      console.log("Submitting appointment:", appointmentData);
      
      // await new Promise(resolve => setTimeout(resolve, 1500));

      const res=await axios.post("/appoinment",appointmentData,{withCredentials:true})

       const { orderId, key, amount } = res.data;


       const options = {
      key,
      amount,
      currency: "INR",
      name: "MediLink",
      description: "Doctor Appointment Payment",
      order_id: orderId,
      handler: async function (response) {
        // 3️⃣ Verify payment after success
        const verifyRes = await axios.post("/verifypayment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }, { withCredentials: true });

        if (verifyRes.data.success) {
          alert("Appointment booked & Payment Successful ✅");
          navigate("/board");
        } else {
          alert("Payment verification failed ❌");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone || "9999999999",
      },
      theme: {
        color: "#14b8a6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

      // console.log(res.data);
      // setFormData({date:"",notes:""})
      
      // alert("Appointment booked successfully!");

      // navigate("/board")
      
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
     today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();

    maxDate.setDate(maxDate.getDate() + 90);
    return maxDate.toISOString().split('T')[0];
  };

  if (!doctorInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-700 hover:text-teal-800 transition-colors bg-white py-2 px-4 rounded-lg shadow-sm"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info & Next Available */}
          <div className="lg:col-span-1 space-y-6">
            {/* Doctor information card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <img 
                  src={doctorInfo.profileImag || usericon}
                  alt={doctorInfo.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-100"
                />
                <h2 className="text-2xl font-bold text-gray-800">{doctorInfo.name}</h2>
                <p className="text-teal-600 font-medium">{doctorInfo.
specialization}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(doctorInfo.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      {doctorInfo.rating} ({doctorInfo.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 w-full space-y-3">
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="mr-3 text-teal-600" />
                    <span className="text-sm">{doctorInfo.address|| "newww"}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Award size={18} className="mr-3 text-teal-600" />
                    <span className="text-sm">{doctorInfo.experience} experience</span>
                  </div>
                  
                  {/* <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Heart size={18} className="mr-3 text-teal-600" />
                    <span className="text-sm">{doctorInfo.education}</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Next available appointment */}
            <div className="bg-teal-50 rounded-xl shadow-lg p-6 border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
                <TimeIcon size={20} className="mr-2" />
                Next Available
              </h3>
              <p className="text-teal-700 font-medium">{doctorInfo.nextAvailable|| "10.00 pm"}</p>
              <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition">
                Book This Slot
              </button>
            </div>

            {/* Why choose us section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Secure & Confidential</h4>
                    <p className="text-sm text-gray-600">Your data is protected with industry-standard encryption</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Our team is always available to assist you</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-800">No Hidden Fees</h4>
                    <p className="text-sm text-gray-600">Transparent pricing with no surprises</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Appointment Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-teal-800 mb-2">Book Your Appointment</h2>
              <p className="text-gray-600 mb-6">Fill in your details to schedule an appointment with {doctorInfo.name}</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  {/* <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div> */}

                  {/* Email Field */}
                  {/* <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div> */}

                  {/* Date Field */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className={`pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                  </div>

                  {/* Time Field */}
                  {/* <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select a time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                  </div> */}
                </div>

                {/* Notes Field */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      id="notes"
                      name="notes"
                      placeholder="Any symptoms, concerns, or questions for the doctor"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Confirm Appointment'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Additional information */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">What to expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">You'll receive a confirmation email with appointment details</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Please arrive 15 minutes before your scheduled appointment time</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Bring your ID and insurance card if applicable</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">24-hour cancellation policy applies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;