interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
}

export const sendOrderNotification = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Préparer le message d'email
    const emailMessage = `
🎉 NOUVELLE COMMANDE REÇUE !

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

💡 ACTION REQUISE: Veuillez contacter le client pour confirmer la commande et organiser la livraison.
    `.trim();

    // Utiliser Formspree avec un endpoint pour votre domaine
    const response = await fetch('https://formspree.io/f/mjkvolql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'cheikhounafall2023@gmail.com',
        subject: `🛒 Nouvelle commande - ${orderData.productName} (${orderData.quantity}x)`,
        message: emailMessage,
        _replyto: 'new-order@xunatech.com'
      })
    });

    if (response.ok) {
      console.log('Email envoyé avec succès via Formspree');
      return true;
    } else {
      throw new Error('Erreur lors de l\'envoi via Formspree');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}; 