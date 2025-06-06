//
// PUBLIC_INTERFACE
// Shared restaurant data for ReserveEase demo application.
// This module exports an array of sample restaurant objects, enabling data reuse across components.
// Each restaurant includes an array of reviews, with each review containing:
//    - id: string (unique review ID)
//    - reviewerName: string (name of reviewer)
//    - text: string (review content, can be empty)
//    - rating: integer (1–5 star rating)
//    - date: ISO date string
// The `averageRating` is the average of all review ratings (rounded to 1 decimal place).
//

const restaurants = [
  {
    id: 1,
    name: "Pasta Palace",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
    location: "Midtown",
    cuisine: "Italian",
    price: "$$",
    description: "A cozy Italian spot with hand-made pasta.",
    reviews: [
      {
        id: "review_1_1",
        reviewerName: "Emily R.",
        text: "Delicious pasta, lovely sauce, and a cozy atmosphere. Highly recommend the carbonara!",
        rating: 5,
        date: "2024-06-01T18:46:00Z"
      },
      {
        id: "review_1_2",
        reviewerName: "Mark T.",
        text: "Service was friendly. Portions were perfect for lunch. Will be back.",
        rating: 4,
        date: "2024-06-03T19:10:00Z"
      },
      {
        id: "review_1_3",
        reviewerName: "Amelia P.",
        text: "The lasagna is just okay, but desserts are excellent.",
        rating: 4,
        date: "2024-06-05T19:00:00Z"
      }
    ],
    averageRating: 4.3 // (5 + 4 + 4) / 3
  },
  {
    id: 2,
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80",
    location: "Downtown",
    cuisine: "Indian",
    price: "$$",
    description: "Spicy, authentic curries in a warm setting.",
    reviews: [
      {
        id: "review_2_1",
        reviewerName: "Amit P.",
        text: "Flavors just right. Loved the paneer tikka masala, great naan.",
        rating: 5,
        date: "2024-06-02T20:15:00Z"
      },
      {
        id: "review_2_2",
        reviewerName: "Samantha W.",
        text: "Ambiance was nice. The naan bread is always served fresh and hot.",
        rating: 4,
        date: "2024-06-04T17:45:00Z"
      },
      {
        id: "review_2_3",
        reviewerName: "Vikram I.",
        text: "Nice selection for vegetarians. Spice level can be adjusted.",
        rating: 5,
        date: "2024-06-05T18:32:00Z"
      }
    ],
    averageRating: 4.7 // (5 + 4 + 5) / 3
  },
  {
    id: 3,
    name: "Sushi Central",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80",
    location: "Uptown",
    cuisine: "Japanese",
    price: "$$$",
    description: "Fresh sushi and sashimi with modern flair.",
    reviews: [
      {
        id: "review_3_1",
        reviewerName: "Kenji K.",
        text: "Very fresh fish. Best place for sushi in town.",
        rating: 5,
        date: "2024-06-03T19:01:00Z"
      },
      {
        id: "review_3_2",
        reviewerName: "Lily C.",
        text: "Creative rolls, though a bit pricey for the portion size.",
        rating: 4,
        date: "2024-06-05T18:20:00Z"
      },
      {
        id: "review_3_3",
        reviewerName: "Arjun M.",
        text: "Loved the ambience. The sashimi platter was spectacular.",
        rating: 5,
        date: "2024-06-07T20:00:00Z"
      },
      {
        id: "review_3_4",
        reviewerName: "Sophie V.",
        text: "Great sake menu and friendly staff. Seating is limited.",
        rating: 4,
        date: "2024-06-08T18:01:00Z"
      }
    ],
    averageRating: 4.5 // (5 + 4 + 5 + 4) / 4
  },
  {
    id: 4,
    name: "Burger Barn",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    location: "West End",
    cuisine: "American",
    price: "$",
    description: "Juicy burgers, shakes, and fries for all.",
    reviews: [
      {
        id: "review_4_1",
        reviewerName: "David S.",
        text: "Classic burgers and crispy fries. Nice for a quick meal.",
        rating: 4,
        date: "2024-06-02T17:30:00Z"
      },
      {
        id: "review_4_2",
        reviewerName: "Ella Q.",
        text: "Milkshakes are a must-have treat. Love the chocolate flavor.",
        rating: 5,
        date: "2024-06-04T15:00:00Z"
      },
      {
        id: "review_4_3",
        reviewerName: "Lucas N.",
        text: "Good for families. Try the veggie burger and regular fries.",
        rating: 4,
        date: "2024-06-07T12:40:00Z"
      }
    ],
    averageRating: 4.3 // (4 + 5 + 4) / 3
  },
  {
    id: 5,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=200&q=80",
    location: "South Park",
    cuisine: "Vegetarian",
    price: "$$",
    description: "Organic vegetarian & vegan delights.",
    reviews: [
      {
        id: "review_5_1",
        reviewerName: "Paula H.",
        text: "Super fresh salads and creative vegan bites. So tasty!",
        rating: 5,
        date: "2024-06-01T13:00:00Z"
      },
      {
        id: "review_5_2",
        reviewerName: "Leo M.",
        text: "Pleasant staff. Desserts could be better, but great smoothie bowls.",
        rating: 4,
        date: "2024-06-06T12:25:00Z"
      },
      {
        id: "review_5_3",
        reviewerName: "Megan R.",
        text: "Generous portions, but the place can get a bit loud.",
        rating: 4,
        date: "2024-06-07T15:20:00Z"
      },
      {
        id: "review_5_4",
        reviewerName: "Derek S.",
        text: "Loved the smoothie bowl and green decor. Very clean.",
        rating: 5,
        date: "2024-06-08T14:03:00Z"
      }
    ],
    averageRating: 4.5 // (5 + 4 + 4 + 5) / 4
  }
];

export default restaurants;
