# Boat & Car 06 — Site vitrine

Site vitrine statique (HTML / CSS / JS, sans framework ni serveur) pour la vente de véhicules d'occasion : voitures, camionnettes/utilitaires, motos et bateaux. Direction artistique épurée inspirée de la Côte d'Azur (azur, turquoise, terracotta).

Aucune commande de build n'est nécessaire : ce sont des fichiers statiques, prêts pour **GitHub Pages**.

## Structure du projet

```
index.html         Page d'accueil (hero + recherche rapide, catégories, offres vedettes, avis, dernières ventes)
offres.html         Liste filtrable de toutes les annonces
vehicule.html        Fiche détail d'un véhicule (?id=...)
contact.html         Coordonnées + formulaire de contact
a-propos.html        Présentation + mentions légales (RCS, SIRET, etc.)
404.html              Page d'erreur personnalisée

style.css             Toute la feuille de style (thème "Riviera")
main.js               Logique commune à toutes les pages publiques (annonces, filtres, formulaires)
admin.js               Connexion + espace admin (intégrés sur chaque page, voir plus bas)

data-config.js         Coordonnées de la société, réglages du formulaire
data-brands.js         Types de véhicules + marques disponibles (menus déroulants)
data-listings.js       LA BASE DE DONNÉES DES ANNONCES
data-sales.js          Dernières ventes affichées en page d'accueil
data-reviews.js         Avis clients affichés en page d'accueil
```

## 1. Personnaliser les informations de la société

Ouvrez **`data-config.js`** et modifiez : nom, téléphone, email, adresse, horaires. Ces valeurs se mettent à jour automatiquement sur toutes les pages. L'adresse actuellement renseignée est le siège social officiel (source : extrait Kbis).

## 2. Mentions légales

La page **`a-propos.html`**, section "Mentions légales", contient les informations publiques issues de l'extrait Kbis (RCS Grasse, SIRET/n° de gestion, forme juridique, capital, siège social, représentant légal, activités). Volontairement, aucune donnée personnelle privée du dirigeant (date/lieu de naissance, domicile personnel, nationalité) n'est publiée. Il ne reste qu'à compléter le **numéro de TVA intracommunautaire** une fois obtenu.

## 3. Espace admin — ajouter / retirer des annonces

Il n'y a **pas d'URL séparée** : l'espace admin est intégré à chaque page du site, derrière l'icône **Connexion** 👤 en haut à droite du menu.

1. Cliquez sur l'icône Connexion.
2. Identifiez-vous avec les identifiants par défaut : **admin** / **bcar06** (à changer dans `admin.js`, constantes `ADMIN_USER` et `ADMIN_PASS`, tout en haut du fichier).
3. Le panneau "Espace admin" s'ouvre : formulaire pour ajouter une annonce à gauche, liste des annonces actuelles à droite (bouton ✕ pour retirer, ✓ pour basculer disponible/réservé).
4. Le bloc "Code à publier" se met à jour automatiquement. Cliquez sur **"Copier le code"**.
5. Sur GitHub, ouvrez `data-listings.js`, remplacez tout son contenu par le code copié, puis validez (commit + push).
6. Le site se republie automatiquement en 1 à 2 minutes.

Une fois connecté, l'icône reste active tant que l'onglet du navigateur est ouvert (déconnexion via le bouton dédié dans le panneau, ou en fermant l'onglet).

> ⚠️ **Important — limite de sécurité.** Le site étant 100 % statique (hébergement GitHub Pages, sans serveur), cette connexion est un simple verrou côté navigateur : pratique pour ne pas exposer l'outil de gestion au premier visiteur venu, mais **pas une sécurité réelle** — le mot de passe reste visible dans le code source de `admin.js` pour qui va chercher. Pour une vraie authentification (utile si vous confiez l'accès à plusieurs personnes ou stockez des informations sensibles), il faudra à terme un petit service côté serveur (ex. Cloudflare Workers, Supabase, Firebase Auth...). En l'état, ne mettez rien de confidentiel dans les annonces.

## 4. Recevoir les demandes de contact

Par défaut, chaque formulaire ("Je suis intéressé", page Contact) ouvre un e-mail pré-rempli vers l'adresse définie dans `data-config.js` — aucune configuration nécessaire.

Pour recevoir les demandes directement (sans dépendre du client mail du visiteur) :
1. Créez un formulaire gratuit sur [Formspree](https://formspree.io) ou [EmailJS](https://www.emailjs.com/).
2. Copiez l'URL du endpoint fourni.
3. Collez-la dans `data-config.js`, champ `formEndpoint`.

## 5. Publier le site sur GitHub Pages

1. Créez un dépôt GitHub (public, requis pour GitHub Pages gratuit) et importez-y tous les fichiers de ce projet (à la racine du dépôt).
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**, branche **main**, dossier **/ (root)**. Enregistrez.
4. Après 1 à 2 minutes, votre site est en ligne à l'adresse `https://<votre-compte>.github.io/<nom-du-depot>/`.

Chaque modification poussée sur la branche `main` (nouvelle annonce, texte modifié, etc.) republie automatiquement le site en quelques minutes.

## 6. Remplacer les visuels

Les véhicules sont illustrés par des icônes vectorielles (silhouettes) plutôt que des photos, pour un rendu homogène sans dépendre de droits d'image. Pour utiliser de vraies photos de vos véhicules : ajoutez vos images dans le dossier du projet et remplacez, dans `main.js` (fonction `vehicleIcon`) ou directement dans les cartes, le SVG par une balise `<img src="...">`.

## 7. Personnalisation visuelle

Les couleurs, polices et espacements sont centralisés en haut de `style.css` (bloc `:root`, "Design tokens") : ajustez `--azure`, `--turquoise`, `--terracotta`, `--stripe-1/2/3` etc. pour affiner l'identité visuelle.
