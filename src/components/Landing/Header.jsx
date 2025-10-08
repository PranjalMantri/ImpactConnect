import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-20 bg-[#f6f7f8] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">ImpactConnect</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
              href="#"
            >
              About
            </a>
            <a
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
              href="#"
            >
              Projects
            </a>
            <a
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
              href="#"
            >
              NGOs
            </a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button className="rounded-lg h-10 px-4 text-sm font-bold bg-[#1193d4]/20 text-[#1193d4] hover:bg-[#1193d4]/30">
              Log In
            </button>
            <button className="rounded-lg h-10 px-4 text-sm font-bold bg-[#1193d4] text-white hover:opacity-90">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-[#f6f7f8]">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <a
                className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
                href="#"
              >
                About
              </a>
              <a
                className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
                href="#"
              >
                Projects
              </a>
              <a
                className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
                href="#"
              >
                NGOs
              </a>
              <div className="flex flex-col items-center space-y-4 w-full px-4 pt-4 border-t border-gray-200">
                <button className="w-full rounded-lg h-10 px-4 text-sm font-bold bg-[#1193d4]/20 text-[#1193d4] hover:bg-[#1193d4]/30">
                  Log In
                </button>
                <button className="w-full rounded-lg h-10 px-4 text-sm font-bold bg-[#1193d4] text-white hover:opacity-90">
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
