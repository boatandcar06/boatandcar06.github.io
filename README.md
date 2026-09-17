# Boat & Car 06 — Site vitrine

Site vitrine statique (HTML / CSS / JS, sans framework ni serveur) pour la vente de véhicules d'occasion : voitures, camionnettes/utilitaires, motos et bateaux. Thème sombre "prestige" inspiré des univers BMW M / Audi RS.

Aucune commande de build n'est nécessaire : ce sont des fichiers statiques, prêts pour **GitHub Pages**.

## Structure du projet

```
index.html         Page d'accueil (hero, catégories, offres vedettes, avis, dernières ventes)
offres.html         Liste filtrable de toutes les annonces
vehicule.html        Fiche détail d'un véhicule (?id=...)
contact.html         Coordonnées + formulaire de contact
a-propos.html        Présentation + mentions légales (SIRET, etc.)
admin.html            Outil pour ajouter / retirer des annonces (usage interne, hors menu)
404.html              Page d'erreur personnalisée

style.css             Toute la feuille de style (thème prestige)
main.js               Logique commune à toutes les pages publiques
admin.js               Logique de la page admin

data-config.js         Coordonnées de la société, réglages du formulaire
data-brands.js         Types de véhicules + marques disponibles (menus déroulants)
data-listings.js       LA BASE DE DONNÉES DES ANNONCES
data-sales.js          Dernières ventes affichées en page d'accueil
data-reviews.js         Avis clients affichés en page d'accueil
```

## 1. Personnaliser les informations de la société

Ouvrez **`data-config.js`** et modifiez : nom, téléphone, email, adresse, horaires. Ces valeurs se mettent à jour automatiquement sur toutes les pages.

## 2. Compléter les mentions légales

Ouvrez **`a-propos.html`**, section "Mentions légales" : remplacez chaque `[À compléter]` (SIRET, RCS, capital social, hébergeur...) par les informations officielles de votre société (extrait Kbis / INSEE). Rien n'a été inventé volontairement.

## 3. Ajouter / retirer des annonces

Deux méthodes :

**A. Directement dans le code (recommandé pour un usage régulier)**
Ouvrez `data-listings.js` : chaque véhicule est un bloc `{ ... }` dans le tableau `LISTINGS`. Copiez un bloc existant pour en créer un nouveau, donnez-lui un `id` unique, puis publiez (commit + push). Pour retirer une annonce, supprimez son bloc (ou passez `status` à `"reserve"` pour la marquer réservée sans la supprimer).

**B. Via la page `admin.html`**
Ouvrez `admin.html` dans votre navigateur (elle n'apparaît pas dans le menu public). Vous pouvez y ajouter une annonce via un formulaire, ou retirer une annonce existante d'un clic. La page génère automatiquement le code JavaScript à jour : copiez-le et collez-le dans `data-listings.js`, puis publiez sur GitHub.

> Le site étant hébergé sur GitHub Pages (statique, sans base de données), toute modification doit être publiée (commit + push) pour apparaître pour vos visiteurs.

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

## 7. Prix et personnalisation visuelle

Les couleurs, polices et textures sont centralisées en haut de `style.css` (bloc `:root`, "Design tokens") : ajustez `--gold`, `--stripe-1/2/3` etc. pour affiner l'identité visuelle.
