# 🚀 Guide Complet de Déploiement : MERN App sur Microsoft Azure & MongoDB Atlas

Ce guide pas-à-pas accompagne le checkpoint **"Hosting a MERN App on Microsoft Azure"** pour l'application **ContactList** (MongoDB, Express, React, Node.js).

---

## 📋 Table des Matières
1. [Travail déjà réalisé sur le code](#1-travail-déjà-réalisé-sur-le-code)
2. [Étape 1 : Configuration de MongoDB Atlas (Base de données Cloud)](#étape-1--configuration-de-mongodb-atlas)
3. [Étape 2 : Création de la Web App sur Microsoft Azure](#étape-2--création-de-la-web-app-sur-microsoft-azure)
4. [Étape 3 : Déploiement continu via GitHub (Deployment Center)](#étape-3--déploiement-continu-via-github)
5. [Étape 4 : Configuration des Variables d'Environnement sur Azure](#étape-4--configuration-des-variables-denvironnement-sur-azure)
6. [Étape 5 : Test et Validation de l'application en ligne](#étape-5--test-et-validation-de-lapplication-en-ligne)
7. [Dépannage & Bonnes Pratiques](#dépannage--bonnes-pratiques)

---

## 1. Travail déjà réalisé sur le code

Votre projet a été entièrement adapté et optimisé pour la production et le cloud Azure :

| Fichier modifié / ajouté | Rôle dans le déploiement |
|---|---|
| [`Server.js`](./Server.js) | Intégration de `dotenv`, prise en charge de `process.env.PORT`, compatibilité Express 5 (`{*splat}`), et service automatique des fichiers statiques React (`public/` et `client/build`). |
| [`Config/ConnectDB.js`](./Config/ConnectDB.js) | Prise en charge de la variable d'environnement `process.env.MONGO_URI` pour se connecter à MongoDB Atlas en production. |
| [`package.json`](./package.json) | Ajout des scripts `"start": "node Server.js"` et `"build": "cd client && npm install --legacy-peer-deps && npm run build"`, définition du point d'entrée `"main": "Server.js"`. |
| [`.env.example`](./.env.example) | Modèle documenté des variables d'environnement requises. |
| [`.gitignore`](./.gitignore) | Protection des fichiers sensibles (`.env`, `node_modules`). |
| [`public/`](./public/) | Build de production optimisé du client React généré et prêt à être servi. |
| **Dépôt GitHub** | Modifications validées, commitées et poussées vers [https://github.com/rtimiimen698-commits/CHAPI](https://github.com/rtimiimen698-commits/CHAPI). |

---

## Étape 1 : Configuration de MongoDB Atlas

Comme Azure n'héberge pas nativement MongoDB, nous utilisons **MongoDB Atlas** (service Cloud officiel de MongoDB) :

1. **Créer un compte ou se connecter** :
   - Rendez-vous sur [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
   - Connectez-vous ou créez un compte gratuit.

2. **Créer un cluster gratuit** :
   - Cliquez sur **"Create a deployment"** (ou **"Build a Database"**).
   - Sélectionnez l'offre **M0 Free** (Gratuit à vie).
   - Choisissez un fournisseur Cloud (par ex. AWS ou Azure) et une région proche (par ex. *Frankfurt / eu-central-1* ou *Ireland*).
   - Cliquez sur **"Create Deployment"**.

3. **Créer un utilisateur pour la base de données (Database Access)** :
   - Dans le menu de gauche, allez dans **Security** > **Database Access**.
   - Cliquez sur **"Add New Database User"**.
   - Choisissez la méthode d'authentification : **Password**.
   - Entrez un nom d'utilisateur (ex: `admin`) et un mot de passe fort (ex: `MonMotDePasse123`). *Notez bien ce mot de passe !*
   - Attribuez le rôle **"Read and write to any database"**.
   - Cliquez sur **"Add User"**.

4. **Autoriser l'accès réseau (Network Access)** :
   - Dans le menu de gauche, allez dans **Security** > **Network Access**.
   - Cliquez sur **"Add IP Address"**.
   - Sélectionnez **"Allow Access from Anywhere"** (adresse IP : `0.0.0.0/0`).
   - *(Ceci est indispensable pour permettre à Azure Web App de communiquer avec votre base MongoDB Atlas).*
   - Cliquez sur **"Confirm"**.

5. **Récupérer la chaîne de connexion (Connection String)** :
   - Allez dans **Database** > Cliquez sur le bouton **"Connect"** de votre Cluster.
   - Choisissez **"Drivers"** (Node.js).
   - Copiez l'URL de connexion qui ressemble à :
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Remplacez `<username>` par votre utilisateur et `<password>` par votre mot de passe.
   - Ajoutez le nom de la base de données avant le `?`, par exemple `/contactlist` :
     ```text
     mongodb+srv://admin:MonMotDePasse123@cluster0.xxxxx.mongodb.net/contactlist?retryWrites=true&w=majority
     ```

---

## Étape 2 : Création de la Web App sur Microsoft Azure

1. Connectez-vous au portail Azure : [https://portal.azure.com](https://portal.azure.com).
2. Dans la barre de recherche ou l'accueil, cliquez sur **"Créer une ressource"** (*Create a resource*).
3. Cliquez sur **"Web"** puis sur **"Application web"** (*Web App*) > **Créer** (*Create*).
4. Remplissez les informations de base (*Basics*) :
   - **Abonnement** (*Subscription*) : Votre abonnement Azure actif (Azure for Students, Free Trial, ou Pay-As-You-Go).
   - **Groupe de ressources** (*Resource Group*) : Cliquez sur "Créer nouveau" et nommez-le (ex: `rg-mern-checkpoint`).
   - **Nom de l'application** (*Name*) : Choisissez un nom unique mondialement (ex: `chapi-contactlist-app`). Votre URL sera `https://chapi-contactlist-app.azurewebsites.net`.
   - **Publier** (*Publish*) : Choisissez **Code**.
   - **Pile d'exécution** (*Runtime stack*) : Choisissez **Node 18 LTS** ou **Node 20 LTS**.
   - **Système d'exploitation** (*Operating System*) : **Linux** (recommandé et plus économique).
   - **Région** (*Region*) : Choisissez une région proche (ex: *France Central*, *North Europe* ou *West Europe*).
   - **Plan de tarification** (*Pricing Plan*) :
     - Cliquez sur **"Modifier la taille"** (*Change size*).
     - Allez dans l'onglet **Dev / Test** et choisissez **F1 (Free)** pour ne rien payer.
5. Cliquez sur **Vérifier + créer** (*Review + create*), puis sur **Créer** (*Create*).
6. Patientez 1 à 2 minutes pendant le déploiement de la ressource, puis cliquez sur **"Accéder à la ressource"** (*Go to resource*).

---

## Étape 3 : Déploiement continu via GitHub

Votre code est déjà prêt et hébergé sur votre dépôt GitHub : `https://github.com/rtimiimen698-commits/CHAPI`.

1. Dans la page de votre Web App sur Azure, descendez dans le menu de gauche vers la section **Déploiement** (*Deployment*).
2. Cliquez sur **Centre de déploiement** (*Deployment Center*).
3. Dans l'onglet **Paramètres** (*Settings*) :
   - **Source** : Sélectionnez **GitHub**.
   - Autorisez Azure à accéder à votre compte GitHub si demandé.
   - **Organisation** : Sélectionnez votre compte (`rtimiimen698-commits`).
   - **Dépôt** (*Repository*) : Sélectionnez `CHAPI`.
   - **Branche** (*Branch*) : Sélectionnez `main`.
4. Cliquez sur **Enregistrer** (*Save*) en haut.
5. Azure va automatiquement créer un workflow GitHub Actions dans votre dépôt et lancer le premier déploiement !
6. Vous pouvez suivre la progression en temps réel dans l'onglet **Journaux** (*Logs*) du Deployment Center.

---

## Étape 4 : Configuration des Variables d'Environnement sur Azure

Pour que votre backend puisse se connecter à MongoDB Atlas sans exposer vos mots de passe dans le code Git :

1. Dans le menu de gauche de votre Web App sur Azure, naviguez vers **Paramètres** > **Variables d'environnement** (*Environment variables*) ou **Configuration**.
2. Dans l'onglet **Paramètres d'application** (*App settings*) :
   - Cliquez sur **+ Ajouter** (*+ Add*).
   - **Nom** : `MONGO_URI`
   - **Valeur** : Collez votre chaîne de connexion MongoDB Atlas (ex: `mongodb+srv://admin:MonMotDePasse123@cluster0.xxxxx.mongodb.net/contactlist?retryWrites=true&w=majority`).
3. (Optionnel mais recommandé) Ajoutez également :
   - **Nom** : `NODE_ENV`
   - **Valeur** : `production`
4. Cliquez sur **Appliquer** (*Apply*) puis confirmez avec **Enregistrer** (*Save*).
5. Azure redémarrera automatiquement l'application pour charger ces nouvelles variables.

---

## Étape 5 : Test et Validation de l'application en ligne

1. Retournez sur la page **Vue d'ensemble** (*Overview*) de votre Web App.
2. Cliquez sur le lien **Domaine par défaut** (*Default domain*), par exemple :
   `https://<votre-nom-d-application>.azurewebsites.net`
3. Vérifiez les fonctionnalités clés de l'application :
   - ✅ **Page d'accueil** : Chargement de la barre de navigation et du design.
   - ✅ **Liste des contacts** : Cliquez sur *"Contact List"* pour voir les contacts enregistrés.
   - ✅ **Ajout de contact** : Cliquez sur *"Add Contact"*, saisissez un nom, un email et un numéro, puis enregistrez. Le contact s'ajoute immédiatement dans MongoDB Atlas.
   - ✅ **Édition & Suppression** : Modifiez les informations d'un contact existant et testez la suppression.

---

## 🛠️ Dépannage & Bonnes Pratiques

- **L'application affiche "Application Error" :**
  - Allez dans **Flux de journaux** (*Log Stream*) dans le menu Azure pour voir les erreurs Node.js en direct.
  - Vérifiez que l'adresse IP `0.0.0.0/0` est bien autorisée dans MongoDB Atlas Network Access.
  - Vérifiez que le mot de passe dans `MONGO_URI` ne contient pas de caractères spéciaux non échappés (comme `@`, `#`, `%`). Si c'est le cas, remplacez-le par un mot de passe alphanumérique simple.
- **Mises à jour futures :**
  - À chaque fois que vous modifiez le code et faites `git push origin main`, Azure redéploie automatiquement la nouvelle version.
