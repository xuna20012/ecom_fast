# 📧 Système de notification par email avec cPanel

## 🎯 Solution implémentée

J'ai créé une solution simple qui utilise directement vos paramètres SMTP de cPanel pour envoyer des emails de notification de commande.

## 📁 Fichiers ajoutés

1. **`public/send-email.php`** - Script PHP qui utilise vos paramètres SMTP
2. **`src/lib/emailService.ts`** - Service TypeScript qui appelle le script PHP

## 🚀 Configuration et déploiement

### Étape 1 : Déployer le code
```bash
# Commiter les changements
git add .
git commit -m "feat: Add cPanel email notification system"
git push origin main

# Déployer sur Coolify
```

### Étape 2 : Copier le fichier PHP
1. Copiez le fichier `public/send-email.php` sur votre hébergement cPanel
2. Placez-le dans le dossier racine de votre domaine `shop.xunatechai.com`
3. Assurez-vous que le fichier est accessible via : `https://shop.xunatechai.com/send-email.php`

### Étape 3 : Test
1. Passez une commande sur votre site
2. Vérifiez que l'email arrive à `cheikhounafall2023@gmail.com`

## 📧 Configuration actuelle

- **Serveur SMTP** : `web58.lws-hosting.com`
- **Port** : 587
- **Email expéditeur** : `new-order@xunatech.com`
- **Email récepteur** : `cheikhounafall2023@gmail.com`

## 🔧 Fonctionnement

1. **Commande passée** → Application React appelle `sendOrderNotification()`
2. **Appel API** → `emailService.ts` envoie les données à `send-email.php`
3. **Envoi email** → Script PHP utilise `mail()` avec vos paramètres SMTP
4. **Notification** → Vous recevez un email avec tous les détails

## 📱 Template d'email

L'email contient :
- 🎉 Titre "Nouvelle commande reçue !"
- 📦 Détails de la commande (produit, quantité, prix)
- 👤 Informations client (nom, téléphone, adresse)
- 📅 Date et heure de la commande
- 💡 Instructions d'action

## ✅ Avantages

- ✅ Utilise directement vos paramètres cPanel
- ✅ Pas de services externes requis
- ✅ Compatible avec tous les hébergements cPanel
- ✅ Email HTML professionnel
- ✅ Gestion d'erreurs robuste

## 🛠️ Dépannage

Si les emails ne sont pas envoyés :
1. Vérifiez que `send-email.php` est accessible
2. Vérifiez les logs de votre hébergement cPanel
3. Testez manuellement le script PHP

## 📋 Prochaines étapes

1. **Déployez** le code sur Coolify
2. **Copiez** `send-email.php` sur votre hébergement
3. **Testez** en passant une commande
4. **Vérifiez** la réception des emails 