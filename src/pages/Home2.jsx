import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost"; // Updated path
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { Sparkles, TrendingUp, Users, Plus } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/posts");
      setPosts(data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Mock Data for Stories & Suggestions
  const stories = [
    { id: 1, name: "Your Story", img: "https://i.pravatar.cc/150?u=1", me: true },
    { id: 2, name: "Aditi", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Rahul", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Sana", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Kabir", img: "https://i.pravatar.cc/150?u=5" },
  ];

  return (
    <div className="bg-[#f8f9fd] min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-6">
        
        {/* ⬅️ Left Sidebar (Hidden on Mobile) */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-blue-500" /> Trending Topics
            </h3>
            <ul className="space-y-4">
              {["#JavaScript2024", "#ReactTips", "#TailwindCSS", "#WebDev"].map((tag) => (
                <li key={tag} className="group cursor-pointer">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{tag}</p>
                  <span className="text-[10px] text-gray-400">1.2k posts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🏛️ Main Feed (Middle) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 📱 Stories Section */}
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer group">
                <div className={`p-[2px] rounded-full border-2 ${story.me ? 'border-gray-300' : 'border-pink-500'} group-hover:scale-110 transition-transform`}>
                  <div className="relative">
                    <img src={story.img} className="w-14 h-14 rounded-full object-cover border-2 border-white" alt="" />
                    {story.me && <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white"><Plus size={10} /></div>}
                  </div>
                </div>
                <span className="text-[10px] font-medium text-gray-600 truncate w-16 text-center">{story.name}</span>
              </div>
            ))}
          </div>

          {/* ✍️ Create Post Component */}
          <CreatePost refresh={fetchPosts} />

          {/* 🛰️ Feed Header */}
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <Sparkles className="text-yellow-500" size={20} /> Latest Activity
            </h2>
            <button onClick={fetchPosts} className="text-sm font-bold text-blue-600 hover:underline">Refresh</button>
          </div>

          {/* 📜 Posts List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-3xl" />)}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} refresh={fetchPosts} />
              ))}
            </div>
          )}
        </div>

        {/* ➡️ Right Sidebar (Suggestions) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Users size={18} className="text-purple-500" /> Who to follow
            </h3>
            <div className="space-y-5">
              {[1, 2, 3].map((u) => (
                <div key={u} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=${u+10}`} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">User_{u}00</p>
                      <p className="text-[10px] text-gray-400">Suggested for you</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Follow</button>
                </div>
              ))}
            </div>
            <hr className="my-6 border-gray-50" />
            <p className="text-[10px] text-gray-400 text-center">© 2024 SocialApp • About • Help • Privacy</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;





