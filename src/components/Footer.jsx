import { Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800 pb-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SocialApp
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connecting people through technology. Build your network, share your thoughts, and stay inspired every day.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="/profile" className="hover:text-blue-400 transition-colors">My Profile</a></li>
            <li><a href="/settings" className="hover:text-blue-400 transition-colors">Settings</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/_amann_23?igsh=cXpkN203OGxzbG9s" target="_blank" rel="noreferrer" 
               className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-all transform hover:-translate-y-1">
              <Instagram size={20} />
            </a>
            <a href="www.linkedin.com/in/aman-jaiswal-052220225"
             target="_blank" rel="noreferrer" 
               className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition-all transform hover:-translate-y-1">
              <Linkedin size={20} />
            </a>
            <a href="https://www.facebook.com/share/1C4hqojreZ/" target="_blank" rel="noreferrer" 
               className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all transform hover:-translate-y-1">
              <Facebook size={20} />
            </a>
            <a href="https://github.com/aman-jaiswal123" target="_blank" rel="noreferrer" 
               className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all transform hover:-translate-y-1">
              <Github size={20} />
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
            <Mail size={16} />
            <span>amanajsjrj@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} SocialApp. Made with ❤️ for Creators.
      </div>
    </footer>
  );
}

export default Footer;


/*Maine lucide-react use kiya hai. Ise install karne ke liye terminal mein chalayein:
npm install lucide-react */