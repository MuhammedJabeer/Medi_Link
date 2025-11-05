import React, { useState, useEffect } from "react";
import { Search, MapPin, Award, Clock, Star, Heart, Filter, ChevronDown, Calendar, Shield, CheckCircle,ArrowLeft } from "lucide-react";
import axios from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
import usericon from '../../assets/user-profile.webp'

export default function DoctorDetailsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());


  const navigate=useNavigate()

  // Mock specialties for filter dropdown
  const specialties = [
    "All Specialties",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Ophthalmology",
    "Dentistry"
  ];

  async function listDoctors() {
    try {
      setLoading(true);
      const response = await axios.get("/List",{withCredentials:true});
      console.log(response.data.doctor);
      setDoctors(response.data.doctor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listDoctors();
  }, []);

  const toggleFavorite = (doctorId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(doctorId)) {
      newFavorites.delete(doctorId);
    } else {
      newFavorites.add(doctorId);
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                            doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
       
      <div className="max-w-7xl mx-auto">
      
        {/* Header */}
        <div className="mb-8 flex flex-col gap-[10px]">
           <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-700 hover:text-teal-800 transition-colors bg-white py-2 px-4 rounded-lg shadow-sm w-[100px]"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Book appointments with verified healthcare professionals</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, specialty, or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 w-full md:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10 w-64">
                  <h3 className="font-medium text-gray-900 mb-3">Specialty</h3>
                  <div className="space-y-2">
                    {specialties.map(specialty => (
                      <div key={specialty} className="flex items-center">
                        <input
                          type="radio"
                          id={specialty}
                          name="specialty"
                          checked={selectedSpecialty === specialty}
                          onChange={() => setSelectedSpecialty(specialty)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor={specialty} className="ml-2 text-sm text-gray-700">
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} available
          </p>
          <div className="flex items-center text-sm text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            <Shield className="w-4 h-4 mr-1" />
            <span>Verified Professionals</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Doctors List */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Favorite Button */}
                  <button 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 z-10"
                    onClick={() => toggleFavorite(doctor.id)}
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.has(doctor.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </button>

                 

                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={doctor.image|| usericon}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      />
                      {doctor.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {doctor.name}
                        {doctor.isVerfied && <CheckCircle className="w-4 h-4 text-teal-500 inline-block ml-1" />}
                      </h3>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <div className="flex items-center mt-1">
                        {renderStars(doctor.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {doctor.rating} ({doctor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span className="truncate">{doctor.location || "Kochi"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{doctor.experience||"2yr"} of experience</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>Next available: {doctor.nextAvailable || "Tommorrow"}</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-semibold text-gray-900">{doctor.price || "$500"}</div>
                      <div className="text-xs text-gray-500">No extra fees</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 rounded-lg font-medium text-teal-600 border border-teal-600 hover:bg-teal-50 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>View Calendar</span>
                      </button>
                      <button className="px-4 py-2 rounded-lg font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors" onClick={()=>navigate(`/book/${doctor._id}`,{ state: { doctor } })  }>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
                <button 
                  className="mt-4 px-4 py-2 text-teal-600 hover:text-teal-700"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("All Specialties");
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}