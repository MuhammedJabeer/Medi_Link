import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

function Role() {
  // const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleRoleSelect = (selectedRole) => {
    // setRole(selectedRole)
    localStorage.setItem("role", selectedRole);
    console.log("Selected Role:", selectedRole)
    navigate(`/${selectedRole}`) 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center mb-8">
        <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5..." />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-gray-500 mb-6">Select your role to continue</p>

        {/* Doctor */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleRoleSelect("doctor")}
          className="p-4 border-2 border-teal-100 rounded-lg cursor-pointer hover:border-teal-300 bg-gray-50 mb-4"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 text-2xl">👨‍⚕️</div>
            <div>
              <h3 className="font-semibold text-gray-800">Doctor</h3>
              <p className="text-sm text-gray-500">Register as healthcare provider</p>
            </div>
          </div>
        </motion.div>

        {/* Patient */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleRoleSelect("patient")}
          className="p-4 border-2 border-blue-100 rounded-lg cursor-pointer hover:border-blue-300 bg-gray-50"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 text-2xl">🏥</div>
            <div>
              <h3 className="font-semibold text-gray-800">Patient</h3>
              <p className="text-sm text-gray-500">Register as patient</p>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <NavLink to="/Signin" className="text-teal-600 hover:underline font-medium">
            Sign In
          </NavLink>
        </p>
      </motion.div>
    </div>
  )
}

export default Role
