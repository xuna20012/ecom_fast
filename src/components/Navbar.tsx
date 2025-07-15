import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-600">
            Nettoyeur d'oreilles
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Testimonials
            </a>
            <a 
              href="#order-section" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Order Now <ShoppingCart className="ml-2 h-4 w-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
            <nav className="flex flex-col py-4 px-4">
              <a 
                href="#features"
                className="py-3 text-gray-700 hover:text-blue-600 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials"
                className="py-3 text-gray-700 hover:text-blue-600 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#order-section"
                className="py-3 text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Order Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;