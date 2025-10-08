import { Bell, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import useUserStore from "../../store/userStore";

const LoggedInHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <div className="text-xl font-bold text-gray-900">ImpactConnect</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
          >
            Explore
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
          >
            My Impact
          </a>
        </nav>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1193d4]/50"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="h-6 w-6 text-gray-600" />
        </button>
        <button className="rounded-full">
          <img
            className="h-9 w-9 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
            alt="User avatar"
          />
        </button>
      </div>
      <div className="md:hidden">
        <button className="text-gray-900 focus:outline-none">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
};

const LoggedOutHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900">ImpactConnect</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
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
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-[#f6f7f8]">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#1193d4]"
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
    </>
  );
};

const Header = () => {
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn);

  return (
    <header className="relative z-20 bg-[#f6f7f8] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        {isUserLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
      </div>
    </header>
  );
};

export default Header;
