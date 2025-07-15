import React from 'react';
import { CheckCircle, Zap, Shield, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Lightning Fast Performance",
    description: "Equipped with the latest technology to ensure smooth operation and quick response times.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Unmatched Durability",
    description: "Built to last with premium materials and rigorous quality control standards.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    title: "Innovative Design",
    description: "Thoughtfully designed with cutting-edge features and elegant aesthetics.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    title: "Superior Quality",
    description: "Each product undergoes extensive testing to ensure it meets our high standards.",
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Product?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We've designed our product with your needs in mind, focusing on what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Exclusive Launch Offer
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                For a limited time, get our premium product at a special introductory price with free shipping included.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "30-day money-back guarantee",
                  "Free express shipping",
                  "24/7 customer support",
                  "Extended 2-year warranty"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#order-section" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                Claim Offer Now
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Product package" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;