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

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

        
        
       <Route path='/'  element={<WelcomPage/>} />
        <Route path='/Role'  element={<Role/>} />
         <Route path='/Signin'  element={<Signin/>} />
          <Route path='/Doctor'  element={<Doctor/>} />
           <Route path='/Patient'  element={<Patient/>} />
            <Route path='/Verification' element={<Verification/>}/>
              <Route path="/pending"  element={<PendingApproval/>}/>
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
