# Système de notification par email

## Configuration

### 1. Variables d'environnement
Créez un fichier `.env` dans le répertoire racine avec les variables suivantes :

```bash
# Configuration SMTP pour les emails de notification
SMTP_HOST=web58.lws-hosting.com
SMTP_PORT=587
SMTP_USER=new-order@xunatech.com
SMTP_PASS=P@sser12345
SMTP_FROM="Nouvelle Commande <new-order@xunatech.com>"

# Email de réception pour les notifications
NOTIFICATION_EMAIL=cheikhounafall2023@gmail.com

# Configuration Supabase
VITE_SUPABASE_URL=https://ecom.xunatechai.com
VITE_SUPABASE_ANON_KEY=votre_clé_anon_key_ici
```

### 2. Déploiement sur Vercel

1. Connectez votre projet à Vercel
2. Ajoutez les variables d'environnement dans le dashboard Vercel
3. Déployez l'application

### 3. Déploiement sur Coolify

1. Ajoutez les variables d'environnement dans Coolify
2. Assurez-vous que l'API `/api/send-email` est accessible
3. Déployez l'application

## Fonctionnement

1. **Soumission de commande** : Quand un client soumet une commande, elle est d'abord enregistrée dans Supabase
2. **Envoi d'email** : Après l'enregistrement, un email de notification est envoyé automatiquement
3. **Template d'email** : L'email contient tous les détails de la commande et les informations du client
4. **Gestion d'erreurs** : Si l'email échoue, la commande est quand même enregistrée

## Template d'email

L'email contient :
- 📦 Détails de la commande (produit, quantité, prix)
- 👤 Informations du client (nom, téléphone, adresse)
- 📅 Date et heure de la commande
- 💡 Instructions pour le traitement de la commande

## Dépannage

### L'email n'est pas envoyé
1. Vérifiez les variables d'environnement
2. Vérifiez les logs de l'API (`/api/send-email`)
3. Testez les paramètres SMTP

### Erreurs de configuration SMTP
1. Vérifiez les paramètres du serveur SMTP
2. Assurez-vous que le port 587 est ouvert
3. Vérifiez les credentials d'authentification

## Sécurité

- Les credentials SMTP sont stockés en variables d'environnement
- L'API utilise CORS pour sécuriser les requêtes
- Les mots de passe ne sont jamais exposés dans le code 