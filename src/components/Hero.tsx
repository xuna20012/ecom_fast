import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxEffect = scrollPosition * 0.4;
      heroRef.current.style.transform = `translateY(${parallaxEffect}px)`;
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 z-0"></div>
      
      <div className="container mx-auto px-4 pt-12 pb-24 md:pt-32 md:pb-40 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionize Your <span className="text-blue-600">Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              Discover our latest innovation that perfectly blends style, functionality, and performance. Engineered for excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a 
                href="#order-section" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Order Now
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                Learn More <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2" ref={heroRef}>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="/images/2.jpg" 
                alt="Product showcase" 
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-700 w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;