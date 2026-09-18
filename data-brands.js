/**
 * ==========================================================================
 * MARQUES & TYPES DE VÉHICULES
 * ==========================================================================
 * Sert aux menus déroulants (page Admin) et aux filtres (page Offres).
 * Ajoutez librement une marque dans la bonne catégorie.
 * ==========================================================================
 */
const VEHICLE_TYPES = [
  { id: "voiture",     label: "Voitures",              icon: "car" },
  { id: "utilitaire",  label: "Camionnettes & Utilitaires", icon: "van" },
  { id: "moto",        label: "Motos",                 icon: "moto" },
  { id: "bateau",      label: "Bateaux",                icon: "boat" }
];

const BRANDS_BY_TYPE = {
  voiture: [
    "Audi", "BMW", "Mercedes-Benz", "Porsche", "Volkswagen",
    "Peugeot", "Renault", "Citroën", "DS Automobiles", "Alpine",
    "Ferrari", "Lamborghini", "Maserati", "Jaguar", "Land Rover", "Autre"
  ],
  utilitaire: [
    "Renault", "Peugeot", "Citroën", "Ford", "Mercedes-Benz",
    "Fiat", "Iveco", "Volkswagen", "Autre"
  ],
  moto: [
    "BMW Motorrad", "Ducati", "Yamaha", "Honda", "Kawasaki",
    "Triumph", "KTM", "Harley-Davidson", "Suzuki", "Autre"
  ],
  bateau: [
    "Bénéteau", "Jeanneau", "Quicksilver", "Zodiac", "Four Winns",
    "Yamaha", "Autre"
  ]
};

const FUEL_TYPES = ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "—"];
const TRANSMISSIONS = ["Manuelle", "Automatique", "—"];

/**
 * Modèles existants par marque, pour le filtre "Modèle" de la page Offres.
 * Catalogue indicatif des modèles réels de chaque marque (pas seulement ceux
 * en stock) afin que le filtre reste utile même si le modèle n'est pas
 * actuellement disponible.
 */
const MODELS_BY_BRAND = {
  voiture: {
    "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "TT", "R8", "RS3", "RS6 Avant", "RS7", "e-tron GT"],
    "BMW": ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "Série 8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "M2", "M3", "M3 Competition", "M4", "M5", "i4", "iX"],
    "Mercedes-Benz": ["Classe A", "Classe A 45 S AMG", "Classe B", "Classe C", "Classe E", "Classe S", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "Classe G", "SL", "AMG GT", "EQE", "EQS"],
    "Porsche": ["911", "911 Carrera S (992)", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
    "Volkswagen": ["Polo", "Golf", "Golf GTI", "Passat", "Arteon", "T-Cross", "T-Roc", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Touran"],
    "Peugeot": ["108", "208", "308", "408", "508", "2008", "3008", "5008", "RCZ"],
    "Renault": ["Clio", "Megane", "Talisman", "Captur", "Kadjar", "Austral", "Arkana", "Scenic", "Espace", "Zoe"],
    "Citroën": ["C3", "C4", "C5 X", "C3 Aircross", "C4 Cactus", "C5 Aircross", "Berlingo"],
    "DS Automobiles": ["DS 3", "DS 4", "DS 7", "DS 9"],
    "Alpine": ["A110", "A110 S", "A110 GT"],
    "Ferrari": ["Roma", "Portofino", "F8 Tributo", "296 GTB", "SF90 Stradale", "812 Superfast", "Purosangue"],
    "Lamborghini": ["Huracán", "Aventador", "Urus", "Revuelto"],
    "Maserati": ["Ghibli", "Quattroporte", "Levante", "GranTurismo", "MC20"],
    "Jaguar": ["XE", "XF", "F-Type", "F-Pace", "E-Pace", "I-Pace"],
    "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar", "Defender", "Discovery", "Discovery Sport"]
  },
  utilitaire: {
    "Renault": ["Kangoo", "Trafic", "Trafic L2H1 2.0 dCi", "Master"],
    "Peugeot": ["Partner", "Expert", "Boxer", "Boxer 435 L4H2"],
    "Citroën": ["Berlingo", "Jumpy", "Jumper"],
    "Ford": ["Transit Connect", "Transit Custom", "Transit"],
    "Mercedes-Benz": ["Citan", "Vito", "Sprinter"],
    "Fiat": ["Doblo", "Scudo", "Ducato"],
    "Iveco": ["Daily"],
    "Volkswagen": ["Caddy", "Transporter", "Crafter"]
  },
  moto: {
    "BMW Motorrad": ["R 1250 GS", "S 1000 RR", "F 900 R", "R nineT", "K 1600 GT"],
    "Ducati": ["Panigale V4", "Panigale V4 S", "Monster", "Multistrada V4", "Streetfighter V4", "Diavel"],
    "Yamaha": ["MT-07", "MT-09", "YZF-R1", "YZF-R6", "Tracer 9", "Ténéré 700"],
    "Honda": ["CB650R", "CBR650R", "Africa Twin", "Gold Wing", "CB1000R"],
    "Kawasaki": ["Ninja 650", "Ninja ZX-10R", "Z900", "Versys 650"],
    "Triumph": ["Street Triple", "Speed Triple", "Tiger 900", "Bonneville T120"],
    "KTM": ["Duke 790", "Duke 1290 Super", "Adventure 1290"],
    "Harley-Davidson": ["Sportster", "Fat Boy", "Road King", "Street Glide"],
    "Suzuki": ["GSX-R750", "GSX-R1000", "V-Strom 650", "Hayabusa"]
  },
  bateau: {
    "Bénéteau": ["Antares 8", "Antares 6", "Flyer 8", "Gran Turismo 32", "Oceanis 34"],
    "Jeanneau": ["Merry Fisher 795", "Merry Fisher 895", "Cap Camarat 7.5", "Leader 33"],
    "Quicksilver": ["Activ 675", "Activ 755", "605 Pilothouse"],
    "Zodiac": ["Medline 7.5", "Medline 6.5", "Open 5.5", "Pro 6 Man"],
    "Four Winns": ["H2", "H1", "V6"],
    "Yamaha": ["FX Cruiser", "242X", "190 FSH"]
  }
};
