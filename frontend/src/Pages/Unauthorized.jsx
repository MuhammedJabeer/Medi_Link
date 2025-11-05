import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate=useNavigate()
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-gray-100 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center border border-gray-100"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <ShieldAlert className="h-16 w-16 text-teal-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
          <br />
          Please login with the correct account.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-md bg-teal-600 text-white font-medium shadow hover:bg-teal-700 transition"
          >
            Go Back
          </NavLink>
          {/* <NavLink
            to="/Signin"
            className="px-6 py-2.5 rounded-md border border-teal-600 text-teal-600 font-medium hover:bg-teal-50 transition"
          >
            Sign In
          </NavLink> */}
        </div>
      </motion.div>
    </div>
  );
}
