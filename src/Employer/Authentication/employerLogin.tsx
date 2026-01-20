

import {   FaUsers, FaBrain, FaRocket, FaSignInAlt } from 'react-icons/fa';

const Spinner = () => (
  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);



const TalentDecoded = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showExtraOtp, setExtraOtp] = useState(false);
  const [storeOtp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  async function LoginEmployer() {
    if (!email.trim() || !password.trim()) {
      alert("Fields can't be empty spaces!!");
      return;
    }

    setLoading(true);
    try {
      const Logging = await axios({
        url: 'https://jobportalbackend-whpt.onrender.com/user/employerLogin',
        method: 'POST',
        data: {
          email, password
        }
      });

      if (Logging.data && Logging.data.login) {
        console.log(Logging.data.otp);
        setOtp(Logging.data.otp);
        setToken(Logging.data.token);
        setExtraOtp(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
   
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center gap-12 items-center">
         
          {/* Right Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="w-[100%] mx-auto">
              <div className="bg-gradient-to-br from-white to-gray-50/95 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
                {/* Card Header */}
                <div className="p-8 bg-gradient-to-r from-blue-600/5 to-indigo-600/5">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <FaLock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Employer Login</h2>
                      <p className="text-gray-600">Access your recruitment dashboard</p>
                    </div>
                  </div>
                </div>

                {/* Login Form */}
                <div className="p-8">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaEnvelope className="w-4 h-4 text-gray-400" />
                        Email Address
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="your.company@email.com"
                          required
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaLock className="w-4 h-4 text-gray-400" />
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="Enter your password"
                          required
                        />
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                        Forgot password?
                      </button>
                    </div>

                    {/* Login Button */}
                    <button
                      onClick={LoginEmployer}
                      disabled={!email.trim() || !password.trim() || loading}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${email.trim() && password.trim() && !loading
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner />
                          <span>Authenticating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <FaSignInAlt className="w-5 h-5" />
                          <span>Login to Dashboard</span>
                        </div>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">New to TalentDecoded?</span>
                      </div>
                    </div>

                    {/* Register Button */}
                    <button
                      onClick={() => window.location.href = '/recruiter/client-register'}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <FaUsers className="w-5 h-5" />
                      <span>Create Employer Account</span>
                    </button>

                    {/* Security Note */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          <FaShieldAlt className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Secure & Encrypted</p>
                          <p className="text-xs text-gray-600">Your data is protected with 256-bit encryption</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-gray-800">5000+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-gray-800">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FaBrain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">YuvaJobs</div>
                <div className="text-gray-400">AI-Powered Recruitment Platform</div>
              </div>
            </div>
            
          </div>
        
        </div>
      </footer>

      {/* OTP Popup */}
      <AnimatePresence>
        {showExtraOtp && (
          <OTP_Popup 
            email={email} 
            setOTP={setOtp} 
            onClose={() => setExtraOtp(false)} 
            OTP={storeOtp} 
            token={token}
          />
        )}
      </AnimatePresence>
    </div>
  );
};



import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaRedo, FaLock, FaEnvelope, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const OTP_Popup = ({ onClose, OTP, setOTP, token, email }: any) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [msg, setMsg] = useState({ id: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Allow only numbers and empty string
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = pasteData.split('');
    
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < 6 && /^\d?$/.test(char)) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    const lastIndex = Math.min(pasteArray.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  function VerifyOtp() {
    setLoading(true);
    const TextualOtp = otp.join('');
    
    if (TextualOtp.length !== 6) {
      setMsg({ id: "WrongOtp", msg: "Please enter all 6 digits" });
      setLoading(false);
      return;
    }

    console.log(TextualOtp);
    console.log(OTP);
    
    setTimeout(() => {
      if (TextualOtp === OTP.toString()) {
        localStorage.setItem('employerToken', token);
        setMsg({ id: "Success", msg: "OTP Verified Successfully!" });
        setTimeout(() => {
          onClose();
          window.location.href = '/recruiter/dashboard';
        }, 1000);
      } else {
        setMsg({ id: "WrongOtp", msg: "Invalid OTP. Please try again." });
      }
      setLoading(false);
    }, 1000);
  }

  async function ResendOtp() {
    if (resendCooldown > 0) return;
    
    try {
      const Resend = await axios({
        url: `https://jobportalbackend-whpt.onrender.com/user/ResendOTP?email=${email}`,
        method: 'GET'
      });

      if (Resend.data && Resend.data.otp) {
        setOTP(Resend.data.otp);
        setMsg({ id: 'ResendOtp', msg: "New OTP has been sent to your email!" });
        setResendCooldown(30);
        
        // Reset OTP fields
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.log(err);
      setMsg({ id: 'Error', msg: "Failed to resend OTP. Please try again." });
    }
  }

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gradient-to-br from-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-white via-white to-gray-50/95 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaLock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
                    <p className="text-gray-600 text-sm">Secure authentication required</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>

              {/* Email Display */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">OTP sent to</p>
                    <p className="font-medium text-gray-800 truncate">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-6">
                  Enter the 6-digit verification code sent to your email
                </p>

                {/* OTP Input Grid */}
                <div className="flex justify-center gap-3 mb-2">
                  {otp.map((digit, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-14 h-14 text-center text-2xl font-bold bg-white border-2 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm"
                      />
                      {digit && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                        >
                          <FaCheckCircle className="w-2 h-2 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Paste hint */}
                <p className="text-sm text-gray-500 mt-4">
                  Tip: You can paste the entire OTP code
                </p>
              </div>

              {/* Messages */}
              <AnimatePresence>
                {msg.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-xl border ${msg.id === 'Success' || msg.id === 'ResendOtp'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                        : msg.id === 'Error'
                          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                          : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.id === 'Success' || msg.id === 'ResendOtp'
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : msg.id === 'Error'
                            ? 'bg-gradient-to-r from-red-400 to-orange-500'
                            : 'bg-gradient-to-r from-yellow-400 to-amber-500'
                        }`}>
                        {msg.id === 'Success' || msg.id === 'ResendOtp' ? (
                          <FaCheckCircle className="w-4 h-4 text-white" />
                        ) : msg.id === 'Error' ? (
                          <FaTimes className="w-4 h-4 text-white" />
                        ) : (
                          <FaLock className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${msg.id === 'Success' || msg.id === 'ResendOtp'
                          ? 'text-green-800'
                          : msg.id === 'Error'
                            ? 'text-red-800'
                            : 'text-yellow-800'
                        }`}>
                        {msg.msg}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Verify Button */}
              <button
                onClick={VerifyOtp}
                disabled={loading || otp.join('').length !== 6}
                className={`w-full py-4 rounded-xl font-semibold mb-6 transition-all duration-300 ${otp.join('').length === 6 && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Verify OTP</span>
                    <FaArrowRight className="w-4 h-4" />
                  </div>
                )}
              </button>

              {/* Resend Section */}
              <div className="text-center">
                <p className="text-gray-600 mb-3">Didn't receive the code?</p>
                <button
                  onClick={ResendOtp}
                  disabled={resendCooldown > 0}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${resendCooldown === 0
                      ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                      : 'text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <FaRedo className={`w-4 h-4 ${resendCooldown === 0 ? 'animate-spin-once' : ''}`} />
                  {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                </button>
              </div>

              {/* Security Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <FaShieldAlt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Secure Verification</p>
                    <p className="text-xs text-gray-600">This OTP is valid for 10 minutes only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bottom bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-once {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-once {
    animation: spin-once 0.5s ease-in-out;
  }
  input[type="text"] {
    caret-color: #3b82f6;
  }
  input:focus {
    outline: none;
  }
`;
document.head.appendChild(style);


export default TalentDecoded;
