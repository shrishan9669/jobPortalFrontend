import { CgProfile } from "react-icons/cg";
import { FaArrowDown, FaBriefcase, FaBuilding, FaTools } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface HeaderProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSideBarUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Job_Hover_Div() {
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      ref={divRef}
      className={`p-4 shadow-lg w-[200px] bg-white rounded-xl border border-gray-100 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex flex-col gap-3">
        <span
          onClick={() => navigate('/IamUser/recommendedJobs')}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <FaBriefcase className="text-blue-600 text-xs" />
          </div>
          Recommended Jobs
        </span>
        <span
          onClick={() => navigate('/IamUser/applicationStatus')}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50"
        >
          <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <span className="text-green-600 text-xs font-bold">✓</span>
          </div>
          Application Status
        </span>
        <span
          onClick={() => navigate('/IamUser/savedjobs')}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50"
        >
          <div className="w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
            <span className="text-yellow-600 text-xs">★</span>
          </div>
          Saved Jobs
        </span>
      </div>
    </div>
  );
}

export default function Header({ setShowLogin, setSideBarUser }: HeaderProps) {
  const [show_employer, setShowEmployer] = useState(false);
  const [show_job, setShowJob] = useState(false);
  const [show_companies, setShowCompanies] = useState(false);
  const [show_services, setShowServices] = useState(false);
  const [countNoti, setCountNoti] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  async function Get_NotificationCount() {
    try {
      const Count_UnRead = await axios({
        url: "http://localhost:3000/user/getNotiCount",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        method: 'GET'
      });

      if (Count_UnRead.data && Count_UnRead.data.count) {
        setCountNoti(Count_UnRead.data.count);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Get_NotificationCount();
    }

    // Add scroll effect for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full font-aman px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}`}>
      {/* Logo and Brand */}
      <div 
        onClick={() => {
          if (localStorage.getItem('token')) {
            navigate('/IamUser/profile');
          } else {
            navigate('/');
          }
        }} 
        className="flex cursor-pointer items-center gap-3 group"
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 ">
          <div className="absolute inset-0  rounded-2xl transform group-hover:rotate-6 transition-transform duration-300"></div>
          <img
            src="/LogoYuva.jpg"
            className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-2 border-white object-contain transition-transform duration-300 group-hover:scale-105"
            alt="YuvaJobs Logo"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            YuvaJobs
          </h1>
          <p className="text-xs text-gray-500 hidden md:block">Career. Connected.</p>
        </div>
      </div>

      {/* Navigation Links - Center */}
      <div className="hidden lg:flex gap-8 text-base w-full justify-end pr-10 font-medium text-gray-700 items-center">
        {/* Jobs Dropdown */}
        <div 
          className="relative group"
          onMouseEnter={() => setShowJob(true)}
          onMouseLeave={() => setShowJob(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group-hover:text-blue-600">
            <FaBriefcase className="text-gray-500 group-hover:text-blue-600" />
            <span>Jobs</span>
            <FaArrowDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
          </div>
          {show_job && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <Job_Hover_Div />
            </div>
          )}
        </div>

        {/* Companies */}
        {/* <div 
          className="relative group"
          onMouseEnter={() => setShowCompanies(true)}
          onMouseLeave={() => setShowCompanies(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group-hover:text-blue-600">
            <FaBuilding className="text-gray-500 group-hover:text-blue-600" />
            <span>Companies</span>
          </div>
        </div> */}

        {/* Services */}
        {/* <div 
          className="relative group"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group-hover:text-blue-600">
            <FaTools className="text-gray-500 group-hover:text-blue-600" />
            <span>Services</span>
          </div>
        </div> */}
      </div>

     

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        {localStorage.getItem('email') ? (
          <>
            

            {/* Notification */}
            <div className="relative">
              <div 
                onClick={() => navigate('/IamUser/notifications')}
                className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-200 hover:scale-105 group"
              >
                <IoNotificationsOutline className="text-2xl text-gray-600 group-hover:text-blue-600" />
                {countNoti && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center animate-pulse">
                    {countNoti}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Menu */}
            <div 
              onClick={() => setSideBarUser(true)}
              className="flex items-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-400 group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                  <CgProfile className="text-white text-lg" />
                </div>
              </div>
              <RxHamburgerMenu className="text-xl text-gray-500 group-hover:text-blue-600" />
            </div>
          </>
        ) : (
          /* Login/Register and Employer Section */
          <div className="flex items-center gap-4 md:gap-6">
            {/* Login Button */}
            <button 
              className="px-5 py-2.5 text-blue-600 font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            
            {/* Register Button */}
            <button 
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
              onClick={() => navigate('/signup') }
            >
              Register
            </button>

            {/* Divider */}
            <div className="hidden md:block h-8 border-l border-gray-300"></div>

            {/* Employer Dropdown */}
            <div 
              className="relative group hidden md:block"
              onMouseEnter={() => setShowEmployer(true)}
              onMouseLeave={() => setShowEmployer(false)}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 cursor-pointer group-hover:border-blue-300 transition-all duration-200">
                <span className="text-blue-700 font-semibold text-sm">For Employers</span>
                <FaArrowDown className="text-blue-600 text-xs transition-transform duration-200 group-hover:rotate-180" />
              </div>

              {show_employer && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <For_EmployersDiv />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function For_EmployersDiv() {
  const divRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const navigate = useNavigate()

  return (
    <div 
      ref={divRef}
      className={`p-4 shadow-xl w-[200px] bg-white rounded-xl border border-gray-100 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="mb-2 pb-2 border-b border-gray-100">
          <p className="text-xs text-gray-500 font-medium">EMPLOYER ZONE</p>
        </div>
        
        <span className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <span className="text-blue-600 text-sm">🛒</span>
          </div>
          <span>Buy Online</span>
        </span>
        
        <span className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <span className="text-purple-600 text-sm">☁️</span>
          </div>
          <span>Talent Cloud</span>
        </span>
        
        <span 
          onClick={() => window.location.href = '/recruiter/login' }
          className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 group text-sm font-medium p-2 rounded-lg hover:bg-blue-50 mt-2 pt-3 border-t border-gray-100"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-500 transition-colors">
            <span className="text-white text-sm">→</span>
          </div>
          <span className="font-semibold">Employer Login</span>
        </span>
      </div>
    </div>
  );
}
