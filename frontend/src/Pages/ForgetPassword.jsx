import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "../Axios/axios";

function ForgetPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/forgotpassword", values);
        toast.success("OTP sent to your email");
        navigate("/ResetPassword");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Forgot Password</h2>
        <p className="text-gray-500 mb-6">Enter your email to receive OTP</p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-gray-50"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg shadow-md"
          >
            Send OTP
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <NavLink to="/" className="text-teal-600 hover:underline">
            Back to Login
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;