import React from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from '../../Axios/axios';
import { useNavigate } from 'react-router-dom';
function Verification() {
 
  const navigate=useNavigate()


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
    try {
      const email=localStorage.getItem("email")
      
      const res=await axios.post("/Verification",{otp:values,email:email})
      console.log(res);
      navigate("/signin")
    } catch (error) {
      
    }
    
  }
})




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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
          >
            Verify OTP
          </motion.button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Didn’t get the code?{' '}
          <button className="font-medium text-teal-600 hover:underline">
            Resend OTP
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Verification;
