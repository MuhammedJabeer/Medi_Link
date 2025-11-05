// DoctorDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  User,
  Clock,
  Activity,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";
import LogoutConfirmModal from "../../utilites/ConfirmLogoutModal";
import { persistor } from "../../redux/store";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🧩 Logout
  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      persistor.purge();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 🩺 Fetch today's appointments
  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/Todayappointments", {
        params: { doctorId: user._id },
        withCredentials: true,
      });
      console.log(res.data.appointments)
      setTodayAppointments(res.data.data|| []);
      
      setCount(res.data.count || 0);
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTodayAppointments();
  }, [user?._id]);

  const todayStats = {
    totalPatients: count,
    completed: 7,
    remaining: Math.max(count - 7, 0),
    revenue: "₹2,840",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-600">MediLink</h1>
                <p className="text-sm text-gray-500">Dr {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition"
              >
                <LogOut className="w-6 h-6" />
              </button>
              <LogoutConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, Dr. {user.name}
            </h2>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            Here's what's happening with your practice today
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Patients"
            value={todayStats.totalPatients}
            icon={<Users className="w-6 h-6 text-teal-600" />}
            bgColor="bg-teal-100"
            textColor="text-teal-600"
            // change="+2 from yesterday"
          />
          <StatCard
            title="Completed"
            value={todayStats.completed}
            icon={<CheckCircle className="w-6 h-6 text-teal-700" />}
            bgColor="bg-teal-100"
            textColor="text-teal-700"
            // change="58% completion rate"
          />
          <StatCard
            title="Remaining"
            value={todayStats.remaining}
            icon={<Clock className="w-6 h-6 text-teal-500" />}
            bgColor="bg-teal-100"
            textColor="text-teal-500"
            // change="Next at 10:30 AM"
          />
          <StatCard
            title="Revenue"
            value={todayStats.revenue}
            icon={<TrendingUp className="w-6 h-6 text-teal-600" />}
            bgColor="bg-teal-100"
            textColor="text-teal-600"
            // change="+12% from last week"
          />
        </div>

        {/* Dashboard Cards + Today Schedule */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <DashboardCard
                title="Appointments"
                description="Manage your schedule and upcoming appointments"
                icon={<Calendar className="w-8 h-8 text-white" />}
                bgGradient="from-teal-600 to-teal-700"
                badge={`${count} today`}
                path="/AppointmentDetails"
              />
              <DashboardCard
                title="Patient Records"
                description="Access patient history and medical records"
                icon={<Users className="w-8 h-8 text-white" />}
                bgGradient="from-teal-600 to-teal-700"
                badge="156 total"
              />
              <DashboardCard
                title="My Profile"
                description="Update availability and personal information"
                icon={<User className="w-8 h-8 text-white" />}
                bgGradient="from-teal-600 to-teal-700"
                badge="Available"
              />
            </div>

            {/* ✅ Updated Today’s Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Today's Schedule
                </h3>
                <button
                  className="flex items-center text-teal-600 hover:text-teal-700 transition"
                  onClick={() => navigate("/appointments")}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Appointment
                </button>
              </div>
              <div className="p-6 space-y-4">
                {loading ? (
                  <p className="text-gray-500 animate-pulse">Loading...</p>
                ) : todayAppointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-gray-500 py-8">
                    <AlertCircle className="w-10 h-10 mb-2 text-gray-400" />
                    No appointments for today.
                  </div>
                ) : (
                  todayAppointments.map((appt) => (
                    <AppointmentCard key={appt._id} appointment={appt} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Overview
              </h3>
              <div className="space-y-4">
                <OverviewItem label="This Week" value="42 patients" />
                <OverviewItem label="Avg. per day" value="8.4 patients" />
                <OverviewItem
                  label="Rating"
                  value={
                    <>
                      <span className="font-semibold text-gray-900 mr-2">
                        4.8
                      </span>
                      <span className="text-yellow-400">★★★★★</span>
                    </>
                  }
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notifications
              </h3>
              <NotificationItem
                type="urgent"
                message="Lab results ready for John Doe"
                time="5 min ago"
              />
              <NotificationItem
                type="info"
                message="New patient registration"
                time="1 hour ago"
              />
              <NotificationItem
                type="reminder"
                message="Monthly report due tomorrow"
                time="2 hours ago"
              />
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-teal-100 mb-4 text-sm">
                Contact our support team for any assistance
              </p>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function StatCard({ title, value, icon, bgColor, textColor, change }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>{icon}</div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <p className={`text-xs ${textColor} font-medium`}>{change}</p>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, icon, bgGradient, badge, path }) {
  const navigate = useNavigate();
  return (
    <div className="group cursor-pointer" onClick={() => navigate(path)}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className={`bg-gradient-to-r ${bgGradient} p-6 rounded-t-xl`}>
          <div className="flex items-center justify-between">
            {icon}
            {badge && (
              <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-teal-600 text-sm font-medium">
            View details{" "}
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentCard({ appointment }) {
  const statusColors = {
    confirmed: "bg-teal-100 text-teal-800",
    waiting: "bg-yellow-100 text-yellow-800",
    pending: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
          {appointment.patientId?.name?.[0]?.toUpperCase() || "P"}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">
            {appointment.patientId?.name || "Unknown"}
          </h4>
          <p className="text-sm text-gray-600">
            {appointment.notes || "General Checkup"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {new Date(appointment.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            statusColors[appointment.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {appointment.status || "pending"}
        </span>
      </div>
    </div>
  );
}

function NotificationItem({ type, message, time }) {
  const icons = {
    urgent: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Bell className="w-4 h-4 text-teal-600" />,
    reminder: <Clock className="w-4 h-4 text-teal-500" />,
  };
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      {icons[type]}
      <div className="flex-1">
        <p className="text-sm text-gray-900">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
