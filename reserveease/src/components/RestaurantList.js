import React from "react";
import RestaurantCard from "./RestaurantCard";

// Sample restaurant data (images should be URLs or local asset paths in future)
const sampleRestaurants = [
  {
    id: 1,
    name: "Pasta Palace",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
    location: "Midtown",
    cuisine: "Italian",
    description: "A cozy Italian spot with hand-made pasta.",
  },
  {
    id: 2,
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80",
    location: "Downtown",
    cuisine: "Indian",
    description: "Spicy, authentic curries in a warm setting.",
  },
  {
    id: 3,
    name: "Sushi Central",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=200&q=80",
    location: "Uptown",
    cuisine: "Japanese",
    description: "Fresh sushi and sashimi with modern flair.",
  },
  {
    id: 4,
    name: "Burger Barn",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    location: "West End",
    cuisine: "American",
    description: "Juicy burgers, shakes, and fries for all.",
  },
  {
    id: 5,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=200&q=80",
    location: "South Park",
    cuisine: "Vegetarian",
    description: "Organic vegetarian & vegan delights.",
  },
];

// PUBLIC_INTERFACE
function RestaurantList() {
  /**
   * Main page displaying scrollable list of restaurant cards.
   * Renders sample restaurants and provides stubs for card actions.
   */

  // Stub for opening details (to be routed in full app)
  const handleOpenDetails = (restaurantId) => {
    // Next: Navigate or open modal for restaurant details
    // eslint-disable-next-line no-console
    console.log("Open details for restaurant:", restaurantId);
    // Future: use navigate(`/details/${restaurantId}`)
  };

  // Stub for reservation action (to be hooked up to reservation modal/page)
  const handleClickReserve = (restaurantId) => {
    // Next: Open reservation flow/modal
    // eslint-disable-next-line no-console
    console.log("Open reserve modal for restaurant:", restaurantId);
    // Future: use navigate(`/reserve/${restaurantId}`)
  };

  return (
    <div
      style={{
        marginTop: 64,
        paddingBottom: 32,
        maxHeight: "calc(100vh - 170px)",
        overflowY: "auto",
      }}
      aria-label="List of restaurants"
    >
      <h1
        style={{
          fontSize: "2.15rem",
          fontWeight: "700",
          marginBottom: 24,
          color: "var(--primary)",
          textAlign: "left",
        }}
      >
        Browse Restaurants
      </h1>
      {sampleRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onOpenDetails={handleOpenDetails}
          onClickReserve={handleClickReserve}
        />
      ))}
      <div style={{ height: 12 }} />
    </div>
  );
}

export default RestaurantList;
