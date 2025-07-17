import emailjs from '@emailjs/browser';

interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
}

// Configuration EmailJS - Compatible avec Coolify
const EMAILJS_SERVICE_ID = 'service_xunatech';
const EMAILJS_TEMPLATE_ID = 'template_order';
const EMAILJS_PUBLIC_KEY = 'xSiBaB_4kF3cinLuY'; // Clé publique EmailJS

export const sendOrderNotification = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Initialiser EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Préparer les données pour l'email
    const templateParams = {
      to_email: 'cheikhounafall2023@gmail.com',
      from_name: 'Nouvelle Commande XunaTech',
      reply_to: 'new-order@xunatech.com',
      
      // Détails de la commande
      product_name: orderData.productName,
      quantity: orderData.quantity,
      product_price: new Intl.NumberFormat('fr-FR').format(orderData.productPrice) + ' FCFA',
      total_price: new Intl.NumberFormat('fr-FR').format(orderData.totalPrice) + ' FCFA',
      
      // Informations client
      customer_name: orderData.fullName,
      customer_phone: orderData.phone,
      customer_address: orderData.address,
      
      // Date de commande
      order_date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Message principal
      message: `🎉 NOUVELLE COMMANDE REÇUE !

📦 DÉTAILS DE LA COMMANDE:
• Produit: ${orderData.productName}
• Quantité: ${orderData.quantity}
• Prix unitaire: ${new Intl.NumberFormat('fr-FR').format(orderData.productPrice)} FCFA
• Total: ${new Intl.NumberFormat('fr-FR').format(orderData.totalPrice)} FCFA

👤 INFORMATIONS CLIENT:
• Nom complet: ${orderData.fullName}
• Téléphone: ${orderData.phone}
• Adresse: ${orderData.address}

📅 Commande passée le: ${new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

💡 ACTION REQUISE: Veuillez contacter le client pour confirmer la commande et organiser la livraison.`
    };

    // Envoyer l'email via EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email envoyé avec succès via EmailJS:', result.text);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}; 