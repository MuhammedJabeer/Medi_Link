import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, CheckCircle, AlertCircle, Loader2,ArrowLeft } from "lucide-react";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AppointmentDetails() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const navigate=useNavigate()

  useEffect(() => {
  
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/Patientappointments", {
        params: { doctorId: user._id }, 
        withCredentials: true });
        console.log("appo",res.data)
        setAppointments(res.data.Listall || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user._id]);

  return (
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
        {/* Header Section with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/Dashboard")}
              className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-teal-700 flex items-center gap-2">
              <Calendar className="w-6 h-6" /> Appointment Details
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Total:{" "}
            <span className="font-semibold text-gray-700">
              {appointments.length}
            </span>
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-6 h-6 text-teal-600" />
            <span className="ml-2 text-gray-600">Loading appointments...</span>
          </div>
        ) : appointments.length === 0 ? (
          // Empty State
          <div className="text-center py-16 text-gray-500">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-400" />
            No appointments found.
          </div>
        ) : (
          // Appointment Table
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium">Patient</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr
                    key={appt._id || index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      <div className="w-9 h-9 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-semibold">
                        {appt.patientId?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appt.patientId?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appt.patientId?.email || "No email"}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {appt.notes || "Empty"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(appt.dateTime).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={appt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


function StatusBadge({ status }) {
  const base = "px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1";

  switch (status) {
    case "booked":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <CheckCircle className="w-4 h-4" /> Booked
        </span>
      );
    case "pending":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          <Clock className="w-4 h-4" /> Pending
        </span>
      );
    case "cancelled":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <AlertCircle className="w-4 h-4" /> Cancelled
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-600`}>
          <Clock className="w-4 h-4" /> Waiting
        </span>
      );
  }
}
