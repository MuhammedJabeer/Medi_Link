import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {useFormik} from  'formik'
import * as Yup from 'yup'
import axios from '../../Axios/axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Doctor() {
 
const navigate=useNavigate()

const [isLoading, setIsLoading]=useState(false)

       const formik=useFormik({
        initialValues:{
              email:"",
              password:"",
              confirmpassword:"",
              fullname:"",
              specialization:"",
              medicallicenseNumber:"",

        },validationSchema:Yup.object({
           email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    )
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 6+ characters"
    )
    .required("Password is required"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  fullname: Yup.string()
    .matches(
      /^[A-Za-z\s]{3,}$/,
      "Full name must be at least 3 letters and contain only alphabets"
    )
    .required("Full name is required"),

  specialization: Yup.string()
    .matches(
      /^[A-Za-z\s]{3,}$/,
      "Specialization must contain only letters and be at least 3 characters"
    )
    .required("Specialization is required"),

  medicallicenseNumber: Yup.string()
    .matches(
      /^[A-Z0-9-]{6,20}$/,
      "License number must be 6–20 characters (uppercase letters, numbers, or hyphens)"
    )
    .required("Medical license number is required"),
        }),
        onSubmit:async(values,{resetForm})=>{
          setIsLoading(true)
          console.log("doctor",values);
          try {
                
           const res=await axios.post("/registerdoctor",values,{withCredentials: true})
           console.log(res.data.message);
            const email=res.data.email
            localStorage.setItem("email",email)
           resetForm()
           toast("Registerd Successfully Otp sended to Email")
           navigate('/Verification')
          } catch (error) {
            
          }finally{
            setIsLoading(false)
          }
        }
       })




  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8"
      >
        <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
      </motion.div>

      {/* Card with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Registration</h2>
          {/* <span className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">Step 1 of 3</span> */}
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Account Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                value={formik.values.email}
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="doctor@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
              {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formik.values.password}
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
              {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={formik.values.confirmpassword}
                name='confirmpassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
              {formik.touched.confirmpassword && formik.errors.confirmpassword && (
          <div className="text-red-500 text-sm">{formik.errors.confirmpassword}</div>
        )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formik.values.fullname}
                name='fullname'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Dr. John Smith"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
              {formik.touched.fullname && formik.errors.fullname && (
          <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
        )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50">
                <option value="">Select your specialty</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>Gynecology</option>
              </select>
            </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                value={formik.values.specialization}
                name='specialization'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
              {formik.touched.specialization && formik.errors.specialization && (
          <div className="text-red-500 text-sm">{formik.errors.specialization}</div>
        )}
            </div>
            </div>
          {/* </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number</label>
            <input
              type="text"
              value={formik.values.medicallicenseNumber}
              name='medicallicenseNumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="MD-123456"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
            />
            {formik.touched.medicallicenseNumber&&formik.errors.medicallicenseNumber&&(
              <div className='text-red-500 text-sm'>{formik.errors.medicallicenseNumber}</div>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Clinic Affiliation</label>
            <input
              type="text"
              placeholder="City General Hospital"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
            />
          </div> */}

          {/* Form Actions */}
           <div className="pt-4">
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
                          'Complete Registration'
                        )}
                      </motion.button>
                    </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Doctor