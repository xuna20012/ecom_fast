# 📧 Système de notification par email avec EmailJS (Compatible Coolify)

## 🎯 Solution implémentée

J'ai créé une solution avec **EmailJS** qui fonctionne parfaitement avec Coolify. EmailJS permet d'envoyer des emails directement depuis le frontend sans serveur backend.

## 📁 Fichiers modifiés

1. **`src/lib/emailService.ts`** - Service EmailJS configuré
2. **`package.json`** - Dépendance EmailJS ajoutée

## 🚀 Configuration EmailJS

### Étape 1 : Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com](https://www.emailjs.com)
2. Créez un compte gratuit (100 emails/mois)
3. Confirmez votre email

### Étape 2 : Configurer le service email
1. Dans le dashboard EmailJS, cliquez sur **"Email Services"**
2. Cliquez sur **"Add Service"**
3. Choisissez **"Gmail"** (recommandé)
4. Utilisez ces paramètres :
   - **Service ID** : `service_xunatech`
   - **Connectez votre Gmail** : `cheikhounafall2023@gmail.com`
5. Testez la connexion et sauvegardez

### Étape 3 : Créer le template d'email
1. Cliquez sur **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ces paramètres :
   - **Template ID** : `template_order_notification`
   - **Template Name** : `Notification Commande XunaTech`

### Étape 4 : Contenu du template

**Subject** :
```
🛒 Nouvelle commande - {{product_name}} ({{quantity}}x)
```

**Body** :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle Commande XunaTech</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333; text-align: center; margin-bottom: 20px;">🎉 Nouvelle commande reçue !</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #edc605; margin-bottom: 15px;">📦 Détails de la commande</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Produit:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{product_name}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantité:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{quantity}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Prix unitaire:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{product_price}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #edc605;">{{total_price}}</td>
                </tr>
            </table>
        </div>

        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #edc605; margin-bottom: 15px;">👤 Informations client</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nom:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_name}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_phone}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Adresse:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_address}}</td>
                </tr>
            </table>
        </div>

        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #2d5a2d;">
                <strong>💡 Action requise:</strong> Contactez le client pour confirmer la commande et organiser la livraison.
            </p>
        </div>

        <div style="text-align: center; padding: 15px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; margin: 0;">
                Commande passée le {{order_date}}
            </p>
        </div>
    </div>
</body>
</html>
```

### Étape 5 : Configuration des destinataires
Dans les paramètres du template :
- **To** : `cheikhounafall2023@gmail.com`
- **From Name** : `{{from_name}}`
- **Reply To** : `{{reply_to}}`

### Étape 6 : Récupérer la clé publique
1. Allez dans **"Account"** > **"General"**
2. Copiez votre **Public Key** (commence par un caractère aléatoire)
3. Remplacez `qDdLvqNMRSCLfnXMd` dans le fichier `src/lib/emailService.ts`

## 🚀 Déploiement

```bash
# Commiter les changements
git add .
git commit -m "feat: Add EmailJS notification system for Coolify"
git push origin main

# Déployer sur Coolify (automatique)
```

## 📧 Configuration finale

- **Service** : EmailJS avec Gmail
- **Email récepteur** : `cheikhounafall2023@gmail.com`
- **Limite gratuite** : 100 emails/mois
- **Compatibilité** : 100% Coolify

## 🔧 Fonctionnement

1. **Commande passée** → Application React appelle `sendOrderNotification()`
2. **EmailJS** → Envoi direct depuis le frontend
3. **Notification** → Email reçu instantanément

## ✅ Avantages de cette solution

- ✅ Compatible avec Coolify (pas de serveur backend requis)
- ✅ Emails HTML professionnels
- ✅ Configuration simple
- ✅ Gratuit jusqu'à 100 emails/mois
- ✅ Gestion d'erreurs robuste

## 🛠️ Dépannage

Si les emails ne sont pas envoyés :
1. Vérifiez la clé publique dans `emailService.ts`
2. Vérifiez les IDs de service et template
3. Testez directement depuis le dashboard EmailJS

## 📋 Prochaines étapes

1. **✅ Code mis à jour** - Terminé
2. **🔧 Configurer EmailJS** - Action requise
3. **🚀 Déployer sur Coolify** - Après configuration
4. **📧 Tester** - Passer une commande 