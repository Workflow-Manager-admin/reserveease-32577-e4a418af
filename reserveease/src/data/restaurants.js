//
// PUBLIC_INTERFACE
// Shared restaurant data for ReserveEase demo application.
// This module exports an array of sample restaurant objects, enabling data reuse across components.
//

const restaurants = [
  {
    id: 1,
    name: "Pasta Palace",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
    location: "Midtown",
    cuisine: "Italian",
    description: "A cozy Italian spot with hand-made pasta.",
    reviews: [],
    averageRating: null, // Number or null
  },
  {
    id: 2,
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80",
    location: "Downtown",
    cuisine: "Indian",
    description: "Spicy, authentic curries in a warm setting.",
    reviews: [],
    averageRating: null,
  },
  {
    id: 3,
    name: "Sushi Central",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80",
    location: "Uptown",
    cuisine: "Japanese",
    description: "Fresh sushi and sashimi with modern flair.",
    reviews: [],
    averageRating: null,
  },
  {
    id: 4,
    name: "Burger Barn",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    location: "West End",
    cuisine: "American",
    description: "Juicy burgers, shakes, and fries for all.",
    reviews: [],
    averageRating: null,
  },
  {
    id: 5,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=200&q=80",
    location: "South Park",
    cuisine: "Vegetarian",
    description: "Organic vegetarian & vegan delights.",
    reviews: [],
    averageRating: null,
  },
];

export default restaurants;
