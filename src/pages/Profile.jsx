import { useEffect, useState } from "react";
import API from "../api/axios"; // Axios instance use kar rahe hain
import PostCard from "../components/PostCard"; // Jo humne abhi design kiya tha
import { User, Mail, MapPin, Calendar, Grid, Settings, Loader2 } from "lucide-react";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Custom Axios instance se headers manually nahi bhejne padenge
        const res = await API.get("/users/me");
        
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!user) return <h2 className="text-center mt-10 text-red-500 font-bold">User not found!</h2>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 🟦 Top Hero / Cover Section */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 shadow-inner"></div>

      <div className="max-w-4xl mx-auto px-4 -mt-16">
        {/* 👤 Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Avatar with Ring Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt="avatar"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">{user.username}</h2>
                  <p className="text-blue-600 font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
                    <Mail size={16} /> {user.email}
                  </p>
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 justify-center">
                  <Settings size={18} /> Edit Profile
                </button>
              </div>

              {/* Bio & Stats */}
              <p className="text-gray-600 mt-4 leading-relaxed italic italic">
                {user.bio || "No bio added yet. ✨"}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
                <div className="text-center md:text-left">
                  <span className="block text-xl font-bold text-gray-900">{posts.length}</span>
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Posts</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-xl font-bold text-gray-900">1.2k</span>
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📸 Post Section Divider */}
        <div className="flex items-center justify-center gap-2 mt-12 mb-8 border-b border-gray-200 pb-4">
          <Grid size={20} className="text-gray-500" />
          <span className="uppercase tracking-[0.2em] font-black text-gray-500 text-sm">My Creations</span>
        </div>

        {/* 📱 Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {posts.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium italic">Your creative journey starts here. Post something amazing!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                refresh={() => window.location.reload()} // Quick refresh logic
              />
            ))
          )}
        </div>
      </div>  <Footer/>
    </div>
  
  );
};

export default Profile;