import React from "react";

// PUBLIC_INTERFACE
function RestaurantCard({
  restaurant,
  onOpenDetails,
  onClickReserve, // Actually wired to app-level modal
  isFavourite,
  onToggleFavourite,
  showAverageRating = false,
}) {
  /**
   * Represents an individual restaurant card in the list.
   * Displays image, name, location, cuisine, and actions.
   * 
   * Props:
   * - restaurant: { id, name, image, location, cuisine, description }
   * - onOpenDetails: function(restaurantId)
   * - onClickReserve: function(restaurantId)
   * - isFavourite: function(restaurantId) => boolean
   * - onToggleFavourite: function(restaurantId)
   */
  const fav = isFavourite ? isFavourite(restaurant.id) : false;

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
        {showAverageRating && (
          <div style={{ marginTop: 3, marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
            {/* Render star ratings based on average computed from reviews */}
            {(() => {
              // Average rating - prefer live calculation if not present
              const reviews = restaurant.reviews || [];
              let avg = typeof restaurant.averageRating === "number"
                ? restaurant.averageRating
                : (
                  reviews.length > 0
                    ? Math.round(
                        (reviews.reduce((sum, r) => sum + (parseInt(r.rating || 0, 10)), 0) / reviews.length) * 10
                      ) / 10
                    : null
                );
              if (typeof avg !== "number") avg = 0;
              // Generate star icons
              return (
                <>
                  <span style={{ color: "#FFC95B", fontSize: 19 }}>
                    {
                      [...Array(5)].map((_, i) => {
                        // Full star if less than average, partial/empty otherwise
                        if (i < Math.floor(avg)) return <span key={"f" + i}>★</span>;
                        if (i < avg) return <span key={"h" + i} style={{ opacity: 0.55 }}>★</span>;
                        return <span key={"e" + i}>☆</span>;
                      })
                    }
                  </span>
                  <span style={{ color: "#FFC95B", fontSize: 15, fontWeight: 500, marginLeft: 2 }}>
                    {avg.toFixed(1)}
                  </span>
                  <span style={{ color: "#bbb", fontSize: 13 }}>
                    ({reviews.length} review{reviews.length === 1 ? "" : "s"})
                  </span>
                </>
              );
            })()}
          </div>
        )}
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
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        {/* Favourite Toggle Button */}
        {onToggleFavourite && (
          <button
            tabIndex={0}
            aria-label={fav ? "Unfavourite" : "Favourite"}
            title={fav ? "Remove from favourites" : "Add to favourites"}
            style={{
              fontSize: 26,
              color: fav ? "var(--primary)" : "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: 6,
              outline: fav ? "2px solid var(--primary)" : "none",
              transition: "color .2s"
            }}
            onClick={e => {
              e.stopPropagation();
              onToggleFavourite(restaurant.id);
            }}
          >
            {fav ? "⭐" : "☆"}
          </button>
        )}
        <button
          className="btn"
          style={{ marginLeft: 10, minWidth: 92 }}
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
