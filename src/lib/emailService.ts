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
    // Utiliser le script PHP sur votre domaine
    const response = await fetch('https://shop.xunatechai.com/send-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        orderData: orderData
      })
    });

    if (response.ok) {
      console.log('Email envoyé avec succès via PHP');
      return true;
    } else {
      throw new Error('Erreur lors de l\'envoi via PHP');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}; 