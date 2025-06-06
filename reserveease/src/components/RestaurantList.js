import React from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants"; // Import shared restaurant data

/**
 * PUBLIC_INTERFACE
 * Main page displaying scrollable list of restaurant cards.
 * Renders sample restaurants and provides stubs for card actions.
 * Props:
 *   - onReserve: function(restaurantId) to open modal (from app)
 */
function RestaurantList({ onReserve }) {
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
      {/* Google Map embed for city/region (static for demo) */}
      <div style={{ marginBottom: 22, borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 1px 7px rgba(30,80,120,0.07)" }}>
        <iframe
          title="Restaurant Map"
          width="100%"
          height="250"
          style={{ border: 0, filter: "grayscale(0.13)" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/search?q=restaurant+Midtown+city&key=&zoom=12"
        />
      </div>
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
