<?php
// Configuration CORS pour permettre les requêtes depuis votre domaine
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Traitement des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit();
}

// Récupérer les données JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['orderData'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Données manquantes']);
    exit();
}

$orderData = $data['orderData'];

// Utiliser la fonction mail() native de PHP (compatible avec tous les hébergements cPanel)
$to = 'cheikhounafall2023@gmail.com';
$subject = '🛒 Nouvelle commande - ' . $orderData['productName'] . ' (' . $orderData['quantity'] . 'x)';
$message = generateEmailHTML($orderData);

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Nouvelle Commande XunaTech <new-order@xunatech.com>' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'envoi de l\'email']);
}


function generateEmailHTML($orderData) {
    $orderDate = date('d F Y à H:i', time());
    $productPrice = number_format($orderData['productPrice'], 0, ',', ' ') . ' FCFA';
    $totalPrice = number_format($orderData['totalPrice'], 0, ',', ' ') . ' FCFA';
    
    return '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">🎉 Nouvelle commande reçue !</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #edc605; margin-bottom: 15px;">📦 Détails de la commande</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Produit:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars($orderData['productName']) . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantité:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . $orderData['quantity'] . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Prix unitaire:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . $productPrice . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #edc605;">' . $totalPrice . '</td>
                    </tr>
                </table>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #edc605; margin-bottom: 15px;">👤 Informations client</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nom complet:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars($orderData['fullName']) . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars($orderData['phone']) . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Adresse:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars($orderData['address']) . '</td>
                    </tr>
                </table>
            </div>

            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #2d5a2d;">
                    <strong>💡 Action requise:</strong> Veuillez contacter le client pour confirmer la commande et organiser la livraison.
                </p>
            </div>

            <div style="text-align: center; padding: 15px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                    Commande passée le ' . $orderDate . '
                </p>
            </div>
        </div>
    </div>';
}
?> 