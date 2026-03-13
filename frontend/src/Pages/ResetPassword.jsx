import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "../Axios/axios";

function ForgotResetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset password
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(60);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      otp: Yup.string().when("email", {
        is: () => step === 2,
        then: (schema) => schema.required("OTP is required"),
      }),
      newPassword: Yup.string().when("email", {
        is: () => step === 2,
        then: (schema) =>
          schema.min(6, "Minimum 6 characters").required("Password is required"),
      }),
    }),
    onSubmit: async (values) => {
      if (step === 1) {
        handleSendOtp();
      } else {
        handleResetPassword(values);
      }
    },
  });

  // Send OTP
  const handleSendOtp = async () => {
    try {
      await axios.post("/forgotpassword", { email: formik.values.email });
      toast.success("OTP sent to your email");
      setStep(2);
      setTimer(60);
      setResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    }
  };

  // Reset Password
  const handleResetPassword = async (values) => {
    try {
      await axios.post("/resetpassword", values);
      toast.success("Password reset successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    }
  };

  // Timer Effect
  useEffect(() => {
    let countdown;
    if (step === 2 && !resend && timer > 0) {
      countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResend(true);
    }

    return () => clearTimeout(countdown);
  }, [timer, resend, step]);

  // Resend OTP
  const handleResend = async (e) => {
    e.preventDefault();
    if (!resend) return;

    try {
      await axios.post("/Resend", { email: formik.values.email });
      toast.success("OTP resent successfully");
      setResend(false);
      setTimer(60);
    } catch (error) {
      toast.error("Error resending OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-teal-800">MediLink</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>
        <p className="text-gray-500 mb-6">
          {step === 1
            ? "Enter your email to receive OTP"
            : "Enter OTP and new password"}
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <input
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg bg-gray-50"
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={step === 2}
          />

          {/* OTP + Password only in step 2 */}
          {step === 2 && (
            <>
              <input
                name="otp"
                placeholder="OTP"
                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                onChange={formik.handleChange}
                value={formik.values.otp}
              />

              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
              />
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg shadow-md"
          >
            {step === 1 ? "Send OTP" : "Reset Password"}
          </motion.button>

          {/* Resend Option */}
          {step === 2 && (
            <div className="text-sm mt-2">
              Didn’t get the code?{" "}
              <button
                onClick={handleResend}
                disabled={!resend}
                className={`font-medium ${
                  resend
                    ? "text-teal-600 hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {resend ? "Resend OTP" : `Resend in ${timer}s`}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotResetPassword;