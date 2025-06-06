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
    reviews: [
      {
        id: "review_pasta_1",
        reviewerName: "Emily R.",
        text: "Delicious pasta and cozy atmosphere. Highly recommend the carbonara!",
        rating: 5,
        date: "2024-06-01T18:46:00Z"
      },
      {
        id: "review_pasta_2",
        reviewerName: "Mark T.",
        text: "Service was friendly and portions were just right.",
        rating: 4,
        date: "2024-06-03T19:10:00Z"
      },
      {
        id: "review_pasta_3",
        reviewerName: "Amelia P.",
        text: "",
        rating: 4,
        date: "2024-06-05T19:00:00Z"
      }
    ],
    averageRating: 4.3, // (5 + 4 + 4) / 3
  },
  {
    id: 2,
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80",
    location: "Downtown",
    cuisine: "Indian",
    description: "Spicy, authentic curries in a warm setting.",
    reviews: [
      {
        id: "review_curry_1",
        reviewerName: "Amit P.",
        text: "Flavors are just right. Loved the paneer tikka masala.",
        rating: 5,
        date: "2024-06-02T20:15:00Z"
      },
      {
        id: "review_curry_2",
        reviewerName: "Samantha W.",
        text: "Ambiance is nice. The naan bread is fresh.",
        rating: 4,
        date: "2024-06-04T17:45:00Z"
      },
      {
        id: "review_curry_3",
        reviewerName: "Vikram I.",
        text: "Nice selection for vegetarians. Spice can be adjusted.",
        rating: 5,
        date: "2024-06-05T18:32:00Z"
      }
    ],
    averageRating: 4.7, // (5 + 4 + 5) / 3
  },
  {
    id: 3,
    name: "Sushi Central",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80",
    location: "Uptown",
    cuisine: "Japanese",
    description: "Fresh sushi and sashimi with modern flair.",
    reviews: [
      {
        id: "review_sushi_1",
        reviewerName: "Kenji K.",
        text: "Very fresh fish. Best place for sushi in town.",
        rating: 5,
        date: "2024-06-03T19:01:00Z"
      },
      {
        id: "review_sushi_2",
        reviewerName: "Lily C.",
        text: "Rolls are creative, but some were overpriced.",
        rating: 4,
        date: "2024-06-05T18:20:00Z"
      },
      {
        id: "review_sushi_3",
        reviewerName: "Arjun M.",
        text: "Loved the ambience. Will return soon.",
        rating: 5,
        date: "2024-06-07T20:00:00Z"
      },
      {
        id: "review_sushi_4",
        reviewerName: "Sophie V.",
        text: "Great sake menu and friendly staff. Seating is limited.",
        rating: 4,
        date: "2024-06-08T18:01:00Z"
      }
    ],
    averageRating: 4.5, // (5 + 4 + 5 + 4) / 4
  },
  {
    id: 4,
    name: "Burger Barn",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    location: "West End",
    cuisine: "American",
    description: "Juicy burgers, shakes, and fries for all.",
    reviews: [
      {
        id: "review_burg_1",
        reviewerName: "David S.",
        text: "Classic burgers and crispy fries.",
        rating: 4,
        date: "2024-06-02T17:30:00Z"
      },
      {
        id: "review_burg_2",
        reviewerName: "Ella Q.",
        text: "Milkshakes are a must-have treat.",
        rating: 5,
        date: "2024-06-04T15:00:00Z"
      },
      {
        id: "review_burg_3",
        reviewerName: "Lucas N.",
        text: "Good for families. Try the veggie burger.",
        rating: 4,
        date: "2024-06-07T12:40:00Z"
      }
    ],
    averageRating: 4.3, // (4 + 5 + 4) / 3
  },
  {
    id: 5,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=200&q=80",
    location: "South Park",
    cuisine: "Vegetarian",
    description: "Organic vegetarian & vegan delights.",
    reviews: [
      {
        id: "review_green_1",
        reviewerName: "Paula H.",
        text: "Super fresh salads and creative vegan bites.",
        rating: 5,
        date: "2024-06-01T13:00:00Z"
      },
      {
        id: "review_green_2",
        reviewerName: "Leo M.",
        text: "Pleasant staff. Desserts could improve.",
        rating: 4,
        date: "2024-06-06T12:25:00Z"
      },
      {
        id: "review_green_3",
        reviewerName: "Megan R.",
        text: "",
        rating: 4,
        date: "2024-06-07T15:20:00Z"
      },
      {
        id: "review_green_4",
        reviewerName: "Derek S.",
        text: "Loved the smoothie bowl and green decor. Very clean.",
        rating: 5,
        date: "2024-06-08T14:03:00Z"
      }
    ],
    averageRating: 4.5 // (5 + 4 + 4 + 5) / 4
  },
];

export default restaurants;
