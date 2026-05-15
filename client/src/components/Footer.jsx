import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-10 py-10 dark:bg-slate-950">
      
      <div className="grid md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold text-red-500">
            BloodBank
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            AI-powered blood donation management system connecting donors,
            hospitals, and patients in real-time.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Supports EN, HI, BN, MR and more Indian languages.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/find-blood" className="hover:text-white transition">
                Find Blood
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-white transition">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/hospitals" className="hover:text-white transition">
                Hospitals
              </Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-white transition">
                Emergency
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-3">Contact Us</h3>
          <p className="text-gray-400 text-sm">
            📧 info@bloodconnect.ai
          </p>
          <p className="text-gray-400 text-sm mt-2">
            📞 +91 98765 43210
          </p>
          <p className="text-gray-400 text-sm mt-2">
            📍 New Delhi, India
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-3">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-3">
            Get updates on blood camps & availability
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="p-2 w-full text-black rounded-l"
            />
            <button className="bg-red-500 px-4 rounded-r">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-5 text-sm">
        © 2026 BloodBank. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;