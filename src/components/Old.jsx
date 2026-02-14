import { useState } from "react";
import API from "../api/axios";

function CreatePost({ refresh }) {
  const [caption, setCaption] = useState("");

 const submit = async () => {
  try {
    await API.post("/posts", { caption });
    setCaption("");
    refresh(); // Sirf success hone par refresh karega
  } catch (err) {
    alert("Post fail ho gaya: " + err.response.data.message);
  }
};

  return (
   <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-6 transition-all focus-within:shadow-md">
  {/* Header Text (Optional, looks professional) */}
  <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wider">Create a Post</h3>
  
  <textarea
    className="w-full min-h-[120px] p-4 bg-gray-50 border-none rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none resize-none"
    placeholder="What's happening?..."
    value={caption}
    onChange={(e) => setCaption(e.target.value)}
  />

  <div className="flex justify-end items-center mt-3 pt-2">
    {/* Post Button with Hover and Click Effects */}
    <button
      onClick={submit}
      className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-2 px-8 rounded-full shadow-lg shadow-blue-200 transition-all duration-200"
    >
      Post
    </button>
  </div>
</div>
  );
}

export default CreatePost;
