const Footer = () => (
  <footer className="bg-white">
    <div className="container mx-auto px-6 py-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
      <p className="text-center sm:text-left mb-4 sm:mb-0">
        © {new Date().getFullYear()} ImpactConnect. All rights reserved.
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="#" className="hover:text-blue-500">
          About Us
        </a>
        <a href="#" className="hover:text-blue-500">
          Contact
        </a>
        <a href="#" className="hover:text-blue-500">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-500">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
