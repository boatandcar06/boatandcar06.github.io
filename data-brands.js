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
