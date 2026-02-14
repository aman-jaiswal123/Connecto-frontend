import { useState } from "react";
import API from "../api/axios";
import { Image, X, Send, Loader2 } from "lucide-react";

function CreatePost({ refresh }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const submit = async () => {
    if (!caption.trim() && !image) return alert("Please add some text or an image");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (image) formData.append("image", image);

      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCaption("");
      removeImage();
      refresh(); 
    } catch (err) {
      alert("Post failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-6 transition-all focus-within:shadow-md">
      <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wider">Create a Post</h3>
      
      <textarea
        className="w-full min-h-[100px] p-4 bg-gray-50 border-none rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none resize-none"
        placeholder="What's on your mind?..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* 🖼️ Image Preview Area */}
      {preview && (
        <div className="relative mt-3 rounded-xl overflow-hidden border border-gray-100">
          <img src={preview} alt="Selected" className="w-full max-h-80 object-cover" />
          <button 
            onClick={removeImage}
            className="absolute top-2 right-2 bg-gray-900/50 text-white p-1.5 rounded-full hover:bg-gray-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
        {/* Image Picker Button */}
        <label className="flex items-center gap-2 text-blue-600 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
          <Image size={20} />
          <span className="text-sm font-medium">Photo</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading || (!caption.trim() && !image)}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <>Post <Send size={16} /></>}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;