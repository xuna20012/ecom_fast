const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderData } = req.body;

    if (!orderData) {
      return res.status(400).json({ message: 'Order data is required' });
    }

    // Configuration SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'web58.lws-hosting.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'new-order@xunatech.com',
        pass: process.env.SMTP_PASS || 'P@sser12345'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Template d'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; text-align: center; margin-bottom: 20px;">🎉 Nouvelle commande reçue !</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #edc605; margin-bottom: 15px;">📦 Détails de la commande</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Produit:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderData.productName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantité:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderData.quantity}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Prix unitaire:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Intl.NumberFormat('fr-FR').format(orderData.productPrice)} FCFA</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #edc605;">${new Intl.NumberFormat('fr-FR').format(orderData.totalPrice)} FCFA</td>
              </tr>
            </table>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #edc605; margin-bottom: 15px;">👤 Informations client</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nom complet:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Adresse:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderData.address}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #2d5a2d;">
              <strong>💡 Action requise:</strong> Veuillez contacter le client pour confirmer la commande et organiser la livraison.
            </p>
          </div>

          <div style="text-align: center; margin-top: 20px; padding: 15px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Commande passée le ${new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Nouvelle Commande" <new-order@xunatech.com>',
      to: process.env.NOTIFICATION_EMAIL || 'cheikhounafall2023@gmail.com',
      subject: `🛒 Nouvelle commande - ${orderData.productName} (${orderData.quantity}x)`,
      html: emailHtml
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error: error.message });
  }
} 