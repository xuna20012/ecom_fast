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
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email envoyé avec succès:', result.message);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}; 