const LISTINGS = [
  {
    "id": "dacia-duster-2022",
    "type": "voiture",
    "marque": "Dacia",
    "modele": "Duster",
    "annee": 2022,
    "prix": 16900,
    "km": 24000,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "couleur": "Gris Comète",
    "puissance": "115 ch",
    "description": "Duster récent, idéal familles et loisirs, garde au sol élevée, très faible kilométrage.",
    "points_forts": [
      "Faible kilométrage",
      "4x2",
      "Garantie 12 mois",
      "Révisé"
    ],
    "featured": true,
    "status": "disponible"
  },
  {
    "id": "peugeot-208-2022",
    "type": "voiture",
    "marque": "Peugeot",
    "modele": "208",
    "annee": 2022,
    "prix": 13200,
    "km": 21000,
    "carburant": "Essence",
    "transmission": "Automatique",
    "couleur": "Bleu Vertigo",
    "puissance": "100 ch",
    "description": "Peugeot 208 boîte automatique, citadine agréable et économique, parfaite pour un usage quotidien.",
    "points_forts": [
      "Boîte automatique",
      "Faible kilométrage",
      "Garantie 12 mois"
    ],
    "featured": false,
    "status": "disponible"
  },
  {
    "id": "audi-a3-sportback-2020",
    "type": "voiture",
    "marque": "Audi",
    "modele": "A3 Sportback",
    "annee": 2020,
    "prix": 19500,
    "km": 52000,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "couleur": "Noir Mythos",
    "puissance": "116 ch",
    "description": "A3 Sportback, finition soignée et fiabilité reconnue, entretien suivi en concession.",
    "points_forts": [
      "Carnet constructeur",
      "Contrôle technique OK",
      "Garantie 12 mois"
    ],
    "featured": true,
    "status": "disponible"
  },
  {
    "id": "renault-kangoo-2021",
    "type": "utilitaire",
    "marque": "Renault",
    "modele": "Kangoo",
    "annee": 2021,
    "prix": 13500,
    "km": 58000,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "couleur": "Blanc",
    "puissance": "95 ch",
    "description": "Kangoo utilitaire, compact et maniable, idéal artisans et petits transports au quotidien.",
    "points_forts": [
      "Faible consommation",
      "Carnet à jour",
      "Utilisation pro unique"
    ],
    "featured": true,
    "status": "disponible"
  },
  {
    "id": "volkswagen-caddy-2021",
    "type": "utilitaire",
    "marque": "Volkswagen",
    "modele": "Caddy",
    "annee": 2021,
    "prix": 15900,
    "km": 49000,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "couleur": "Blanc",
    "puissance": "102 ch",
    "description": "Caddy fiable et robuste, parfait pour artisans et professionnels au quotidien.",
    "points_forts": [
      "Fiabilité reconnue",
      "Carnet à jour",
      "Contrôle technique OK"
    ],
    "featured": false,
    "status": "disponible"
  },
  {
    "id": "citroen-berlingo-2022",
    "type": "utilitaire",
    "marque": "Citroën",
    "modele": "Berlingo",
    "annee": 2022,
    "prix": 16900,
    "km": 32000,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "couleur": "Gris",
    "puissance": "100 ch",
    "description": "Berlingo récent, faible kilométrage, idéal pour un usage professionnel ou familial polyvalent.",
    "points_forts": [
      "Faible kilométrage",
      "Sous garantie",
      "Polyvalent"
    ],
    "featured": false,
    "status": "disponible"
  },
  {
    "id": "yamaha-mt07-2021",
    "type": "moto",
    "marque": "Yamaha",
    "modele": "MT-07",
    "annee": 2021,
    "prix": 6200,
    "km": 11000,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "couleur": "Gris Storm",
    "puissance": "75 ch",
    "description": "MT-07 polyvalente et accessible, parfaite pour débuter ou pour un usage quotidien.",
    "points_forts": [
      "Entretien à jour",
      "Compatible permis A2",
      "Faible consommation"
    ],
    "featured": true,
    "status": "disponible"
  },
  {
    "id": "honda-cb500f-2022",
    "type": "moto",
    "marque": "Honda",
    "modele": "CB500F",
    "annee": 2022,
    "prix": 5400,
    "km": 7200,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "couleur": "Rouge",
    "puissance": "47 ch",
    "description": "CB500F compatible permis A2, fiable et économique, idéale pour débuter la moto.",
    "points_forts": [
      "Compatible A2",
      "Faible kilométrage",
      "Entretien Honda"
    ],
    "featured": false,
    "status": "disponible"
  },
  {
    "id": "quicksilver-activ-555-2021",
    "type": "bateau",
    "marque": "Quicksilver",
    "modele": "Activ 555",
    "annee": 2021,
    "prix": 18900,
    "km": 120,
    "carburant": "Essence",
    "transmission": "—",
    "couleur": "Blanc",
    "puissance": "115 ch",
    "description": "Petit bateau à moteur idéal pour débuter, balades en famille et pêche sur la Côte d'Azur.",
    "points_forts": [
      "Peu d'heures moteur",
      "Idéal débutant",
      "Entretien à jour"
    ],
    "featured": true,
    "status": "disponible"
  },
  {
    "id": "b2marine-neptun-550-2020",
    "type": "bateau",
    "marque": "B2 Marine",
    "modele": "Neptun 550",
    "annee": 2020,
    "prix": 14900,
    "km": 95,
    "carburant": "Essence",
    "transmission": "—",
    "couleur": "Gris/Blanc",
    "puissance": "90 ch",
    "description": "Semi-rigide compact et léger, facile à manier, parfait pour une première expérience nautique.",
    "points_forts": [
      "Léger et maniable",
      "Peu d'heures",
      "Remorque disponible"
    ],
    "featured": false,
    "status": "disponible"
  }
];
