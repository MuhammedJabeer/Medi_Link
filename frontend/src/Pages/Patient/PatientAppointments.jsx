import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Stethoscope,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";
import usericon from "../../assets/user-profile.webp";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PatientAppointments() {
  const navigate=useNavigate()
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const { user } = useSelector((state) => state.auth);

  
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/Allappointments", {
        params: { patientId: user._id },
        withCredentials: true,
      });
      console.log(res.data.Listall);
      setAppointments(res.data.Listall || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

 
  const filteredAppointments = (appointments || [])
    .filter((appt) => {
      if (filter === "all") return true;
      return appt.status === filter;
    })
    .filter((appt) => {
      return (
        appt.doctorId?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appt.doctorId?.specialization
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.dateTime) - new Date(b.dateTime);
      } else if (sortBy === "doctor") {
        return a.doctorId?.name?.localeCompare(b.doctorId?.name);
      }
      return 0;
    });

  // Helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case "booked":
        return <Clock size={14} className="mr-1" />;
      case "completed":
        return <CheckCircle size={14} className="mr-1" />;
      case "cancelled":
        return <XCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBack = () => {
    if (selectedAppointment) {
      setSelectedAppointment(null);
    } else {
      console.log("Navigate to previous page");
    }
  };

  const handleViewDetails = (appt) => {
    setSelectedAppointment(appt);
  };

 
  if (selectedAppointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-teal-600 hover:text-teal-800 font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Appointments
          </button>

          {/* Appointment Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">
              Appointment Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Doctor Information */}
              <div className="lg:col-span-2">
                <div className="flex items-start mb-6">
                  <img
                    src={
                      selectedAppointment.doctorId?.profileImage || usericon
                    }
                    alt={selectedAppointment.doctorId?.name}
                    className="w-20 h-20 rounded-full object-cover mr-5 border-2 border-teal-100"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {selectedAppointment.doctorId?.name}
                    </h3>
                    <p className="text-teal-600 font-medium">
                      {selectedAppointment.doctorId?.specialization}
                    </p>

                    <div className="mt-3 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Education:</span>{" "}
                        {selectedAppointment.doctorId?.education}
                      </p>
                      <p>
                        <span className="font-medium">Experience:</span>{" "}
                        {selectedAppointment.doctorId?.experience}
                      </p>
                      <p>
                        <span className="font-medium">Languages:</span>{" "}
                        {selectedAppointment.doctorId?.languages?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="bg-gray-50 rounded-lg p-5 mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    Appointment Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar
                        size={20}
                        className="mr-3 text-teal-600 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {formatDate(selectedAppointment.dateTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock
                        size={20}
                        className="mr-3 text-teal-600 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">
                          {new Date(
                            selectedAppointment.dateTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <span className="text-gray-400 text-sm ml-2">
                            ({selectedAppointment.duration})
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Stethoscope
                        size={20}
                        className="mr-3 text-teal-600 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">
                          {selectedAppointment.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="mr-3 w-5 h-5 text-teal-600 flex-shrink-0">
                        📋
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Appointment Type
                        </p>
                        <p className="font-medium">
                          {selectedAppointment.appointmentType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Reason for Visit
                  </h4>
                  <p className="text-gray-700">
                    {selectedAppointment.reason}
                  </p>
                </div>

                {selectedAppointment.notes && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Important Notes
                    </h4>
                    <p className="text-gray-700">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Status & Actions */}
              <div className="lg:col-span-1">
                <div className="bg-teal-50 rounded-lg p-5 mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    Appointment Status
                  </h4>

                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${getStatusClass(
                      selectedAppointment.status
                    )}`}
                  >
                    {getStatusIcon(selectedAppointment.status)}
                    {selectedAppointment.status
                      ?.charAt(0)
                      .toUpperCase() +
                      selectedAppointment.status?.slice(1)}
                  </div>

                  {selectedAppointment.status === "upcoming" && (
                    <>
                      <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium mb-3 hover:bg-teal-700 transition-colors">
                        Join Video Call
                      </button>
                      <button className="w-full bg-white text-teal-600 py-2 rounded-lg font-medium border border-teal-600 mb-3 hover:bg-teal-50 transition-colors">
                        Reschedule
                      </button>
                      <button className="w-full bg-white text-red-600 py-2 rounded-lg font-medium border border-red-300 hover:bg-red-50 transition-colors">
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main Appointments List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <button
              onClick={() => navigate(-1)}
            className="flex items-center text-teal-600 hover:text-teal-800 font-medium mr-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-teal-800">My Appointments</h1>
            <p className="text-gray-600 mt-2">
              Manage and view your upcoming and past appointments
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Appointments</option>
                  <option value="booked">booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="doctor">Sort by Doctor</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appointment List */}
        <div className="grid grid-cols-1 gap-5">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-l-4 border-teal-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start mb-4">
                      <img
                        src={appt.doctorId?.profileImage || usericon}
                        alt={appt.doctorId?.name}
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-teal-100"
                      />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {appt.doctorId?.name}
                        </h2>
                        <p className="text-sm text-teal-600">
                          {appt.doctorId?.specialization}
                        </p>

                        {/* Appointment Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-gray-700">
                          <div className="flex items-center">
                            <Calendar
                              size={18}
                              className="mr-3 text-teal-600 flex-shrink-0"
                            />
                            <span>{formatDate(appt.dateTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock
                              size={18}
                              className="mr-3 text-teal-600 flex-shrink-0"
                            />
                            <span>
                              {new Date(appt.dateTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({appt.duration})
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Stethoscope
                              size={18}
                              className="mr-3 text-teal-600 flex-shrink-0"
                            />
                            <span>{appt.location}</span>
                          </div>
                          {appt.notes && (
                            <div className="flex items-start sm:col-span-2">
                              <span className="text-sm bg-gray-50 text-gray-600 p-2 rounded-lg mt-1">
                                📝 {appt.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3 mt-4 lg:mt-0">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        appt.status
                      )}`}
                    >
                      {getStatusIcon(appt.status)}
                      {appt.status?.charAt(0).toUpperCase() +
                        appt.status?.slice(1)}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(appt)}
                        className="px-3 py-1 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        View Details
                      </button>
                      {/* {appt.status === "booked" && (
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          Cancel
                        </button>
                      )} */}
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                <Calendar size={48} className="text-teal-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? `No appointments match your search for "${searchQuery}"`
                  : "You don't have any appointments scheduled yet."}
              </p>
              {searchQuery && (
                <button
                  className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientAppointments;
