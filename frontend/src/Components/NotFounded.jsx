    // NotFound.jsx
    import React from "react";
    import { NavLink } from "react-router-dom";
    import { motion } from "framer-motion";
    import NotFoundImg from "../assets/404.gif"; 
   import { useNavigate } from "react-router-dom";

    const NotFound = () => {

        const navigate=useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <img
            src={NotFoundImg}
            alt="404 Not Found"
            className="w-64 mx-auto mb-6"
            />
            {/* <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1> */}
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-gray-700 mb-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <NavLink
             onClick={() => navigate(-1)}
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 font-medium transition-colors"
            >
            Go Back 
            </NavLink>
        </motion.div>
        </div>
    );
    };

    export default NotFound;
