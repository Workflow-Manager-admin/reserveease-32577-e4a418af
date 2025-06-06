import React from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants"; // Import shared restaurant data

/**
 * PUBLIC_INTERFACE
 * Main page displaying scrollable list of restaurant cards.
 * Renders sample restaurants and provides stubs for card actions.
 */
function RestaurantList() {
  const navigate = useNavigate();

  // Navigate to the RestaurantDetails page using restaurant ID as a route parameter
  const handleOpenDetails = (restaurantId) => {
    navigate(`/details/${restaurantId}`);
  };

  // Reservation action stub (will later route to reservation)
  const handleClickReserve = (restaurantId) => {
    // Next: Open reservation flow/modal or navigate to reservation form
    // eslint-disable-next-line no-console
    console.log("Open reserve modal for restaurant:", restaurantId);
    // Future: navigate(`/reserve/${restaurantId}`)
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
      {restaurants.map((restaurant) => (
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
