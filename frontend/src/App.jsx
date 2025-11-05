import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from './Components/Auth/Signup'
import Signin from './Components/Auth/Signin'
import Doctor from './Components/Auth/Doctor'
import Role from './Components/Auth/Role'
import Patient from './Components/Auth/Patient'
import WelcomPage from './Components/Auth/WelcomPage'
import Verification from './Components/Auth/Verification'
import PendingApproval from './Pages/PendingApproval';
import DoctorDashboard from './Pages/Doctor/Dashboard';
import PatientDashboard from './Pages/Patient/Dashboard';
import DoctorDetailsPage from './Pages/Patient/DoctorDetailsPage';
import BookAppointmentPage from './Pages/Patient/BookAppointmentPage';
import AppointmentDetails from './Pages/Doctor/AppointmentDetails';
import PatientAppointments from './Pages/Patient/PatientAppointments';
import Unauthorized from './Pages/Unauthorized';
import ProtectedRoute from './Components/Auth/ProtectedRoute ';
import GuestRoute from './Components/GuestRoute';
import NotFound from './Components/NotFounded';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public routes (everyone) */}
        <Route path="/" element={<WelcomPage />} />
        <Route path="/Role" element={<Role />} />
        <Route path="/Signin" element={<GuestRoute><Signin /></GuestRoute>} />
        <Route path="/Doctor" element={<Doctor />} />
        <Route path="/Patient" element={<Patient />} />
        <Route path="/Verification" element={<Verification />} />

        {/* Doctor routes */}
        <Route
          path="/pending"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PendingApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/AppointmentDetails'
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <AppointmentDetails/>
            </ProtectedRoute>
          }
          />

        {/* Patient routes */}
        <Route
          path="/board"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DoctorDetailsPage"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <DoctorDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:doctorId"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <BookAppointmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientAppointments />
            </ProtectedRoute>
          }
        />

       
        <Route path="/Unauthorized" element={<Unauthorized />} />

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>



      {/* <Signin/> */}
      {/* <Doctor/> */}
      {/* <Role/> */}
      {/* <Patient/> */}

        {/* <WelcomPage/> */}

        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}  

export default App
