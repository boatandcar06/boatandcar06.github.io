/**
 * ==========================================================================
 * CONFIGURATION DU SITE — BOAT & CAR 06
 * ==========================================================================
 * Modifiez les valeurs ci-dessous pour personnaliser le site : elles sont
 * utilisées automatiquement sur toutes les pages (téléphone, email, etc.)
 * ==========================================================================
 */
const SITE_CONFIG = {
  // Identité
  companyName: "Boat & Car 06",
  tagline: "Des véhicules fiables, sélectionnés avec soin, à prix accessible",
  city: "Alpes-Maritimes (06)",

  // Coordonnées — à adapter
  phone: "+33 7 59 99 23 04",
  phoneDisplay: "07 59 99 23 04",
  email: "contact@boatandcar06.fr",
  address: "2167 Route de la Baronne, 06510 Gattières, France",

  // Horaires
  hours: [
    { jours: "Lundi – Vendredi", horaire: "9h00 – 19h00" },
    { jours: "Samedi", horaire: "10h00 – 18h00" },
    { jours: "Dimanche", horaire: "Sur rendez-vous" }
  ],

  // Réseaux sociaux (laisser vide "" pour masquer)
  social: {
    instagram: "",
    facebook: "",
    linkedin: ""
  },

  /**
   * ENVOI DES FORMULAIRES
   * Le site fonctionne "hors-ligne" par défaut (aucun serveur requis) :
   * chaque formulaire ouvre un e-mail pré-rempli via l'adresse ci-dessus.
   *
   * Pour recevoir les demandes directement dans une base / boîte mail sans
   * ouvrir le client mail du visiteur, créez un formulaire gratuit sur
   * https://formspree.io (ou https://www.emailjs.com), puis collez
   * l'URL du endpoint ici. Le site l'utilisera automatiquement.
   * Exemple : "https://formspree.io/f/xxxxxxxx"
   */
  formEndpoint: ""
};
