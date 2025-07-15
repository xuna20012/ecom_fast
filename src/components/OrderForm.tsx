import React, { useState } from 'react';
import { CheckCircle, Package, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  quantity: number;
  paymentMethod: string;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    quantity: 1,
    paymentMethod: 'creditCard'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.country) newErrors.country = "Country is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        
        // Reset form after submission
        console.log('Order submitted:', formData);
      }, 1500);
    }
  };

  const productPrice = 99.99;
  const shippingPrice = 0; // Free shipping
  const totalPrice = productPrice * formData.quantity + shippingPrice;

  if (submitted) {
    return (
      <div className="container mx-auto px-4 max-w-2xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Your order has been successfully placed. We've sent a confirmation to your email.
          </p>
          <p className="text-gray-600 mb-8">
            Order reference: <span className="font-medium">ORD-{Math.floor(Math.random() * 100000)}</span>
          </p>
          <button 
            onClick={() => window.location.href = '#'}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Your Order</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Just a few steps away from experiencing our premium product.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
                  </p>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-8">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.address}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.city}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code*
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.postalCode}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country*
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="fr">France</option>
                  <option value="de">Germany</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.country}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h3>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <input
                  id="creditCard"
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === 'creditCard'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="creditCard" className="ml-2 flex items-center text-gray-700">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-600" /> Credit Card
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="paypal"
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="paypal" className="ml-2 flex items-center text-gray-700">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.067 7.389C20.067 9.312 19.214 10.794 17.611 11.836C16.095 12.841 13.965 13.344 11.429 13.344H9.096L7.4 22H3L6.663 2H14.675C16.323 2 17.598 2.312 18.5 2.935C19.547 3.657 20.07 5.082 20.067 7.389Z" fill="#003087"/>
                    <path d="M21 5.389C21 7.312 20.147 8.794 18.544 9.836C17.028 10.841 14.898 11.344 12.362 11.344H10.029L8.333 20H3.933L7.598 0H15.608C17.256 0 18.531 0.312 19.433 0.935C20.48 1.657 21.004 3.082 21 5.389Z" fill="#0070E0"/>
                  </svg>
                  PayPal
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start">
              <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <p className="text-sm text-gray-700">
                Your payment information is encrypted and secure. We never store your credit card details.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Processing...' : 'Complete Order'}
            </button>
          </form>
        </div>
        
        <div className="lg:w-2/5">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-28">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Product" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Premium Product X</h4>
                <p className="text-gray-600 text-sm">Exclusive Model</p>
                <p className="text-blue-600 font-medium mt-1">${productPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${(productPrice * formData.quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="text-gray-900">{formData.quantity}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Including VAT/taxes</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Package className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Express Shipping</p>
                  <p className="text-xs text-gray-600">2-3 business days delivery</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">30-Day Money-Back Guarantee</p>
                  <p className="text-xs text-gray-600">Not satisfied? Get a full refund.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;