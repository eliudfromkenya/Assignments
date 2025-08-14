import { JSX, useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-2xl font-bold text-blue-600">
            MyBrand
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="#services"
              className="block text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Services
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
