/**
 * ==========================================================================
 * ANNONCES — VÉHICULES DISPONIBLES
 * ==========================================================================
 * Ceci est la "base de données" du site (aucun serveur nécessaire).
 * Pour AJOUTER une annonce : copiez un bloc { ... } ci-dessous, modifiez
 * les valeurs, donnez-lui un "id" unique, et ajoutez-le au tableau.
 * Pour RETIRER une annonce : supprimez son bloc (ou passez status en
 * "vendu" pour la faire apparaître dans "Nos dernières ventes" à la place —
 * voir data-sales.js).
 * La page /admin.html génère ce code automatiquement pour vous.
 *
 * Champs :
 *  id          identifiant unique (texte, sans espace)
 *  type        "voiture" | "utilitaire" | "moto" | "bateau"
 *  marque, modele, annee
 *  prix        en euros, nombre entier
 *  km          kilométrage (ou heures pour bateau/moto), nombre
 *  carburant, transmission, couleur, puissance (ex "381 ch")
 *  description texte court
 *  points_forts liste de caractéristiques (chips)
 *  featured    true = mis en avant sur la page d'accueil
 *  status      "disponible" | "reserve"
 *  image       mot-clé libre (non utilisé pour une vraie photo, sert de repère)
 * ==========================================================================
 */
const LISTINGS = [
  {
    id: "bmw-m3-competition-2023",
    type: "voiture",
    marque: "BMW",
    modele: "M3 Competition",
    annee: 2023,
    prix: 94900,
    km: 12500,
    carburant: "Essence",
    transmission: "Automatique",
    couleur: "Bleu Isle of Man",
    puissance: "510 ch",
    description: "BMW M3 Competition en état irréprochable, pack carbone, échappement M Performance, suivi constructeur complet.",
    points_forts: ["Garantie 12 mois", "Carnet constructeur", "Toit carbone", "Sièges M Carbon"],
    featured: true,
    status: "disponible"
  },
  {
    id: "audi-rs6-avant-2022",
    type: "voiture",
    marque: "Audi",
    modele: "RS6 Avant",
    annee: 2022,
    prix: 118500,
    km: 21000,
    carburant: "Essence",
    transmission: "Automatique",
    couleur: "Gris Nardo",
    puissance: "600 ch",
    description: "RS6 Avant, la référence des break sportifs. Quattro intégral, freins céramique, pack dynamique plus.",
    points_forts: ["Freins céramique", "Pack Dynamique Plus", "Attelage électrique", "1ère main"],
    featured: true,
    status: "disponible"
  },
  {
    id: "porsche-911-carrera-s-2021",
    type: "voiture",
    marque: "Porsche",
    modele: "911 Carrera S (992)",
    annee: 2021,
    prix: 132000,
    km: 18700,
    carburant: "Essence",
    transmission: "Automatique",
    couleur: "Blanc Craie",
    puissance: "450 ch",
    description: "992 Carrera S, sportback intemporel, boîte PDK, sièges sport plus, échappement sport.",
    points_forts: ["Échappement sport", "Sièges sport plus", "Origine France", "Révisée"],
    featured: true,
    status: "disponible"
  },
  {
    id: "mercedes-classe-a45s-2022",
    type: "voiture",
    marque: "Mercedes-Benz",
    modele: "Classe A 45 S AMG",
    annee: 2022,
    prix: 68900,
    km: 26000,
    carburant: "Essence",
    transmission: "Automatique",
    couleur: "Noir Cosmos",
    puissance: "421 ch",
    description: "A45 S AMG 4Matic+, la compacte la plus puissante du marché. Pack aérodynamique, sièges baquets.",
    points_forts: ["4Matic+", "Sièges baquets AMG", "Garantie", "Entretien à jour"],
    featured: false,
    status: "disponible"
  },
  {
    id: "renault-trafic-2022",
    type: "utilitaire",
    marque: "Renault",
    modele: "Trafic L2H1 2.0 dCi",
    annee: 2022,
    prix: 24900,
    km: 45000,
    carburant: "Diesel",
    transmission: "Manuelle",
    couleur: "Blanc",
    puissance: "150 ch",
    description: "Utilitaire Trafic grand volume, parfaitement entretenu, idéal artisans et professionnels.",
    points_forts: ["Grand volume", "Attelage", "Carnet à jour", "Utilisation pro unique"],
    featured: true,
    status: "disponible"
  },
  {
    id: "peugeot-boxer-2021",
    type: "utilitaire",
    marque: "Peugeot",
    modele: "Boxer 435 L4H2",
    annee: 2021,
    prix: 27500,
    km: 61000,
    carburant: "Diesel",
    transmission: "Manuelle",
    couleur: "Blanc",
    puissance: "165 ch",
    description: "Grand fourgon Boxer, aménagement étagères inclus, parfait état mécanique.",
    points_forts: ["Aménagement inclus", "Grand volume", "Contrôle technique OK"],
    featured: false,
    status: "disponible"
  },
  {
    id: "ford-transit-custom-2023",
    type: "utilitaire",
    marque: "Ford",
    modele: "Transit Custom",
    annee: 2023,
    prix: 29900,
    km: 18000,
    carburant: "Diesel",
    transmission: "Automatique",
    couleur: "Gris",
    puissance: "170 ch",
    description: "Transit Custom quasi neuf, boîte auto, faible kilométrage, sous garantie constructeur.",
    points_forts: ["Sous garantie", "Boîte auto", "Faible kilométrage"],
    featured: true,
    status: "disponible"
  },
  {
    id: "bmw-s1000rr-2022",
    type: "moto",
    marque: "BMW Motorrad",
    modele: "S 1000 RR",
    annee: 2022,
    prix: 18900,
    km: 6200,
    carburant: "Essence",
    transmission: "Manuelle",
    couleur: "M Motorsport",
    puissance: "210 ch",
    description: "S1000RR en configuration M Sport, quickshifter, mode course, état concours.",
    points_forts: ["Quickshifter", "Mode course", "Échappement Akrapovic", "État concours"],
    featured: true,
    status: "disponible"
  },
  {
    id: "ducati-panigale-v4s-2021",
    type: "moto",
    marque: "Ducati",
    modele: "Panigale V4 S",
    annee: 2021,
    prix: 24500,
    km: 4800,
    carburant: "Essence",
    transmission: "Manuelle",
    couleur: "Rouge Ducati",
    puissance: "214 ch",
    description: "Panigale V4S, suspensions Öhlins électroniques, entretien exclusivement Ducati.",
    points_forts: ["Suspensions Öhlins", "Entretien concessionnaire", "Faible kilométrage"],
    featured: false,
    status: "disponible"
  },
  {
    id: "beneteau-antares-2020",
    type: "bateau",
    marque: "Bénéteau",
    modele: "Antares 8",
    annee: 2020,
    prix: 79000,
    km: 210,
    carburant: "Diesel",
    transmission: "—",
    couleur: "Blanc",
    puissance: "300 ch",
    description: "Bateau à moteur Antares 8, cabine spacieuse, idéal sorties en famille sur la Côte d'Azur.",
    points_forts: ["Cabine équipée", "Faible nombre d'heures", "Entretien chantier"],
    featured: true,
    status: "disponible"
  },
  {
    id: "zodiac-medline-2022",
    type: "bateau",
    marque: "Zodiac",
    modele: "Medline 7.5",
    annee: 2022,
    prix: 45900,
    km: 95,
    carburant: "Essence",
    transmission: "—",
    couleur: "Gris/Blanc",
    puissance: "250 ch",
    description: "Semi-rigide Medline 7.5, très peu utilisé, parfait pour la plaisance et les sports nautiques.",
    points_forts: ["Comme neuf", "Bâche incluse", "Remorque disponible"],
    featured: false,
    status: "disponible"
  }
];
