import axios from "axios";
import { useEffect, useState } from "react";
// import  { Spinner } from "./loader";
import {  FaEye, FaEyeSlash, FaPaperPlane, FaShieldAlt } from "react-icons/fa";

import { GoogleLogin } from "@react-oauth/google";

import {  FaGoogle, FaArrowRight, FaLock, FaEnvelope, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Spinner component for loading states
const Spinner = () => (
  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
);

export default function Login({ show, onClose, onShowPopup, onShowOtpPopup }: any) {
  const [emailid, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPass, setShowpass] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function Allfields() {
    if (!emailid || !password) {
      return false;
    }
    return true;
  }

  async function HandleLogin() {
    try {
      setLoader(true);
      const ResponseLogin = await axios({
        url: `https://jobportalbackend-whpt.onrender.com/user/Signin?emailid=${emailid}&password=${password}`,
        method: 'GET',
      });

      if (ResponseLogin && ResponseLogin.data.ok) {
        setMsg('User logged in successfully!');
        localStorage.setItem('email', ResponseLogin.data.email);
        localStorage.setItem('name', ResponseLogin.data.name);
        localStorage.setItem('token', ResponseLogin.data.token);
        window.location.href = '/IamUser/profile';
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Something went wrong. Try again later.");
      }
    } finally {
      setLoader(false);
    }
  }

  async function HandleGoogleSignin(response: any) {
    try {
      const token = response.credential;
      const res = await axios.post(
        "https://jobportalbackend-whpt.onrender.com/user/google-login",
        { token },
      );

      if (res.data && res.data.ok) {
        setMsg(res.data.msg);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('token', res.data.token);
        window.location.href = '/IamUser/profile';
      }
      onClose();
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Something went wrong. Try again later.");
      }
    }
  }

  async function ForgotPassVerify() {
    if (!emailid) {
      alert("Please type Registered Email Id!!");
      return;
    }
    setLoader(true);
    try {
      const EmailRegistered = await axios({
        url: `https://jobportalbackend-whpt.onrender.com/user/forgetLogin?email=${emailid}`,
        method: 'GET'
      });

      if (EmailRegistered.data && EmailRegistered.data.real) {
        localStorage.setItem('emailId', emailid);
        onClose();
        onShowPopup();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (show) {
      setIsClosing(false);
    }
  }, [show]);

  if (!show && !isClosing) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 font-aman flex items-center justify-end z-50"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-blue-900/10 backdrop-blur-md"
          />

          {/* Login Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: isClosing ? '100%' : 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-gradient-to-br from-white via-white to-gray-50 w-full max-w-md h-screen shadow-2xl overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-x-32 translate-y-32" />

            <div className="relative h-full flex flex-col p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 space-y-8">
                {/* Email Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaEnvelope className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <button
                      onClick={() => setForgetPass(!forgetPass)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      onClick={() => setShowpass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showPass ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Section */}
                <AnimatePresence>
                  {forgetPass && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-blue-50/50 border-2 border-blue-100 rounded-xl space-y-3">
                        <p className="text-sm text-blue-800 font-medium">Reset your password</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={emailid}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-2 bg-white border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            placeholder="Enter registered email"
                          />
                          <button
                            onClick={ForgotPassVerify}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            {loader ? <Spinner /> : 'Reset'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message Display */}
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-center text-sm font-medium ${msg.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}
                  >
                    {msg}
                  </motion.div>
                )}

                {/* Login Button */}
                <button
                  onClick={HandleLogin}
                  disabled={!Allfields() || loader}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${Allfields()
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {loader ? (
                    <Spinner />
                  ) : (
                    <>
                      <span className="text-white">Sign In</span>
                      <FaArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>

                {/* OTP Login */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      onClose();
                      onShowOtpPopup();
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-all duration-300"
                  >
                    Login with OTP instead
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/50 backdrop-blur-sm text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-4">
                  <GoogleLogin
                    onSuccess={HandleGoogleSignin}
                    onError={() => setMsg("Google login failed. Please try again.")}
                    shape="rectangular"
                    size="large"
                    width="100%"
                    text="continue_with"
                    logo_alignment="left"
                  />
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => {
                        onClose();
                        window.location.href = '/signup';
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      Sign up for free
                    </button>
                  </p>
                </div>
              </div>

              {/* Decorative bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import {  FaCheck, FaKey } from 'react-icons/fa';


export function ChangePassword({ onClose }: any) {
  const [newpass, setNewpass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [endMsg, setEndmsg] = useState('');
  const [showNewpass, setShownewPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirmChange(e: any) {
    const value = e.target.value;
    setConfirm(value);
    if (newpass !== value) {
      setMsg("Passwords don't match");
    } else {
      setMsg("");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFields) return;
    
    setIsLoading(true);
    try {
      const SendingUpdate = await axios({
        url: 'https://jobportalbackend-whpt.onrender.com/user/changePassword',
        method: 'PUT',
        data: {
          email: localStorage.getItem('emailId'),
          newpass: confirm
        }
      });

      if (SendingUpdate.data) {
        setEndmsg(SendingUpdate.data.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const allFields = newpass && confirm && newpass === confirm;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-blue-900/20 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md mx-4"
        >
          <div className="bg-gradient-to-br from-white via-white to-gray-50/95 rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaKey className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      New Password
                    </h1>
                    <p className="text-gray-500 text-sm">Secure your account</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-2">
                      <FaLock className="w-4 h-4 text-gray-400" />
                      New Password
                    </span>
                    {newpass && (
                      <span className={`text-xs px-2 py-1 rounded-full ${newpass.length >= 8
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                          : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700'
                        }`}>
                        {newpass.length >= 8 ? 'Strong ✓' : 'Weak'}
                      </span>
                    )}
                  </label>
                  <div className="relative group">
                    <input
                      value={newpass}
                      onChange={(e) => setNewpass(e.target.value)}
                      type={showNewpass ? 'text' : 'password'}
                      placeholder="Create new password"
                      className="w-full pl-4 pr-12 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShownewPass(!showNewpass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showNewpass ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaLock className="w-4 h-4 text-gray-400" />
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      value={confirm}
                      onChange={handleConfirmChange}
                      type={showConfirmpass ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      className="w-full pl-4 pr-12 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmpass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showConfirmpass ? (
                        <FaEyeSlash className="w-5 h-5 text-gray-400" />
                      ) : (
                        <FaEye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {msg && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2 text-sm px-3 py-2 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                          <FaTimes className="w-3 h-3" />
                        </div>
                        <span className="text-red-700">{msg}</span>
                      </motion.div>
                    )}
                    {!msg && confirm && newpass === confirm && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2 text-sm px-3 py-2 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <FaCheck className="w-3 h-3" />
                        </div>
                        <span className="text-green-700">Passwords match!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                  {endMsg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <FaCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">Password Updated!</p>
                          <p className="text-sm text-green-600">{endMsg}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!allFields || isLoading}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${allFields && !isLoading
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    'Change Password'
                  )}
                </button>
              </form>

              {/* Password Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Create a strong password:</p>
                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${newpass.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(newpass) && /[a-z]/.test(newpass) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        Upper & lowercase letters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${/\d/.test(newpass) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        Include numbers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bottom bar */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LoginWithOtp({ onClose }: any) {
  const [email, setEmail] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');

  async function CheckEmail() {
    setLoading(true);
    try {
      const Check_Email = await axios({
        url: `https://jobportalbackend-whpt.onrender.com/user/sendOtp?email=${email}`,
        method: "GET"
      });

      if (Check_Email.data && Check_Email.data.real) {
        localStorage.setItem('otp', Check_Email.data.otp);
        localStorage.setItem('token', Check_Email.data.token);
        localStorage.setItem('email', email);
        setShowOtpInput(true);
        setMsg('OTP sent successfully! Check your email.');
      }
    } catch (err) {
      console.log(err);
      setMsg('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function CheckOtp() {
    if (localStorage.getItem('otp') === otp) {
      setMsg("OTP verified successfully!");
      setTimeout(() => {
        window.location.href = '/IamUser/profile';
      }, 1500);
      return;
    }
    setMsg("Invalid OTP. Please try again.");
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-blue-900/30 to-purple-900/20 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md mx-4"
        >
          <div className="bg-gradient-to-br from-white via-white to-gray-50/95 rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaShieldAlt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      OTP Login
                    </h1>
                    <p className="text-gray-500 text-sm">Secure login with one-time password</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>

              {/* Email Input Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaEnvelope className="w-4 h-4 text-gray-400" />
                    Enter your registered email
                  </label>
                  <div className="relative group">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>

                  <button
                    onClick={CheckEmail}
                    disabled={!email || loading}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${email && !loading
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner />
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaPaperPlane className="w-4 h-4" />
                        <span>Send OTP</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* OTP Input Section */}
                <AnimatePresence>
                  {showOtpInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                            <FaLock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Enter OTP</p>
                            <p className="text-sm text-gray-600">Check your email for the code</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative group">
                            <input
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                              maxLength={6}
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          </div>

                          <button
                            onClick={CheckOtp}
                            disabled={!otp || otp.length !== 6}
                            className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${otp && otp.length === 6
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                          >
                            Verify & Login
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages */}
                <AnimatePresence>
                  {msg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl border ${msg.includes('successfully') || msg.includes('sent')
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.includes('successfully') || msg.includes('sent')
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : 'bg-gradient-to-r from-red-400 to-orange-500'
                          }`}>
                          {msg.includes('successfully') || msg.includes('sent') ? (
                            <FaCheck className="w-4 h-4 text-white" />
                          ) : (
                            <FaTimes className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className={`font-medium ${msg.includes('successfully') || msg.includes('sent')
                            ? 'text-green-800'
                            : 'text-red-800'
                          }`}>
                          {msg}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* OTP Info */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">ℹ️</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">About OTP Login</p>
                      <p className="text-xs text-gray-600 mt-1">
                        A one-time password will be sent to your email for secure login.
                        The OTP is valid for 10 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bottom bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



