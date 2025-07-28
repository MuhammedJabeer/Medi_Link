import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from '../../Axios/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Verification() {
 
  const navigate=useNavigate()

   const [isLoading, setIsLoading] = useState(false);
   const[resend,setResend]=useState(false);
   const [timer, setTimer] = useState(60);

const formik=useFormik({
  initialValues:({
    otp:""
  }),
  validationSchema:Yup.object({
    otp:Yup.string()
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
  }),
  onSubmit:async(values)=>{
    console.log(values);
      setIsLoading(true);
    try {
      const email=localStorage.getItem("email")
      
      const res=await axios.post("/Verification",{otp:values,email:email})
      console.log(res.data.role);
      localStorage.removeItem("email")
      toast.success("Verified Successfully")
      if(res.data.role==doctor){
        navigate("/pending")
      }
       navigate("/signin")
    } catch (error) {
      
    }finally{
      setIsLoading(false)
    }
    
  }
})

useEffect(() => {
  let countdown;
  if (!resend && timer > 0) {
    countdown = setTimeout(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  } else if (timer === 0) {
    setResend(true);
  }

  return () => clearTimeout(countdown);
}, [timer, resend]);



const handleresend=async(e)=>{
    e.preventDefault();
      if(!resend) return
     try {
         const email=localStorage.getItem("email")
         console.log("resend",email);
         
         const res=await axios.post("/Resend",{email})  
          toast.success("otp resended")
         setResend(false);
         setTimer(60);
         console.log(res.data.message);

     } catch (error) {
      
     }
}




  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Logo Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8"
      >
        <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-teal-800">MediLink Verification</h1>
      </motion.div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Verify Your Email</h2>
          <p className="text-gray-500">Enter the OTP sent to your email address</p>
        </div>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
            />
            {formik.touched.otp&&formik.errors.otp&&(
              <div className='text-red-500' text-sm>{formik.errors.otp}</div>
            )}
          </div>

           <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full ${
                          isLoading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                        } text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md flex items-center justify-center`}
                      >
                        {isLoading ? (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        ) : (
                          'Complete Verification'
                        )}
                      </motion.button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Didn’t get the code?{' '}
          <button
  onClick={handleresend}
  className={`font-medium ${
    resend ? "text-teal-600 hover:underline" : "text-gray-400 cursor-not-allowed"
  }`}
  disabled={!resend}
>
  {resend ? "Resend OTP" : `Resend in ${timer}s`}
</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Verification;
