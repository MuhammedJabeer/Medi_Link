import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Health from "../../assets/Health.jpg"

export default function WelcomePage() {
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-600">MediLink</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-teal-600">Features</a>
          <a href="#about" className="hover:text-teal-600">About</a>
          <a href="#contact" className="hover:text-teal-600">Contact</a>
          <NavLink to="/Signin" className="bg-teal-600 text-white px-4 py-1.5 rounded hover:bg-teal-700">
            Sign In
          </NavLink>
          <NavLink to="/Role" className="border border-teal-600 text-teal-600 px-4 py-1.5 rounded hover:bg-teal-50">
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );

  const HeroSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className=" py-16 bg-teal-100"
  //     style={{
  //   backgroundImage: `url(${Health})`,
  //    backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //     backgroundRepeat: 'no-repeat',
      
  // }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Your home for health</h1>
        <p className="text-lg mb-6 text-gray-600">
          Book doctor appointments, consult online, order medicines & more.
        </p>
        <div className="flex justify-center">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 text-lg font-medium">
            Book Appointment
          </button>
        </div>
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          {["Consult now", "Order Medicines", "Lab Tests", "Surgeries"].map(
            (label) => (
              <button key={label} className="text-teal-600 hover:underline font-medium">
                {label}
              </button>
            )
          )}
        </div>
      </div>
    </motion.div>
  );

  const Features = () => (
    <section id="features" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Instant Video Consult",
            desc: "Connect within 60 secs",
            icon: "🎥"
          },
          {
            title: "Find Doctors Near You",
            desc: "Confirmed appointments",
            icon: "📍"
          },
          {
            title: "Medicines Delivery",
            desc: "Essentials at your doorstep",
            icon: "💊"
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5 }}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md bg-gray-50"
          >
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );

  const SpecialtyGrid = () => (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Common Specialties</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            "Dentist",
            "Gynecologist",
            "Dietitian",
            "Physiotherapist",
            "Dermatologist",
            "Pediatrician",
            "Orthopedist",
            "Psychiatrist",
          ].map((specialty, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md border border-gray-100"
            >
              <p className="text-teal-600 font-medium">{specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const Benefits = () => (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Choose MediLink?</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> 100,000+ Verified Doctors</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Affordable Online Consultation</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> Secure Medical Records</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span> 24x7 Access to Health Experts</li>
        </ul>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">What our users say</h2>
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          className="flex gap-6 overflow-x-auto no-scrollbar px-2 pb-4"
        >
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              className="bg-white p-6 rounded-lg shadow w-80 flex-shrink-0 border border-gray-100"
            >
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-sm text-gray-700 mb-4">
                "Amazing experience. I could consult from home during an emergency."
              </p>
              <p className="font-semibold text-teal-600">User {id}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer id="contact" className="bg-white border-t py-8 mt-8 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-teal-600 font-bold text-lg">MediLink</p>
          <p className="mt-2">&copy; 2025 MediLink. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">About</a></li>
              <li><a href="#" className="hover:text-teal-600">Careers</a></li>
              <li><a href="#" className="hover:text-teal-600">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">Privacy</a></li>
              <li><a href="#" className="hover:text-teal-600">Terms</a></li>
              <li><a href="#" className="hover:text-teal-600">Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Contact</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-600">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="font-sans text-gray-900">
      <Header />
      <HeroSection />
      <Features />
      <SpecialtyGrid />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
}