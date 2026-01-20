import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheck, FaMapMarkerAlt, FaBriefcase, FaLocationArrow, FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaArrowRight, FaTimes, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Spinner = () => (
  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

const TopPopup = ({ text, show, onClose }: any) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between mx-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm opacity-90">{text}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NaukriRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    workStatus: '',
    promotions: true,
    roles: [] as string[],
    preferedLocations: [] as string[]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currCity, setCurCity] = useState('');
  const [cityarr, setCityArr] = useState<string[]>([]);
  const [showPopup, setPopup] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  function AllFilled() {
    if (!formData.fullName || !formData.mobile || !formData.password || !formData.email || !formData.workStatus || !cityarr[0]) {
      return false;
    }
    return true;
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setLoader(true);

    try {
      const SendingData = await axios({
        url: 'https://jobportalbackend-whpt.onrender.com/user/UserCreate',
        method: "POST",
        data: {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.mobile,
          location: cityarr[0],
          experience: formData.workStatus,
          roles: formData.roles,
          preferedLocations: formData.preferedLocations
        }
      });
      console.log(SendingData.data);
      if (SendingData && SendingData.data) {
        setPopup(true);
      }
    } catch (err) {
      console.log("Error while creating User " + err);
    } finally {
      setLoader(false);
    }
  };

  const cities = [
    "New Delhi", "Bengaluru", "Mumbai", "Pune", "Chennai", 
    "Hyderabad", "Gurugram", "Noida", "Ahmedabad", "Kolkata"
  ];

  const experiencesList = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-7", "7-10", "10+"];
  
  const jobRoles = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Data Scientist", "DevOps Engineer", "Product Manager", "UI/UX Designer",
    "Business Analyst", "Digital Marketer", "Sales Executive", "HR Manager"
  ];

  const topITLocationsIndia = [
    "Bangalore", "Hyderabad", "Pune", "Chennai", "Gurgaon", 
    "Noida", "Delhi", "Mumbai", "Kolkata", "Ahmedabad"
  ];

  function AddRoles(role: string) {
    const exist = formData.roles.some(each => each === role);
    if (!exist) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, role] }));
    }
  }

  function RemoveRole(role: string) {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(e => e !== role) }));
  }

  function AddLocation(location: string) {
    const exist = formData.preferedLocations.some(each => each === location);
    if (!exist) {
      setFormData(prev => ({ ...prev, preferedLocations: [...prev.preferedLocations, location] }));
    }
  }

  function removeLocation(location: string) {
    setFormData(prev => ({ ...prev, preferedLocations: prev.preferedLocations.filter(each => each !== location) }));
  }

  function AddCity(city: string) {
    if (city.trim()) {
      setCityArr([city]);
      setCurCity('');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <TopPopup text="Registration successful! Now you can login." show={showPopup} onClose={() => setPopup(false)} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <FaUser className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join Naukri.com
          </h1>
          <p className="text-gray-600 mt-3 text-lg">India's #1 Job Platform • Get Discovered by Top Companies</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-8 mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= step ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 ${activeStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-8">
          

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-2/3"
          >
            <div className="bg-gradient-to-br from-white to-gray-50/95 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
              {/* Form Header */}
              <div className="p-8 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Create Your Profile</h2>
                    <p className="text-gray-600 mt-2">Fill in your details to get started</p>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                    <FaStar className="w-4 h-4" />
                    <span className="text-sm font-medium">Step {activeStep} of 3</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                      Personal Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="What is your name?"
                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">We'll send relevant jobs to this email</p>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="w-5 h-5 text-gray-400" />
                            ) : (
                              <FaEye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <FaPhone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <span className="text-gray-500 font-medium">+91</span>
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter 10-digit number"
                            className="w-full pl-24 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Recruiters will contact you here</p>
                      </div>
                    </div>
                  </div>

                  {/* Experience & Location Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <FaBriefcase className="w-5 h-5 text-white" />
                      </div>
                      Experience & Location
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Work Experience */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Work Experience <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <select
                            value={formData.workStatus}
                            onChange={(e) => setFormData(prev => ({ ...prev, workStatus: e.target.value }))}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 appearance-none cursor-pointer"
                          >
                            <option value="" disabled hidden>Select experience</option>
                            {experiencesList.map((exp, idx) => (
                              <option key={idx} value={exp}>{exp} years</option>
                            ))}
                          </select>
                          <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Current City */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current City <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="relative flex-1 group">
                              <input
                                type="text"
                                value={currCity}
                                onChange={(e) => setCurCity(e.target.value)}
                                placeholder="Enter your city"
                                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                              />
                              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                AddCity(currCity);
                              }}
                              disabled={!currCity.trim()}
                              className={`px-6 rounded-xl font-medium transition-all duration-300 ${currCity.trim()
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                              Add
                            </button>
                          </div>
                          
                          {/* Selected City */}
                          <AnimatePresence>
                            {cityarr[0] && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"
                              >
                                <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                                <span className="font-medium text-blue-700">{cityarr[0]}</span>
                                <button
                                type='button'
                                  onClick={() => {
                                    AddCity('');
                                    setCurCity('');
                                    setCityArr([])
                                  }}
                                  className="ml-auto p-1 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                  <FaTimes className="w-4 h-4 text-blue-500" />
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* City Suggestions */}
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-2">Popular cities:</p>
                            <div className="flex flex-wrap gap-2">
                              {cities.slice(0, 6).map((city, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurCity(city);
                                    AddCity(city);
                                  }}
                                  className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <FaLocationArrow className="w-5 h-5 text-white" />
                      </div>
                      Job Preferences
                    </h3>

                    {/* Job Roles */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Interested Job Roles
                      </label>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.roles.map((role, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center gap-2 shadow-lg"
                          >
                            <span className="text-sm font-medium">{role}</span>
                            <button
                              type="button"
                              onClick={() => RemoveRole(role)}
                              className="w-5 h-5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      <div className="relative group">
                        <select
                          onChange={(e) => {
                            AddRoles(e.target.value);
                            e.target.value = '';
                          }}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 appearance-none cursor-pointer"
                        >
                          <option value="" hidden>Select job roles...</option>
                          {jobRoles.map((role, idx) => (
                            <option key={idx} value={role}>{role}</option>
                          ))}
                        </select>
                        <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Preferred Locations */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Preferred Locations
                      </label>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.preferedLocations.map((location, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full flex items-center gap-2 shadow-lg"
                          >
                            <FaMapMarkerAlt className="w-4 h-4" />
                            <span className="text-sm font-medium">{location}</span>
                            <button
                              type="button"
                              onClick={() => removeLocation(location)}
                              className="w-5 h-5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      <div className="relative group">
                        <select
                          onChange={(e) => {
                            AddLocation(e.target.value);
                            e.target.value = '';
                          }}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 appearance-none cursor-pointer"
                        >
                          <option value="" hidden>Select preferred locations...</option>
                          {topITLocationsIndia.slice(0, 20).map((location, idx) => (
                            <option key={idx} value={location}>{location}</option>
                          ))}
                        </select>
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Promotions Checkbox */}
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          name="promotions"
                          checked={formData.promotions}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${formData.promotions
                            ? 'border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600'
                            : 'border-gray-300 bg-white'
                          }`}>
                          {formData.promotions && <FaCheck className="text-white text-sm" />}
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Yes, send me important updates & promotions via SMS, email, and WhatsApp
                      </span>
                    </label>
                  </div>

                  {/* Terms & Submit */}
                  <div className="space-y-6">
                    <div className="text-center text-sm text-gray-600">
                      <p>
                        By clicking Register, you agree to our{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                          Terms and Conditions
                        </a>
                        {' '}&{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!AllFilled() || loader}
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${AllFilled() && !loader
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {loader ? (
                        <div className="flex items-center justify-center gap-3">
                          <Spinner />
                          <span>Creating your account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span>Create Naukri Profile</span>
                          <FaArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>

            

               
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Login here</a></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NaukriRegister;
