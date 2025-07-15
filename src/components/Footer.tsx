import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="/images/logoXunaTECH.jpeg" 
              alt="XunaTech Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Votre partenaire de confiance pour des produits innovants et de qualité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+221789282535"
                  className="flex items-center text-gray-400 hover:text-[#edc605] transition-colors duration-300"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +221 78 928 25 35
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@xunatech.com"
                  className="flex items-center text-gray-400 hover:text-[#edc605] transition-colors duration-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  contact@xunatech.com
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>Dakar, Sénégal</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Service client</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  Retours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#edc605] transition-colors duration-300">
                  SAV
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} XunaTech. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;