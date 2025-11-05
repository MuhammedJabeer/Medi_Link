import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {useFormik}  from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import axios from '../../Axios/axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/authSlice'
function Signin() {

  const navigate=useNavigate()
  const dispatch = useDispatch();

      const formik=useFormik({
       initialValues:{
        email:"",
        password:""
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
       ).required("password is required")
       }),
       onSubmit:async(value)=>{
        try {
              const res=await axios.post("/login",value,{withCredentials: true})
              toast.success("success")

                dispatch(loginSuccess(res.data))
             
              console.log(res.data.user);
              if(res.data.role==="doctor"){
                        navigate("/Dashboard")
              }else{
                    navigate('/board')
              }
              // navigate('/board')
            
              
        } catch (error) {
          
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
        <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
      </motion.div>

      {/* Card with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                name='password'
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-50 pr-10"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
               {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
              <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <NavLink to="#" className="text-sm text-teal-600 hover:underline font-medium">
              Forgot password?
            </NavLink>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
          >
            Sign In
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <NavLink to="/Role" className="text-teal-600 hover:underline font-medium">
              Sign Up
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signin