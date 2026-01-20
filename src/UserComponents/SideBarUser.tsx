import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { 
  BiQuestionMark, 
  BiStats, 
  BiTrendingUp, 
  BiChevronRight 
} from "react-icons/bi";
import { 
  CiSettings, 
  CiEdit,
  CiBookmark,
  CiBellOn
} from "react-icons/ci";
import { 
  FaUserCircle, 
  FaRegEye,
  FaChartLine,
  FaRegNewspaper
} from "react-icons/fa";
import { 
  GiTireIronCross 
} from "react-icons/gi";
import { 
  LuLogOut, 
  LuUser,
  LuSearch
} from "react-icons/lu";
import { 
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase
} from "react-icons/hi2";

export default function SideBarUser({ profilePic, onClose, sideBarUser }: any) {
  const [isClosing, setIsClosing] = useState(false);
  const [stats, setStats] = useState({
    searchAppearances: 0,
    recruiterActions: 0,
    lastUpdated: "Last 90 days"
  });
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  // Fetch user stats
  useEffect(() => {
    if (sideBarUser) {
      setIsClosing(false);
      // Fetch user stats from API
      fetchUserStats();
    }
  }, [sideBarUser]);

  const fetchUserStats = async () => {
    try {
      // Example API call - replace with your actual endpoint
      const response = await axios.get("https://jobportalbackend-whpt.onrender.com/user/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  function Logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const menuItems = [
    {
      icon: <FaUserCircle className="text-lg" />,
      label: "My Profile",
      href: "/IamUser/profile",
      badge: null
    },
    {
      icon: <HiOutlineBriefcase className="text-lg" />,
      label: "My Applications",
      href: "/IamUser/applicationStatus",
      badge: null
    },
    {
      icon: <CiBookmark className="text-lg" />,
      label: "Saved Jobs",
      href: "/IamUser/savedjobs",
      badge: null
    },
    {
      icon: <CiBellOn className="text-lg" />,
      label: "Notifications",
      href: "/IamUser/notifications",
      badge:null
    },
  
    {
      icon: <CiSettings className="text-lg" />,
      label: "Settings",
      href: "/settings",
      badge: null
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      onClick={handleBackdropClick}
    >
      {/* Animated Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-all duration-500 ${
          sideBarUser && !isClosing 
            ? 'opacity-50 backdrop-blur-sm' 
            : 'opacity-0 backdrop-blur-0'
        }`}
      />
      
      {/* Sidebar Container */}
      <div 
        ref={sidebarRef}
        className={`relative h-screen bg-white w-full max-w-md shadow-2xl transition-all duration-500 ease-out ${
          sideBarUser && !isClosing 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        }`}
        style={{
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-md opacity-50"></div>
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="relative w-12 h-12 rounded-full border-3 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                    <LuUser className="text-white text-xl" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {localStorage.getItem('name')?.toUpperCase() || 'User Profile'}
                </h2>
                <p className="text-sm text-gray-500">View and update your profile</p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              <GiTireIronCross className="text-gray-400 text-xl group-hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto pb-24">
          {/* Profile Section */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-3 border-white object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <LuUser className="text-white text-2xl" />
                    </div>
                  )}
                 
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {localStorage.getItem('name') || 'Complete Your Profile'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {localStorage.getItem('email')}
                  </p>
                 
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Menu
            </h4>
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                      <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <BiChevronRight className="text-gray-400 text-xl group-hover:text-gray-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>

         
        </div>

        {/* Footer with Logout */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-white/90 backdrop-blur-sm border-t border-gray-100 p-6">
          <button
            onClick={Logout}
            className="w-full flex items-center justify-center gap-3 p-3.5 bg-gradient-to-r from-red-50 to-orange-50 text-red-600 font-semibold rounded-xl border border-red-100 hover:border-red-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-white group-hover:bg-red-100 transition-colors">
              <LuLogOut className="text-red-600 text-lg group-hover:scale-110 transition-transform" />
            </div>
            <span>Logout</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">
            YuvaJobs v2.0 • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
