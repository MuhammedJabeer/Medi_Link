import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {useFormik} from 'formik'
import * as Yup from 'yup'
// import Role from './Role'
import axios from '../../Axios/axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
function Patient() {

const [isLoading, setIsLoading] = useState(false);

  const navigate=useNavigate()
  
   const formik=useFormik({
    initialValues:{
         email:"",
         password:"",
         confirmpassword:"",
         fullname:"",
         age:"",
         gender:"",
         phonenumber:"",
         bloodgroup:""
    },
    validationSchema:Yup.object({
      email:Yup.string()
               .matches(
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              'Invalid email format'
                ).required("Email is required"),
      password:Yup.string()
               .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              'Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 6+ characters'
               ).required("password is required"),

      confirmpassword:Yup.string()
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                      .required('Confirm your password'),  
      fullname:Yup.string()
                 .matches(/^[A-Za-z\s]{3,}$/, 'Full name must contain only letters and at least 3 characters')
                 .required('Full name is required'),  
      age: Yup.string()
    .matches(/^\d{1,3}$/, 'Enter a valid age (up to 3 digits)')
    .required('Age is required'),

      gender: Yup.string()
         .oneOf(['Male', 'Female', 'Other', 'Prefer not to say'], 'Please select your gender')
         .required('Gender is required'),

     phonenumber: Yup.string()
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
         .required('Phone number is required'),

     bloodgroup: Yup.string()
         .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Please select a valid blood group')
         .required('Blood group is required'),                
    }),
    onSubmit:async(values,{ resetForm })=>{
      setIsLoading(true);
      console.log("patient",values);
      const role=localStorage.getItem("role")
        console.log(role);   
         try {
            const res=await axios.post("/registerpatient",values)
            console.log(res.data.user.email);
            const email=res.data.user.email
            localStorage.setItem("email",email)
    
            resetForm();
             toast.success("Registerd Succesfully otp Sended to email")
            navigate('/Verification')
         } catch (error) {
          
         }finally {
    setIsLoading(false);
  }

    }
   })





  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Logo with animation */}
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
        <h1 className="text-3xl font-bold text-teal-800">MediLink Patient</h1>
      </motion.div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Patient Registration</h2>
          <p className="text-gray-500">Complete your health profile</p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Authentication Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Account Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                name='email'
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
               {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                name='password'
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password&&formik.errors.password&&(
              <div className='text-red-500 text-sm'>{formik.errors.password}</div> 
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                name='confirmpassword'
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmpassword&&formik.errors.confirmpassword&&(
                <div className='text-red-500 text-sm'>{formik.errors.confirmpassword}</div>
              )}
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                name='fullname'
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullname&&formik.errors.fullname&&(
                <div className='text-red-500 text-sm'>{formik.errors.fullname}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  name='age'
                  type="number"
                  placeholder="30"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                />
                 {formik.touched.age&&formik.errors.age&&(
                <div className='text-red-500 text-sm'>{formik.errors.age}</div>
              )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                 name='gender'
                 onChange={formik.handleChange}
                 value={formik.values.gender}
                 onBlur={formik.handleBlur}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                 {formik.touched.gender&&formik.errors.gender&&(
                <div className='text-red-500 text-sm'>{formik.errors.gender}</div>
              )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                name='phonenumber'
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
              />
                {formik.touched.phonenumber&&formik.errors.phonenumber&&(
                <div className='text-red-500 text-sm'>{formik.errors.phonenumber}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50"
                 value={formik.values.bloodgroup}
                 name='bloodgroup'
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {formik.touched.bloodgroup&&formik.errors.bloodgroup&&(
                <div className='text-red-500 text-sm'>{formik.errors.bloodgroup}</div>
              )}
              
            </div>
          </div>

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

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <NavLink to="/Signin" className="text-teal-600 hover:underline font-medium">
            Sign In
          </NavLink>
        </div>
      </motion.div>
    </div>
  )
}

export default Patient