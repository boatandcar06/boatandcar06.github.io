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

La page **`a-propos.html`**, section "Mentions légales", reprend les informations publiques de la société (RCS, forme juridique, capital, siège social, activités). Il reste à compléter le **numéro de TVA intracommunautaire** une fois obtenu.

## 3. Espace admin — ajouter / modifier / retirer des annonces

Il n'y a pas d'URL séparée : l'espace admin est intégré à chaque page du site, derrière l'icône **Connexion** en haut à droite du menu.

1. Cliquez sur l'icône Connexion, identifiez-vous (voir les identifiants transmis séparément — modifiables dans `admin.js`, voir section 8 "Sécurité" ci-dessous).
2. Ajoutez une annonce (avec jusqu'à 6 photos) via le formulaire, ou cliquez sur le crayon d'une annonce existante pour la modifier.
3. Cliquez sur l'icône réglages (engrenage) pour renseigner une fois le dépôt GitHub (`owner/repo`) et un token d'accès personnel GitHub (scope Contents en lecture/écriture sur ce dépôt). Le token est stocké uniquement dans le navigateur.
4. Cliquez sur **"Publier sur le site"** : les modifications sont envoyées directement sur GitHub et le site se met à jour en 1 à 2 minutes.

Une fois connecté, l'icône reste active tant que l'onglet du navigateur est ouvert.

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

## 6. Photos des véhicules

Depuis l'espace admin, chaque annonce peut avoir jusqu'à 6 photos (compressées automatiquement avant envoi). Sans photo, une icône vectorielle générique illustre le véhicule.

## 7. Personnalisation visuelle

Les couleurs, polices et espacements sont centralisés en haut de `style.css` (bloc `:root`, "Design tokens") : ajustez `--azure`, `--turquoise`, `--terracotta`, `--stripe-1/2/3` etc. pour affiner l'identité visuelle.

## 8. Sécurité

Ce site est **statique** (aucun serveur, aucune base de données) : cela limite ce qu'il est possible de sécuriser réellement, et il faut le garder en tête.

**Ce qui a été renforcé :**
- Le mot de passe admin n'est plus stocké en clair dans le code source : seule son empreinte SHA-256 (`ADMIN_HASH` dans `admin.js`) y figure, pour éviter qu'il soit lisible en clair par un simple "Afficher le code source".
- Toutes les données des annonces (marque, modèle, description...) sont désormais échappées avant d'être affichées, pour empêcher qu'un texte contenant des balises HTML ne soit exécuté comme du code sur le site.
- Une politique de sécurité (Content-Security-Policy) bloque le chargement de tout script ou iframe provenant d'un site tiers non autorisé.

**Limites inhérentes à ce type de site (dépôt GitHub public, requis pour GitHub Pages gratuit) :**
- Le contrôle d'accès à l'espace admin reste une protection "de courtoisie" côté navigateur, pas une vraie authentification serveur : une personne suffisamment déterminée et technique peut toujours contourner l'écran de connexion. Ne considérez pas cet espace admin comme un rempart contre un attaquant motivé — pour une vraie authentification, il faudrait un service tiers (ex. Cloudflare Access, Netlify Identity) ou un petit serveur dédié.
- Le token GitHub que vous enregistrez dans les réglages de publication est stocké dans le navigateur (jamais envoyé ailleurs qu'à GitHub). Créez-le comme **"fine-grained personal access token"** limité à ce seul dépôt, avec uniquement la permission **Contents: Read and write**, et une date d'expiration (90 jours par exemple). Régénérez-le si vous changez d'ordinateur partagé ou en cas de doute.
- Pour changer le mot de passe admin : demandez à votre assistant de le régénérer, ou calculez vous-même le SHA-256 de `identifiant:motdepasse` et remplacez `ADMIN_HASH` dans `admin.js`.
