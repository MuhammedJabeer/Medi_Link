// import React from "react";
// import { ArrowLeft, Calendar, Clock, User, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react";
// import usericon from "../../assets/user-profile.webp";

// function AppointmentDetails() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <button className="flex items-center text-teal-700 hover:text-teal-800 transition-colors bg-white py-2 px-4 rounded-lg shadow-sm">
//             <ArrowLeft size={20} className="mr-2" />
//             Back
//           </button>
//           <h1 className="text-3xl font-bold text-teal-800">Appointment Details</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left - Doctor Info */}
//           <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={usericon}
//                 alt="Doctor"
//                 className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-teal-100"
//               />
//               <h2 className="text-xl font-bold text-gray-800">Dr. John Doe</h2>
//               <p className="text-teal-600">Cardiologist</p>
//               <div className="mt-4 space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center justify-center">
//                   <MapPin size={16} className="mr-2 text-teal-600" />
//                   City Hospital, Kochi
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <User size={16} className="mr-2 text-teal-600" />
//                   10 Years Experience
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right - Appointment Info */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-teal-800 mb-4">Appointment Information</h3>
//               <div className="space-y-4 text-gray-700">
//                 <div className="flex items-center">
//                   <Calendar size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Date:</span>
//                   <span className="ml-2">12 Sept 2025</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Time:</span>
//                   <span className="ml-2">10:30 AM</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FileText size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Notes:</span>
//                   <span className="ml-2">Patient has chest pain for 2 weeks</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle size={18} className="mr-3 text-green-600" />
//                   <span className="font-medium">Status:</span>
//                   <span className="ml-2 text-green-700">Booked</span>
//                 </div>
//                 <div className="flex items-center">
//                   <AlertCircle size={18} className="mr-3 text-yellow-600" />
//                   <span className="font-medium">Payment:</span>
//                   <span className="ml-2 text-yellow-700">Unpaid</span>
//                 </div>
//               </div>
//             </div>

//             {/* Patient Info */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-teal-800 mb-4">Patient Information</h3>
//               <div className="space-y-3 text-gray-700">
//                 <div className="flex items-center">
//                   <User size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Name:</span>
//                   <span className="ml-2">Muhammed Jabeer</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FileText size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Email:</span>
//                   <span className="ml-2">jabeer@example.com</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FileText size={18} className="mr-3 text-teal-600" />
//                   <span className="font-medium">Phone:</span>
//                   <span className="ml-2">+91 9876543210</span>
//                 </div>
//               </div>
//             </div>

//             {/* Extra Info */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-teal-800 mb-4">Instructions</h3>
//               <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
//                 <li>Arrive 15 minutes early for check-in</li>
//                 <li>Carry previous reports & medical history</li>
//                 <li>24-hour cancellation policy applies</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppointmentDetails;
