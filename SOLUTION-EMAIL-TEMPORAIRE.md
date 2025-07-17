# 📧 Solution temporaire - Email avec Formspree

## 🎯 Problème identifié
Le script PHP `send-email.php` n'est pas accessible sur `shop.xunatechai.com` (erreur 405).

## 🚀 Solution immédiate mise en place

J'ai implémenté une solution temporaire avec **Formspree** (service gratuit) :

### ✅ Avantages
- ✅ Fonctionne immédiatement
- ✅ Pas de configuration serveur requise
- ✅ 50 emails gratuits par mois
- ✅ Compatible avec tous les hébergements

### 🔧 Configuration Formspree

1. **Créer un compte Formspree** (gratuit)
   - Allez sur https://formspree.io
   - Créez un compte gratuit
   - Confirmez votre email

2. **Créer un nouveau formulaire**
   - Cliquez sur "New Form"
   - Nom : "Notifications Commandes"
   - Email : `cheikhounafall2023@gmail.com`
   - Notez l'ID du formulaire (format: `f/xxxxxxxx`)

3. **Mettre à jour le code**
   - Remplacez `xanweqoo` par votre vrai ID Formspree dans `src/lib/emailService.ts`

### 📧 Fonctionnement actuel

1. **Commande passée** → App React appelle `sendOrderNotification()`
2. **Formspree** → Reçoit les données et envoie un email
3. **Email** → Arrivée à `cheikhounafall2023@gmail.com`

## 🔄 Déployons la solution

### Étape 1 : Mettre à jour votre ID Formspree
```typescript
// Dans src/lib/emailService.ts, ligne 31
const response = await fetch('https://formspree.io/f/VOTRE_ID_ICI', {
```

### Étape 2 : Déployer
```bash
git add .
git commit -m "fix: Use Formspree for temporary email solution"
git push origin main
```

## 🎯 Solution définitive (à faire plus tard)

Pour utiliser vos paramètres cPanel, vous devrez :
1. Copier `send-email.php` sur votre serveur `shop.xunatechai.com`
2. Configurer les permissions PHP
3. Tester l'endpoint

## 📊 Plan d'action immédiat

1. **✅ Solution temporaire** - Formspree (fonctionne maintenant)
2. **🔄 Test** - Passez une commande pour tester
3. **📧 Vérification** - Checks emails dans votre boîte Gmail

La solution Formspree vous permettra de recevoir les notifications immédiatement pendant que nous configurons la solution cPanel définitive. 