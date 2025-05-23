
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">StudioStash</h3>
            <p className="text-sm leading-relaxed">
              Connecting creators to podcast studios in 24 countries and 10,000+ cities. Find the
              best recording studios, equipment, and spaces around you.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="#" className="hover:text-white transition">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">For Studios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition">Partner With Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Apps For You</Link></li>
              <li><Link to="#" className="hover:text-white transition">Business App</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">For You</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition">Privacy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms</Link></li>
              <li><Link to="#" className="hover:text-white transition">Security</Link></li>
              <li><Link to="#" className="hover:text-white transition">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-gray-700" />
        
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} StudioStash. All rights reserved.</p>
          <p className="mt-2">
            Built for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
