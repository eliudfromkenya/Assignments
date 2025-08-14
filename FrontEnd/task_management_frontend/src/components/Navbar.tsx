import { JSX, useState } from "react";
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard, Home as HomeIcon, LogIn, UserPlus, Users as UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthenticationContext";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu on logout
  };

  return (
    <nav className="bg-white shadow-md border-b border-greenish-100 sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-extrabold text-primary-600 hover:text-primary-700 transition-colors duration-200 ease-in-out">
              Task Interview Assignment
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 ease-in-out flex items-center">
                  <LayoutDashboard size={18} className="mr-1" /> Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin/users" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 ease-in-out flex items-center">
                    <UsersIcon size={18} className="mr-1" /> Users
                  </Link>
                )}
                <span className="text-gray-700 flex items-center">
                  <UserIcon size={18} className="mr-1" /> {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 ease-in-out shadow-sm"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 ease-in-out flex items-center">
                  <HomeIcon size={18} className="mr-1" /> Home
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 ease-in-out flex items-center">
                  <LogIn size={18} className="mr-1" /> Login
                </Link>
                <Link to="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 ease-in-out shadow-sm">
                  <UserPlus size={18} className="mr-2" /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none transition-colors duration-200 ease-in-out"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-greenish-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-greenish-50 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                  onClick={toggleMenu}
                >
                  <LayoutDashboard size={18} className="inline-block mr-2" /> Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin/users"
                    className="block px-3 py-2 text-gray-700 hover:bg-greenish-50 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                    onClick={toggleMenu}
                  >
                    <UsersIcon size={18} className="inline-block mr-2" /> Users
                  </Link>
                )}
                <span className="block text-gray-700 px-3 py-2 flex items-center">
                  <UserIcon size={18} className="inline-block mr-2" /> {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                >
                  <LogOut size={18} className="inline-block mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:bg-greenish-50 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                  onClick={toggleMenu}
                >
                  <HomeIcon size={18} className="inline-block mr-2" /> Home
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-greenish-50 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                  onClick={toggleMenu}
                >
                  <LogIn size={18} className="inline-block mr-2" /> Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200 ease-in-out flex items-center"
                  onClick={toggleMenu}
                >
                  <UserPlus size={18} className="inline-block mr-2" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
