import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { 
  X, 
  Check, 
  Truck, 
  CreditCard, 
  Shield, 
  ShoppingCart, 
  Star, 
  Phone, 
  MessageSquare,
  Play 
} from 'lucide-react';
import { product } from '../data/product';
import { supabase } from '../lib/supabase';
import { sendOrderNotification } from '../lib/emailService';

interface FormData {
  fullName: string;
  phone: string;
  address: string;
}

interface ReviewData {
  id: string;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
  created_at: string;
}

interface ReviewFormData {
  name: string;
  rating: number;
  comment: string;
}

interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
}

const iconMap = {
  truck: Truck,
  'credit-card': CreditCard,
  shield: Shield
};

const ProductOrder: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  
  // États pour le système d'avis
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    name: '',
    rating: 5,
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(product.averageRating);

  const totalPrice = product.price * quantity;
  const totalOriginalPrice = product.originalPrice * quantity;
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  // Fonction pour charger les avis depuis la base de données
  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', 'nettoyeur-oreille-camera-hd')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reviews:', error);
        return;
      }

      if (data) {
        setReviews(data);
        
        // Calculer la note moyenne
        if (data.length > 0) {
          const avgRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
          setAverageRating(Number(avgRating.toFixed(1)));
        }
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  // Fonction pour soumettre un avis
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            product_id: 'nettoyeur-oreille-camera-hd',
            name: reviewFormData.name,
            rating: reviewFormData.rating,
            comment: reviewFormData.comment,
            verified: false
          }
        ]);

      if (error) {
        console.error('Error submitting review:', error);
        alert('Une erreur est survenue lors de l\'envoi de votre avis. Veuillez réessayer.');
        return;
      }

      // Reset form and show success message
      setReviewFormData({
        name: '',
        rating: 5,
        comment: ''
      });
      setReviewSubmitted(true);
      
      // Recharger les avis
      await loadReviews();
      
      // Masquer le message de succès après 3 secondes
      setTimeout(() => {
        setReviewSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre avis. Veuillez réessayer.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Fonction pour gérer les changements dans le formulaire d'avis
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  // Fonction pour gérer les changements du select rating
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setReviewFormData(prev => ({
      ...prev,
      rating: parseInt(value)
    }));
  };

  // Charger les avis au montage du composant
  useEffect(() => {
    loadReviews();
  }, []);

  // Fonction pour vérifier si le bouton original est visible
  useEffect(() => {
    const checkButtonVisibility = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
        setIsButtonVisible(isVisible);
      }
    };

    // Vérifier au chargement
    checkButtonVisibility();

    // Écouter les événements de scroll
    const handleScroll = () => {
      checkButtonVisibility();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkButtonVisibility);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentOrderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        quantity: quantity,
        totalPrice: totalPrice,
        productName: product.name,
        productPrice: product.price
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            quantity: quantity,
            total_price: totalPrice,
            product_name: product.name,
            product_price: product.price,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      // Récupérer l'ID de la commande créée
      const orderId = data && data.length > 0 ? data[0].id : null;

      // Ajouter l'ID aux données de la commande
      const completeOrderData = {
        ...currentOrderData,
        id: orderId
      };

      // Stocker les données de la commande pour le message WhatsApp
      setOrderData(completeOrderData);

      // Envoyer l'email de notification de commande
      try {
        await sendOrderNotification(completeOrderData);
        console.log('Email de notification envoyé avec succès');
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email de notification:', emailError);
        // Ne pas interrompre le processus si l'email échoue
      }

      // Reset form and show success dialog
      setFormData({
        fullName: '',
        phone: '',
        address: ''
      });
      setQuantity(1);
      setIsOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // Fonction pour générer le message WhatsApp personnalisé
  const generateWhatsAppMessage = () => {
    if (!orderData) return '';

    const message = `Bonjour, je viens de passer une commande sur votre site :
📦 *Détails de la commande:*
• Produit: ${orderData.productName}
• Quantité: ${orderData.quantity}
• Prix unitaire: ${formatPrice(orderData.productPrice)}
• Total: ${formatPrice(orderData.totalPrice)}
👤 *Mes informations:*
• Nom: ${orderData.fullName}
• Téléphone: ${orderData.phone}
• Adresse: ${orderData.address}
`;

    return encodeURIComponent(message);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="sm:text-2xl font-bold text-black">
          {product.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="order-1 lg:order-1">
          <div className="lg:flex lg:gap-4">
            {/* Vignettes à gauche sur desktop */}
            <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:w-20">
              {product.images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative flex-shrink-0 w-full ${
                    selectedImage === index ? 'border-[#edc605]' : 'border-transparent hover:border-[#edc605]/20'
                  }`}
                >
                  {src.endsWith('.mp4') ? (
                    <>
                      <img 
                        src={product.images[1]}
                        alt={`Product video preview`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2">
                          <Play className="h-2 w-2 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={src}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Grande image */}
            <div className="flex-1">
              <div className="aspect-square rounded-lg overflow-hidden mb-4 lg:mb-0">
                {product.images[selectedImage].endsWith('.mp4') ? (
                  <video 
                    src={product.images[selectedImage]}
                    controls
                    controlsList="nodownload"
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                    poster={product.images[1]}
                  />
                ) : (
                  <img 
                    src={product.images[selectedImage]}
                    alt="Product main view"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Vignettes en dessous sur mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 lg:hidden">
            {product.images.map((src, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 ${
                  selectedImage === index ? 'border-[#edc605]' : 'border-transparent hover:border-[#edc605]/20'
                }`}
              >
                {src.endsWith('.mp4') ? (
                  <>
                    <img 
                      src={product.images[1]}
                      alt={`Product video preview`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <Play className="h-4 w-4 text-white fill-white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={src}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="order-2 lg:order-2">
          <div className="space-y-4 lg:space-y-6">
            {/* Prix */}
            <div className="lg:block">
              <div className="flex flex-wrap items-baseline gap-2 lg:flex-col lg:items-start lg:gap-3">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                  {formatPrice(product.price)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg sm:text-xl lg:text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                  <div className="text-sm lg:text-base font-medium text-green-600">
                    -{discount}%
                  </div>
                </div>
              </div>
              <div className="text-sm lg:text-base text-orange-600 font-medium mt-2">
                Plus que {product.stockQuantity} articles
              </div>
            </div>

            {/* Évaluations */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 ${
                      i < Math.floor(averageRating)
                        ? 'text-[#edc605] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm lg:text-base text-black font-medium">
                {averageRating}/5
              </span>
              <button
                onClick={() => {
                  // Déclencher un clic sur l'onglet "Avis clients"
                  const reviewsTab = document.querySelectorAll('[role="tab"]')[1];
                  if (reviewsTab) {
                    (reviewsTab as HTMLElement).click();
                    
                    // Scroll vers l'onglet après un court délai
                    setTimeout(() => {
                      reviewsTab.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }, 100);
                  }
                }}
                className="text-sm lg:text-base text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
              >
                ({reviews.length} avis)
              </button>
            </div>

            {/* Fonctionnalités */}
            <div className="space-y-3 lg:space-y-4">
              {product.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div key={index} className="flex items-center space-x-2 text-xs lg:text-sm">
                    <div className="flex-shrink-0 p-1">
                      <Icon className="h-3 w-3 lg:h-4 lg:w-4 text-[#edc605]" />
                    </div>
                    <div className="text-black">
                      <span className="font-medium">{feature.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantité et Total */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between gap-4 mb-4 lg:flex-col lg:items-start lg:gap-6">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-sm lg:text-base font-medium text-black">
                    Quantité:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300 text-base"
                  >
                    {[...Array(Math.min(5, product.stockQuantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base lg:text-lg text-black">Total:</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bouton Commander */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(true)}
              className="w-full py-3 px-6 lg:py-4 lg:px-8 bg-black text-[#edc605] font-bold text-base lg:text-lg rounded-lg hover:bg-black/90 transition duration-300 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 mr-2" />
              Commander maintenant
            </button>
          </div>
        </div>
      </div>

      {/* Onglets en bas - comme sur Alibaba */}
      <div className="mt-8 lg:mt-12">
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b border-gray-200">
            {['Description', 'Avis clients'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `flex-1 py-3 lg:py-4 text-sm lg:text-base font-medium focus:outline-none ${
                    selected
                      ? 'text-[#edc605] border-b-2 border-[#edc605]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6 lg:mt-8">
            <Tab.Panel>
              <div className="prose prose-sm lg:prose-base max-w-none text-black">
                <p className="text-sm lg:text-base leading-relaxed">{product.description}</p>
                
                <div className="mt-6 lg:mt-8">
                  <div className="rounded-lg overflow-hidden">
                    <video 
                      src="/images/nettoyeur_oreilles.mp4"
                      controls
                      controlsList="nodownload"
                      muted
                      autoPlay
                      className="w-full h-auto"
                      poster="/images/2.jpg"
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
                            <Tab.Panel>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Achat vérifié
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-[#edc605] fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-black text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Formulaire d'avis */}
      <div className="mt-8 lg:mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg lg:text-xl font-semibold text-black mb-4">
          Laisser un avis
        </h3>
        
        {reviewSubmitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            <p className="text-sm font-medium">
              Merci pour votre avis ! Il a été soumis avec succès.
            </p>
          </div>
        )}
        
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reviewName" className="block text-sm font-medium text-black mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reviewName"
                name="name"
                value={reviewFormData.name}
                onChange={handleReviewChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300"
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label htmlFor="reviewRating" className="block text-sm font-medium text-black mb-1">
                Note <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                                  <select
                    id="reviewRating"
                    name="rating"
                    value={reviewFormData.rating}
                    onChange={handleRatingChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300"
                  >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} étoile{rating > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < reviewFormData.rating
                          ? 'text-[#edc605] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="reviewComment" className="block text-sm font-medium text-black mb-1">
              Commentaire <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reviewComment"
              name="comment"
              value={reviewFormData.comment}
              onChange={handleReviewChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300 resize-none"
              placeholder="Partagez votre expérience avec ce produit..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmittingReview}
            className="w-full md:w-auto px-6 py-3 bg-black text-[#edc605] font-bold rounded-lg hover:bg-black/90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingReview ? 'Envoi en cours...' : 'Publier l\'avis'}
          </button>
        </form>
      </div>

      {/* Order Form Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg sm:text-xl font-semibold text-black">
                Finaliser votre commande
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">
                  Prénom & Nom
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-black mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edc605] focus:border-[#edc605] outline-none transition-colors duration-300"
                  placeholder=""
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-black mb-4">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Paiement à la livraison
                </div>

                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-black">Total à payer:</span>
                  <span className="text-xl font-bold text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-black text-[#edc605] font-bold rounded-lg hover:bg-black/90 transition duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Traitement en cours...'
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      TERMINER
                    </>
                  )}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <Dialog.Title className="text-xl font-semibold text-black mb-2">
                Commande enregistrée avec succès!
              </Dialog.Title>
              <p className="text-gray-600">
                Notre équipe vous contactera bientôt pour confirmer votre commande.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+221789282535"
                className="w-full flex items-center justify-center px-4 py-3 bg-black text-[#edc605] rounded-lg hover:bg-black/90 transition duration-300 font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Appeler maintenant
              </a>

              <a
                href={`https://wa.me/221789282535${orderData ? `?text=${generateWhatsAppMessage()}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#25D366]/90 transition duration-300 font-medium"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Envoyer un message WhatsApp
              </a>

              <button
                onClick={() => setIsSuccessOpen(false)}
                className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 transition duration-300"
              >
                Fermer
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Bouton fixé en bas d'écran - Responsive */}
      {!isButtonVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 sm:p-4 shadow-lg">
          <div className="container mx-auto max-w-[1200px]">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <img 
                  src={product.images[1]}
                  alt="Product"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-black truncate">{product.name}</p>
                  <p className="text-sm sm:text-lg font-bold text-black">{formatPrice(totalPrice)}</p>
                </div>
              </div>
                              <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-[#edc605] font-bold rounded-lg hover:bg-black/90 transition duration-300 flex items-center text-sm sm:text-base flex-shrink-0"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  Commander maintenant
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOrder;