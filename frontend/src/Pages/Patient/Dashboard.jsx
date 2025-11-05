import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  
  Calendar,
  FileText,
  MessageCircle,
  LogOut,
  User,
  Download,
  Moon,
  ChevronRight,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Bell,
  CreditCard,
  Pill,
  Activity,
  Shield,
  Video,
  CheckCircle2,
  Search,
  Settings,
  Plus,
  TrendingUp,
  Heart,
  Users,
  
} from "lucide-react";
import { Form, Link } from "react-router-dom";
import axios from "../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import ComingSoonModal from "../../utilites/ComingSoonModal";
import LogoutConfirmModal from "../../utilites/ConfirmLogoutModal";
import {persistor} from '../../redux/store'
export default function PatientDashboard() {

   const params=useParams()

  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingAppointments,SetupcomingAppointments]=useState()
  const [Count,Setcount]=useState(0)
  const [Lastvisit,SetLastvisit]=useState(null)
  const [nextAppointment,SetnextAppointment]=useState()
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  
   const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const Getupcoming=async(req,res)=>{
    try {
        
        const res=await axios.get("/upcomingappointment",{ params: { patientId: user._id },withCredentials:true})
        console.log(res.data.upcomingappointments);
        console.log(res.data.total);
        console.log(res.data.lastVisit);
        console.log(res.data.Nextappointment);
        
        SetupcomingAppointments(res.data.upcomingappointments)
        Setcount(res.data.total)
        SetLastvisit(res.data.lastVisit)
        SetnextAppointment(res.data.Nextappointment)

        
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if (user._id) {
     Getupcoming()
    }

  },[user])

  // const username = "Sarah Johnson";
  
const handlelogout=async()=>{
  try {
    
      await axios.post("/logout",{},{withCredentials:true})
  
    persistor.purge();
        window.location.href = "/";


  } catch (error) {
    
  }
}

  

  const todayStats = {
    nextAppointment: "Tomorrow 2:15 PM",
    activeMedications: 3,
    pendingResults: 2,
    healthScore: "85/100"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-600">MediLink</h1>
                <p className="text-sm text-gray-500">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div> */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <Settings className="w-6 h-6" />
              </button>
              {/* <div className="w-8 h-8 bg-teal-600 rounded-full"></div> */}
               <button onClick={() => setShowLogoutModal(true)} className="p-2 text-gray-400 hover:text-gray-600 transition">
                <LogOut className="w-6 h-6" />
              </button>
              <LogoutConfirmModal
  isOpen={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handlelogout}
/>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name|| "guest"}</h2>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <p className="text-gray-600">Here's your health overview and upcoming appointments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
  title="Next Appointment"
  value={nextAppointment ? new Date(nextAppointment.dateTime).toLocaleString('en-US', { 
    weekday: 'short', month: 'short', day: 'numeric', 
  }) : 'No upcoming'}
  icon={<Calendar className="w-6 h-6 text-teal-600" />}
  bgColor="bg-teal-100"
  textColor="text-teal-600"
  change={nextAppointment?.doctorId?.name || 'N/A'}
/>
          <StatCard title="Active Medications" value={todayStats.activeMedications} icon={<Pill className="w-6 h-6 text-teal-700" />} bgColor="bg-teal-100" textColor="text-teal-700" change="1 refill needed" />
          <StatCard title="Pending Results" value={todayStats.pendingResults} icon={<FileText className="w-6 h-6 text-teal-500" />} bgColor="bg-teal-100" textColor="text-teal-500" change="Lab & imaging" />
          <StatCard title="Health Score" value={todayStats.healthScore} icon={<TrendingUp className="w-6 h-6 text-teal-600" />} bgColor="bg-teal-100" textColor="text-teal-600" change="Good overall" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <DashboardCard title="Book Appointment" description="Schedule visits with your healthcare providers" icon={<Calendar className="w-8 h-8 text-white" />} bgGradient="from-teal-600 to-teal-700" badge="Available" path="/appointments"/>
              <DashboardCard title="Medical Records" description="Access your complete health history and reports" icon={<FileText className="w-8 h-8 text-white" />} bgGradient="from-teal-600 to-teal-700" badge="12 records"  comingSoon/>
              <DashboardCard title="Video Consultation" description="Connect with doctors from anywhere securely" icon={<Video className="w-8 h-8 text-white" />} bgGradient="from-teal-600 to-teal-700" badge="Online now"  comingSoon />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
                 <Link
  to="/DoctorDetailsPage"
  className="flex items-center text-teal-600 hover:text-teal-700 transition"
>
  <Plus className="w-4 h-4 mr-1" /> Book Appointment
</Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* {upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))} */}

                {upcomingAppointments && upcomingAppointments.length>0?(
                  upcomingAppointments.map((appointment)=>(
                           <AppointmentCard key={appointment._id} appointment={appointment} /> 
                  ))
                ):(
                  <div className="text-center py-8 text-gray-500">
      <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-400" />
      <p>No upcoming appointments</p>
      <Link to="/DoctorDetailsPage" className="text-teal-600 hover:underline">
        Book your first appointment
      </Link>
    </div>
                 
                      
                )
              }
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Overview</h3>
              <div className="space-y-4">
                <OverviewItem label="This Month" value={Count} />
                <OverviewItem
  label="Last Visit"
  value={Lastvisit ? new Date(Lastvisit).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'No visits yet'}
/>

                <OverviewItem label="Blood Pressure" value={<><span className="font-semibold text-gray-900 mr-2">128/82</span><span className="text-green-400">●</span></>} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <NotificationItem type="urgent" message="Lab results ready for review" time="2 hours ago" />
              <NotificationItem type="info" message="Prescription ready for pickup" time="1 day ago" />
              <NotificationItem type="reminder" message="Annual checkup reminder" time="3 days ago" />
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-teal-100 mb-4 text-sm">Contact our support team for any assistance</p>
              <button className=" bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition">Get Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function DashboardCard({ title, description, icon, bgGradient, badge,path,comingSoon }) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (comingSoon) {
      setShowModal(true);
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <>
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className={`bg-gradient-to-r ${bgGradient} p-6 rounded-t-xl`}>
          <div className="flex items-center justify-between">
            {icon}
            {badge && <span className="bg-white bg-opacity-20  text-xs px-2 py-1 rounded-full">{badge}</span>}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-teal-600 text-sm font-medium">
            View details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
          </div>
          
        </div>
      </div>
    </div>
      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        feature={title}
      />
    
    </>
  );
}

function AppointmentCard({ appointment }) {
  const statusColors = {
    booked: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {appointment.doctorId?.name?.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{appointment.doctorId?.name}</h4>
          <p className="text-sm text-gray-600">{appointment.doctorId?.specialization}</p>
        </div>
      </div>
      <div className="text-right">
      <p className="font-semibold text-gray-900">
  {new Date(appointment.dateTime).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
         <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            statusColors[appointment.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {appointment.status}
        </span>
      </div>
    </div>
  );
}

function NotificationItem({ type, message, time }) {
  const icons = {
    urgent: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Bell className="w-4 h-4 text-teal-600" />,
    reminder: <Clock className="w-4 h-4 text-teal-500" />
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