import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function PendingApproval() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-10"
      >
        <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-800 tracking-tight">MediLink</h1>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden p-10 border border-gray-200 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Registration is Under Review</h2>
        <p className="text-gray-600 text-lg">
          Thanks for signing up as a <strong className="text-teal-600">Doctor</strong> with MediLink.
        </p>

        <div className="my-6 text-gray-600 leading-relaxed space-y-3">
          <p>
            Your profile and credentials are being reviewed by our internal team to ensure the authenticity and professionalism of our platform.
          </p>
          <p>
            This process usually takes <strong>1–2 business days</strong>. You will receive a confirmation email once your account is approved.
          </p>
          <p>
            In the meantime, feel free to contact our support team if you have any questions or concerns.
          </p>
        </div>

        <div className="mt-6">
          <NavLink
            to="/signin"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            Go Back to Sign In
          </NavLink>
        </div>

        <p className="text-sm text-gray-400 mt-8">MediLink © {new Date().getFullYear()} — All rights reserved.</p>
      </motion.div>
    </div>
  );
}

export default PendingApproval;
