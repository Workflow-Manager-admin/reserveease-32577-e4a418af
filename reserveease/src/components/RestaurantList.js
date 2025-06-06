import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

/**
 * PUBLIC_INTERFACE
 * Main page displaying scrollable list of restaurant cards,
 * now with search input and filters (cuisine, price, location).
 * All filters update results in real-time and are fully combinable.
 */
function RestaurantList({ onReserve, isFavourite, onToggleFavourite, restaurants }) {
  const navigate = useNavigate();

  // State for filters/search
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Any");
  const [selectedPrice, setSelectedPrice] = useState("Any");
  const [selectedLocation, setSelectedLocation] = useState("Any");

  // Collect all possible cuisines, prices, locations from data
  const cuisines = useMemo(() => {
    const vals = Array.from(new Set(restaurants.map(r => r.cuisine || "Unknown")));
    vals.sort();
    return vals;
  }, [restaurants]);
  const locations = useMemo(() => {
    const vals = Array.from(new Set(restaurants.map(r => r.location || "Unknown")));
    vals.sort();
    return vals;
  }, [restaurants]);
  // Determine price ranges from data (if present), else provide fake options
  // Here we make it robust even if price field is not present, fallback to 3 options
  const priceRanges = useMemo(() => {
    const vals = Array.from(new Set(restaurants.map(r =>
      typeof r.price === "string" ? r.price : null
    ).filter(Boolean)));
    if (vals.length === 0) return ["$", "$$", "$$$"];
    vals.sort();
    return vals;
  }, [restaurants]);

  // Filtering logic for all controls (search, cuisine, price, location, combinable)
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      // Filter by search (case-insensitive in name, description, cuisine)
      const s = search.trim().toLowerCase();
      const matchesSearch = !s ||
        (r.name && r.name.toLowerCase().includes(s)) ||
        (r.description && r.description.toLowerCase().includes(s)) ||
        (r.cuisine && r.cuisine.toLowerCase().includes(s)) ||
        (r.location && r.location.toLowerCase().includes(s));
      // Cuisine filter
      const matchesCuisine = selectedCuisine === "Any" || r.cuisine === selectedCuisine;
      // Price filter: fallback - all pass if missing
      const matchesPrice = selectedPrice === "Any" ||
        (r.price && r.price === selectedPrice);
      // Location filter
      const matchesLocation = selectedLocation === "Any" || r.location === selectedLocation;
      return matchesSearch && matchesCuisine && matchesPrice && matchesLocation;
    });
  }, [restaurants, search, selectedCuisine, selectedPrice, selectedLocation]);

  // Navigate to RestaurantDetails page using restaurant ID
  const handleOpenDetails = (restaurantId) => {
    navigate(`/details/${restaurantId}`);
  };

  // Reserve click handler
  const handleClickReserve = (restaurantId) => {
    if (onReserve) onReserve(restaurantId);
  };

  // Filter controls styling (dark theme, brand)
  const controlBoxStyle = {
    background: "rgba(255,255,255,0.015)",
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "18px 20px",
    marginBottom: 22,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  };
  const labelStyle = { color: "var(--text-secondary)", fontSize: 15, marginRight: 7, fontWeight: 500 };
  const selectStyle = {
    background: "var(--background-dark)",
    color: "var(--text-color)",
    border: "1.1px solid var(--border-color)",
    borderRadius: 7,
    padding: "7px 15px",
    fontSize: "1.06rem",
    minWidth: 78,
    outline: "none",
  };
  const inputStyle = {
    background: "var(--background-dark)",
    color: "var(--text-color)",
    border: "1.1px solid var(--border-color)",
    borderRadius: 7,
    padding: "7px 13px",
    fontSize: "1.06rem",
    minWidth: 180,
    outline: "none",
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
          marginBottom: 18,
          color: "var(--primary)",
          textAlign: "left",
        }}
      >
        Browse Restaurants
      </h1>

      {/* Control bar for search & filters */}
      <div style={controlBoxStyle}>
        <label htmlFor="restaurant-search" style={labelStyle}>
          Search:
        </label>
        <input
          id="restaurant-search"
          type="text"
          placeholder="Name, cuisine, keyword..."
          value={search}
          style={inputStyle}
          onChange={e => setSearch(e.target.value)}
        />

        <label htmlFor="cuisine-select" style={labelStyle}>
          Cuisine:
        </label>
        <select
          id="cuisine-select"
          value={selectedCuisine}
          style={selectStyle}
          onChange={e => setSelectedCuisine(e.target.value)}
        >
          <option value="Any">Any</option>
          {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label htmlFor="price-select" style={labelStyle}>
          Price:
        </label>
        <select
          id="price-select"
          value={selectedPrice}
          style={selectStyle}
          onChange={e => setSelectedPrice(e.target.value)}
        >
          <option value="Any">Any</option>
          {priceRanges.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <label htmlFor="location-select" style={labelStyle}>
          Location:
        </label>
        <select
          id="location-select"
          value={selectedLocation}
          style={selectStyle}
          onChange={e => setSelectedLocation(e.target.value)}
        >
          <option value="Any">Any</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Restaurant cards */}
      {filteredRestaurants.length === 0 ? (
        <div style={{
          color: "var(--text-secondary)",
          marginTop: 20,
          fontSize: "1.14rem",
          textAlign: "center",
        }}>No restaurants match your search or filter.</div>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onOpenDetails={handleOpenDetails}
            onClickReserve={handleClickReserve}
            isFavourite={isFavourite}
            onToggleFavourite={onToggleFavourite}
            showAverageRating={true}
          />
        ))
      )}
      <div style={{ height: 12 }} />
    </div>
  );
}

export default RestaurantList;
