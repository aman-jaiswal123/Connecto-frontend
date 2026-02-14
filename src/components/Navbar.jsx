import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { 
  Home, 
  Compass, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  PlusSquare,
  Search
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getLatestUser = async () => {
      if (!token) return;
      try {
        const res = await API.get("/users/me");
        setUserData(res.data.user);
      } catch (err) {
        if (err.response?.status === 401) logout();
      }
    };
    getLatestUser();
  }, [token]);

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Helper to check active route styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 🚀 Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <PlusSquare className="text-white" size={24} />
          </div>
          <span className="font-black text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
            SOCIALAPP
          </span>
        </Link>

        {/* 🔍 Search Bar (Modern Integrated) */}
        <div className="hidden md:flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-4 py-1.5 focus-within:border-blue-500 focus-within:bg-gray-800 transition-all w-64">
          <Search size={18} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search creators..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 text-white placeholder-gray-500 w-full"
          />
        </div>

        {/* 📱 Navigation Links & Profile */}
        <div className="flex items-center gap-2 sm:gap-6">
          
          {/* Main Icons */}
          <div className="flex items-center gap-1 sm:gap-4 border-r border-gray-800 pr-2 sm:pr-6">
            <Link to="/" title="Home" className={`p-2 rounded-xl transition-all ${isActive('/') ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <Home size={22} />
            </Link>
            <Link to="/explore" title="Explore" className={`p-2 rounded-xl transition-all ${isActive('/explore') ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <Compass size={22} />
            </Link>
            <Link to="/notifications" title="Notifications" className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </Link>
          </div>

          {userData ? (
            <div className="relative">
              {/* Profile Trigger */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 bg-gray-800/50 hover:bg-gray-800 rounded-full border border-gray-700 transition-all active:scale-95"
              >
                <img
                  src={userData.avatar || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-blue-500 object-cover"
                />
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* ✨ Animated Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-52 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-800 mb-2">
                      <p className="text-sm font-bold truncate">{userData.username}</p>
                      <p className="text-[10px] text-gray-500 truncate italic">{userData.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <UserIcon size={16} /> My Profile
                    </Link>
                    
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-white px-4 py-2 transition-all">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                Join Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


/*import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios"; // Aapka Axios instance

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getLatestUser = async () => {
      if (!token) return;
      try {
        // Backend se latest data lena (avatar ke saath)
        const res = await API.get("/users/me");
        setUserData(res.data.user);
      } catch (err) {
        console.log("Navbar fetch error:", err);
        // Agar token expire ho jaye toh logout kar dein
        if (err.response?.status === 401) logout();
      }
    };

    getLatestUser();
  }, [token]); // Jab token change ho tab fetch kare

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-xl text-blue-400">SocialApp</Link>

      <div className="flex items-center gap-4">
        {userData ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-all">
              <span className="text-sm font-medium">{userData.username}</span>
              <img
                src={userData.avatar || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/register" className="bg-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-all">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
------------------------------------------------------------------------------------

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">SocialApp</Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to={`/profile`}>
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                className="w-10 h-10 rounded-full"
              />
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/
