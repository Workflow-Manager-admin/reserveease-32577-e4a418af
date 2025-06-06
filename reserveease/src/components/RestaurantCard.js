import React from "react";

// PUBLIC_INTERFACE
function RestaurantCard({
  restaurant,
  onOpenDetails,
  onClickReserve, // Actually wired to app-level modal
}) {
  /**
   * Represents an individual restaurant card in the list.
   * Displays image, name, location, cuisine, and actions.
   * 
   * Props:
   * - restaurant: { id, name, image, location, cuisine, description }
   * - onOpenDetails: function(restaurantId)
   * - onClickReserve: function(restaurantId)
   */
  return (
    <div
      className="restaurant-card"
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        marginBottom: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        padding: 20,
        cursor: "pointer",
        transition: "box-shadow 0.15s",
      }}
      onClick={() => onOpenDetails(restaurant.id)}
      tabIndex={0}
      aria-label={`View details for ${restaurant.name}`}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpenDetails(restaurant.id); }}
    >
      <div
        style={{
          minWidth: 86,
          minHeight: 86,
          width: 86,
          height: 86,
          background: "#232323",
          borderRadius: 8,
          overflow: "hidden",
          marginRight: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        // Prevents child click from bubbling to open details (reserve button only)
        onClick={e => e.stopPropagation()}
      >
        <img
          src={restaurant.image || "https://via.placeholder.com/86?text=Food"}
          alt={restaurant.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontWeight: 600, fontSize: "1.25rem", color: "var(--primary)" }}>
          {restaurant.name}
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
          {restaurant.location} &bull; {restaurant.cuisine}
        </div>
        <div style={{
          marginTop: 5,
          fontSize: "0.98rem",
          color: "#ddd",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 320,
        }}>
          {restaurant.description}
        </div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex" }}>
        <button
          className="btn"
          style={{ marginLeft: 16, minWidth: 92 }}
          tabIndex={0}
          onClick={e => {
            e.stopPropagation(); // Prevent parent click (open details)
            if (onClickReserve) onClickReserve(restaurant.id);
          }}
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
