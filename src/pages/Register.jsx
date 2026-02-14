import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle2, Loader2, Camera } from "lucide-react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // Image file store karne ke liye
  const [preview, setPreview] = useState(null); // UI mein dikhane ke liye

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Image select hone par preview dikhane ka function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const registerUser = async () => {
    // Basic Validation
    if (!username || !email || !password) {
      return setError("Required fields (Username, Email, Password) are missing!");
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // JSON ki jagah FormData use hoga kyunki file upload karni hai
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      
      if (image) {
        formData.append("image", image); // Agar image select ki hai tabhi bhejenge
      }

      const { data } = await API.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(data.message || "Account created successfully!");
      
      // Form Clear
      setUsername("");
      setEmail("");
      setPassword("");
      setImage(null);
      setPreview(null);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-1 text-sm">Join our community today</p>
        </div>

        {/* 🔴 Error Alert */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl animate-pulse">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* 🟢 Success Message */}
        {success ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle2 size={60} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-green-600">{success}</h3>
            <p className="text-gray-500 mb-6 font-medium">Please sign in to continue.</p>
            <Link
              to="/login"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 text-center"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* 📸 Profile Image Upload & Preview Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-gray-400" size={30} />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-all shadow-md active:scale-90">
                  <UserPlus size={16} />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange} 
                    accept="image/*" 
                  />
                </label>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Profile Photo (Optional)</p>
            </div>

            {/* Input Fields */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Register Button */}
            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;





/*import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    // 1. Basic Frontend Validation
    if (!username || !email || !password) {
      return setError("All fields are required!");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const { data } = await API.post("/auth/register", {
        username,
        email,
        password,
      });

      setSuccess(data.message || "Account created successfully!");
      
      // Form clear
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all">
        
        {/* Header }*//*
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm">Join our community today</p>
        </div>

        /* 🔴 Error Alert *//*
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl animate-pulse">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* 🟢 Success Message }
        {success ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle2 size={60} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{success}</h3>
            <p className="text-gray-500 mb-6">You can now sign in to your account.</p>
            <Link
              to="/login"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          /* Form Section 
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;*/