import { useState } from "react";
import API from "../api/axios";
import { MoreVertical, Edit3, Trash2, Save, X, Clock } from "lucide-react";

function PostCard({ post, refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [showOptions, setShowOptions] = useState(false);

  const isOwner = user?.id === post.user?._id;

  // Date and Time Formatting
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = new Date(post.createdAt).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await API.delete(`/posts/${post._id}`);
      refresh();
    }
  };

  const updatePost = async () => {
    await API.put(`/posts/${post._id}`, { caption });
    setEditing(false);
    refresh();
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl mb-6 overflow-hidden transition-all hover:shadow-md">
      
      {/* Header: User Info & Options */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.user?.avatar || "https://via.placeholder.com/40"} 
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
            alt="User"
          />
          <div>
            <h4 className="font-bold text-gray-900 leading-none">{post.user?.username}</h4>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
              <Clock size={12} />
              <span>{formattedDate} • {formattedTime}</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <MoreVertical size={20} className="text-gray-500" />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl rounded-xl z-10 overflow-hidden">
                <button 
                  onClick={() => { setEditing(true); setShowOptions(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button 
                  onClick={deletePost}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Caption Section */}
      <div className="px-4 pb-3">
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border border-blue-100 bg-blue-50/30 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 resize-none"
            />
            <div className="flex gap-2">
              <button onClick={updatePost} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <Save size={16} /> Save
              </button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-sm leading-relaxed">{post.caption}</p>
        )}
      </div>

      {/* 🖼️ Post Image Section */}
      {post.image && (
        <div className="w-full bg-gray-50 flex items-center justify-center border-t border-b border-gray-50">
          <img 
            src={post.image} 
            alt="Post content" 
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>
      )}

      {/* Footer: Interactions (Placeholder) */}
      <div className="p-4 flex gap-6 text-gray-500 border-t border-gray-50 mt-2">
         {/* Yahan aap Like/Comment buttons baad mein add kar sakte hain */}
         <span className="text-xs uppercase tracking-widest font-bold">End of Post</span>
      </div>
    </div>
  );
}

export default PostCard;
/*Date & Time: Maine timeago.js library ka use kiya hai jo 2026-02-13 jaise borring date ko "Just now" ya "2 hours ago" mein badal deti hai.

Install karein: npm install timeago.js */







/*import { useState } from "react";
import API from "../api/axios";

function PostCard({ post, refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);

  const deletePost = async () => {
    await API.delete(`/posts/${post._id}`);
    refresh();
  };

  const updatePost = async () => {
    await API.put(`/posts/${post._id}`, { caption });
    setEditing(false);
    refresh();
  };

  return (
    <div className="bg-white shadow p-4 mb-4 rounded">
      <h4 className="font-bold">{post.user?.username}</h4>

      {editing ? (
        <>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border p-1 w-full"
          />
          <button onClick={updatePost} className="bg-green-500 text-white px-2 py-1 mt-2">
            Save
          </button>
        </>
      ) : (
        <p>{post.caption}</p>
      )}

      {user?.id === post.user?._id && (
        <div className="flex gap-2 mt-2">
          <button onClick={() => setEditing(true)} className="bg-yellow-500 px-2 py-1">
            Edit
          </button>
          <button onClick={deletePost} className="bg-red-500 px-2 py-1">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;*/
