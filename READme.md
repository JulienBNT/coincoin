# TP Individuel MERN Paris - Le Bon Coin Clone

## Contexte

Dans ce projet, nous avons développé une application web inspirée de **Le Bon Coin**, une plateforme de petites annonces. Le but était de créer un système complet de gestion des utilisateurs et des annonces en utilisant la stack MERN (MongoDB, Express, React, Node.js).

### Objectifs

- Implémenter un système d'authentification sécurisé avec **JWT** et **bcrypt**.
- Permettre la gestion (CRUD) des utilisateurs et des annonces.
- Lors de la création d'une annonce, le backend récupère automatiquement l'ID de l'auteur via le **token JWT**.
- Utiliser des **states locaux** pour gérer l'état de l'application côté frontend.

---

## Fonctionnalités

### 1. Système d'authentification

- **Inscription** :
    - Permet à un utilisateur de créer un compte en renseignant son nom, email, et mot de passe.
    - Le mot de passe est haché avec **bcrypt** avant d'être stocké dans la base de données.
  
- **Connexion** :
    - L'utilisateur peut se connecter avec son email et mot de passe.
    - Si les informations sont correctes, un **token JWT** est généré et envoyé à l'utilisateur pour sécuriser les pages protégées.

- **Pages protégées** :
    - Certaines pages (CRUD utilisateurs et annonces) nécessitent un token valide pour y accéder.

### 2. Pages principales

1. **Page d'inscription** (`/register`) :
    - Permet à l'utilisateur de créer un compte avec un nom d’utilisateur (unique), un email, et un mot de passe.
    - Validation des champs côté serveur et client.

2. **Page de connexion** (`/login`) :
    - Permet à un utilisateur de se connecter avec son email et son mot de passe.
    - Si les informations sont correctes, un **token JWT** est généré et stocké côté client.

3. **Page de gestion des annonces** :
    - Affiche une liste de toutes les annonces.
    - Permet de **créer**, **modifier** et **supprimer** des annonces.
    - Lors de la création d’une annonce, l'ID de l'utilisateur connecté est automatiquement associé à l'annonce côté backend.

---

### 3. Fonctionnalités supplémentaires

1. **Filtrage par catégorie** :
    - Les annonces peuvent être filtrées par catégorie (exemple : Immobilier, Véhicules, Électronique, etc.).
    - Un menu déroulant permet à l'utilisateur de filtrer les annonces en fonction de la catégorie sélectionnée.

2. **Détails d’une annonce** :
    - Lorsqu'un utilisateur clique sur une annonce, il est redirigé vers une page dédiée affichant :
        - Titre, description, catégorie, prix.
        - Nom de l’utilisateur ayant posté l’annonce.

---

### 4. Stack Technique

1. **Backend (Node.js/Express)**
    - Routes sécurisées pour l'authentification et les fonctionnalités CRUD des utilisateurs et des annonces.
    - **MongoDB** est utilisé pour stocker les utilisateurs et les annonces.
    - Middleware pour récupérer l'ID de l'auteur via le **token JWT** et l'ajouter aux annonces créées.

2. **Frontend (React)**
    - **Gestion de l'état** avec des **states locaux** dans React.
    - Interface simple et fonctionnelle.
    - Gestion des **tokens JWT** avec **localStorage** pour maintenir la session de l'utilisateur.

---

### 5. Installation et Lancement

#### Backend

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/JulienBNT/coincoin.git
    cd mern-bon-coin/backend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Créez un fichier `.env` dans le répertoire `backend` et ajoutez-y les variables suivantes :

    ```
    JWT_SECRET=your_secret_key
    JWT_EXPIRES_IN=1d
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Lancez le serveur backend :

    ```bash
    npm start
    ```

Le serveur backend sera disponible à l'adresse `http://localhost:8080`.

#### Frontend

1. Clonez le dépôt et allez dans le dossier frontend :

    ```bash
    git clone https://github.com/username/mern-bon-coin.git
    cd mern-bon-coin/frontend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Lancez l'application frontend :

    ```bash
    npm start
    ```

L'application frontend sera accessible à l'adresse `http://localhost:3000`.

---

### 6. Fonctionnalités Implémentées

- **Système d'authentification** :
    - Inscription et connexion des utilisateurs avec hachage du mot de passe et génération de token JWT.
    - Gestion des pages protégées nécessitant un token valide.

- **Gestion des utilisateurs** :
    - CRUD (Création, Lecture, Mise à jour, Suppression) des utilisateurs (modification non restreinte aux administrateurs).

- **Gestion des annonces** :
    - CRUD pour les annonces : ajout, modification, suppression.
    - Les annonces sont associées à l'utilisateur via le token JWT.

- **Filtrage par catégorie** :
    - Affichage des annonces filtrées par catégorie.

- **Détails d’une annonce** :
    - Affichage des informations détaillées d'une annonce lorsqu'un utilisateur clique dessus.

---

### 7. À venir / Bonus

- Améliorations possibles sur le design et l'UX.
- Ajout d'une fonction de recherche par mot-clé dans les annonces.
- Amélioration des performances pour une application plus scalable.

---

### 8. License

Ce projet est sous la **MIT License**.