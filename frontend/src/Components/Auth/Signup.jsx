import { useState } from 'react';
import { User, Mail, Lock, Phone, Camera, Stethoscope, Calendar, Clock, UserCheck, Heart, Droplets, Shield, Award, MapPin } from 'lucide-react';

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState('patient');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-2xl">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Join <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MedConnect</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your trusted platform for seamless healthcare connections and appointment management
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="space-y-8">
              {/* Role Selection - Enhanced */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Role</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() => setSelectedRole('patient')}
                    className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedRole === 'patient'
                        ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25'
                        : 'border-white/20 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        selectedRole === 'patient' ? 'bg-blue-500' : 'bg-white/10'
                      }`}>
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Patient</h3>
                      <p className="text-gray-300">Book appointments with healthcare professionals</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedRole('doctor')}
                    className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedRole === 'doctor'
                        ? 'border-green-400 bg-green-500/20 shadow-lg shadow-green-500/25'
                        : 'border-white/20 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        selectedRole === 'doctor' ? 'bg-green-500' : 'bg-white/10'
                      }`}>
                        <Stethoscope className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Healthcare Provider</h3>
                      <p className="text-gray-300">Manage your practice and patient appointments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-400" />
                      Personal Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Create a secure password"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Role-specific Info */}
                <div className="space-y-6">
                  {selectedRole === 'doctor' && (
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-green-400" />
                        Professional Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Medical Specialization</label>
                          <div className="relative">
                            <Stethoscope className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <select className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none">
                              <option value="" className="bg-gray-800">Select specialization</option>
                              <option value="cardiology" className="bg-gray-800">Cardiology</option>
                              <option value="dermatology" className="bg-gray-800">Dermatology</option>
                              <option value="neurology" className="bg-gray-800">Neurology</option>
                              <option value="orthopedics" className="bg-gray-800">Orthopedics</option>
                              <option value="pediatrics" className="bg-gray-800">Pediatrics</option>
                              <option value="general" className="bg-gray-800">General Practice</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">License Number</label>
                          <div className="relative">
                            <Shield className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                              placeholder="Medical license number"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <MapPin className="inline w-4 h-4 mr-1" />
                            Practice Location
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="City, State"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            Availability
                          </label>
                          <textarea
                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                            rows="3"
                            placeholder="Mon-Fri: 9AM-5PM, Sat: 9AM-2PM"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRole === 'patient' && (
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-blue-400" />
                        Health Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Age</label>
                            <input
                              type="number"
                              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="25"
                              min="1"
                              max="120"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Gender</label>
                            <select className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
                              <option value="" className="bg-gray-800">Select</option>
                              <option value="male" className="bg-gray-800">Male</option>
                              <option value="female" className="bg-gray-800">Female</option>
                              <option value="other" className="bg-gray-800">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            <Droplets className="inline w-4 h-4 mr-1" />
                            Blood Group
                          </label>
                          <select className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
                            <option value="" className="bg-gray-800">Select blood group</option>
                            <option value="A+" className="bg-gray-800">A+</option>
                            <option value="A-" className="bg-gray-800">A-</option>
                            <option value="B+" className="bg-gray-800">B+</option>
                            <option value="B-" className="bg-gray-800">B-</option>
                            <option value="AB+" className="bg-gray-800">AB+</option>
                            <option value="AB-" className="bg-gray-800">AB-</option>
                            <option value="O+" className="bg-gray-800">O+</option>
                            <option value="O-" className="bg-gray-800">O-</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Emergency Contact</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Emergency contact number"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Medical History</label>
                          <textarea
                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            rows="3"
                            placeholder="Any allergies, conditions, or medications..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-purple-400" />
                  Profile Picture
                </h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="button"
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                    selectedRole === 'doctor'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/25'
                  }`}
                >
                  Create {selectedRole === 'doctor' ? 'Doctor' : 'Patient'} Account
                </button>
              </div>

              {/* Footer */}
              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}