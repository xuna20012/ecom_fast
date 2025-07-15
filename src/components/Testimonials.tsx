import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Product Designer",
    quote: "This product has completely transformed my workflow. The intuitive design and powerful features make it a must-have for professionals.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5
  },
  {
    name: "Sarah Miller",
    role: "Marketing Director",
    quote: "I've tried similar products in the past, but none compare to the quality and performance of this one. Absolutely worth every penny!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    quote: "The attention to detail in this product is remarkable. It's clear that a lot of thought went into creating something truly exceptional.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 4
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about our product.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-lg md:text-xl italic text-gray-700">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;