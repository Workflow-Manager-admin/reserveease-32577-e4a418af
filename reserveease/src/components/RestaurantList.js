import React from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

/**
 * PUBLIC_INTERFACE
 * Main page displaying scrollable list of restaurant cards.
 * Renders sample restaurants and provides stubs for card actions.
 * Props:
 *   - onReserve: function(restaurantId) to open modal (from app)
 *   - restaurants: list of restaurant objects (with reviews/ratings)
 */
function RestaurantList({ onReserve, isFavourite, onToggleFavourite, restaurants }) {
  const navigate = useNavigate();

  // Navigate to the RestaurantDetails page using restaurant ID as a route parameter
  const handleOpenDetails = (restaurantId) => {
    navigate(`/details/${restaurantId}`);
  };

  // Pass app-level onReserve directly to RestaurantCard
  const handleClickReserve = (restaurantId) => {
    if (onReserve) onReserve(restaurantId);
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
      {/* Map view removed */}
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onOpenDetails={handleOpenDetails}
          onClickReserve={handleClickReserve}
          isFavourite={isFavourite}
          onToggleFavourite={onToggleFavourite}
          showAverageRating={true}
        />
      ))}
      <div style={{ height: 12 }} />
    </div>
  );
}

export default RestaurantList;
