export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  description: string;
  stockQuantity: number;
  images: string[];
  features: {
    icon: 'truck' | 'credit-card' | 'shield';
    title: string;
    description: string;
  }[];
  reviews: Review[];
  averageRating: number;
}

export const product: Product = {
  name: "Nettoyeur d'oreille sans fil avec caméra HD",
  subtitle: "Technologie avancée pour un nettoyage sûr et efficace",
  price: 11900,
  originalPrice: 14900,
  description: `Caméra sans fil et HD: le nettoyeur d'oreille sans fil NATFIRE avec caméra offre une expérience de soin des oreilles sans tracas. Sa caméra HD assure une visualisation claire pour une élimination efficace du cérumen.`,
  stockQuantity: 18,
  images: [
    '/images/nettoyeur_oreilles.mp4',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg'
  ],
  features: [
    {
      icon: 'truck',
      title: "Livraison gratuite",
      description: "Livraison rapide et gratuite partout au Sénégal"
    },
    {
      icon: 'credit-card',
      title: "Paiement à la livraison",
      description: "En espèces ou CB"
    },
    {
      icon: 'shield',
      title: "Garantie 1 an",
      description: "Satisfait ou remboursé"
    }
  ],
  reviews: [
    {
      name: "Moussa Diop",
      rating: 5,
      comment: "Produit de très haute qualité ! Le son est excellent et la batterie dure longtemps. Je recommande vivement !",
      date: "15/03/2025",
      verified: true
    },
    {
      name: "Fatou Sow",
      rating: 5,
      comment: "La livraison était rapide et le produit est authentique. Très satisfaite de mon achat.",
      date: "14/03/2025",
      verified: true
    },
    {
      name: "Abdoulaye Ndiaye",
      rating: 4,
      comment: "Bon rapport qualité-prix. Le design est vraiment élégant.",
      date: "13/03/2025",
      verified: true
    },
    {
      name: "Aminata Fall",
      rating: 5,
      comment: "Service client excellent et produit conforme à la description.",
      date: "12/03/2025",
      verified: true
    },
    {
      name: "Ibrahima Sy",
      rating: 5,
      comment: "Meilleur achat de l'année ! La qualité est exceptionnelle.",
      date: "11/03/2025",
      verified: true
    },
    {
      name: "Aïssatou Diallo",
      rating: 4,
      comment: "Très satisfaite de la qualité sonore. Seul bémol : le temps de charge.",
      date: "10/03/2025",
      verified: true
    },
    {
      name: "Cheikh Gueye",
      rating: 5,
      comment: "Parfait pour mes besoins quotidiens. La batterie tient vraiment bien !",
      date: "09/03/2025",
      verified: true
    },
    {
      name: "Mariama Bâ",
      rating: 5,
      comment: "Excellent produit, je ne regrette pas mon achat. La livraison était rapide.",
      date: "08/03/2025",
      verified: true
    },
    {
      name: "Ousmane Kane",
      rating: 4,
      comment: "Très bon produit, mais le prix est un peu élevé.",
      date: "07/03/2025",
      verified: true
    },
    {
      name: "Rama Seck",
      rating: 5,
      comment: "La qualité est au rendez-vous. Je suis très contente de mon achat !",
      date: "06/03/2025",
      verified: true
    },
    {
      name: "Mamadou Diouf",
      rating: 5,
      comment: "Super confortable et la qualité sonore est impressionnante.",
      date: "05/03/2025",
      verified: true
    },
    {
      name: "Sokhna Ndoye",
      rating: 4,
      comment: "Bon produit dans l'ensemble. Le service après-vente est très réactif.",
      date: "04/03/2025",
      verified: true
    },
    {
      name: "Babacar Mbaye",
      rating: 5,
      comment: "Excellente expérience d'achat. Le produit est conforme aux photos.",
      date: "03/03/2025",
      verified: true
    },
    {
      name: "Khady Thiam",
      rating: 5,
      comment: "Je l'utilise tous les jours depuis un mois, aucun problème à signaler !",
      date: "02/03/2025",
      verified: true
    },
    {
      name: "Omar Fall",
      rating: 4,
      comment: "Très satisfait de la qualité. Le design est moderne et élégant.",
      date: "01/03/2025",
      verified: true
    },
    {
      name: "Adja Dieng",
      rating: 5,
      comment: "Produit authentique et de très bonne qualité. Je recommande !",
      date: "29/02/2025",
      verified: true
    },
    {
      name: "Modou Faye",
      rating: 5,
      comment: "Excellent rapport qualité-prix. La livraison était rapide et bien suivie.",
      date: "28/02/2025",
      verified: true
    },
    {
      name: "Ndeye Gueye",
      rating: 4,
      comment: "Très contente de mon achat. Le son est vraiment de qualité.",
      date: "27/02/2025",
      verified: true
    },
    {
      name: "Aliou Cissé",
      rating: 5,
      comment: "Parfait ! Rien à dire, je suis plus que satisfait de mon achat.",
      date: "26/02/2025",
      verified: true
    }
  ],
  averageRating: 4.8
};