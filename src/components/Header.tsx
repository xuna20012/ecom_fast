import React from 'react';
import { Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="./images/logoXunaTECH.jpeg" 
              alt="XunaTech Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <a
            href="tel:+221789282535"
            className="inline-flex items-center px-4 py-2 bg-[#edc605] text-black font-medium rounded-lg hover:bg-[#edc605]/90 transition-all duration-300"
          >
            <Phone className="h-4 w-4 mr-2" />
            Appeler
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;