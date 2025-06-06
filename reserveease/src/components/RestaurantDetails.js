import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants"; // Import shared restaurant data

/**
 * PUBLIC_INTERFACE
 * RestaurantDetails: Shows detailed info for a restaurant and Reserve button (opens modal via prop).
 * Props:
 *   - onReserve: function(restaurantId) (optional, for opening reservation modal)
 */
function RestaurantDetails({ onReserve }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Restaurant IDs are numeric in sample
  const restaurant = restaurants.find(
    (r) => String(r.id) === String(id)
  );

  if (!restaurant) {
    return (
      <div style={{ marginTop: 110, color: "var(--primary)", fontWeight: 600 }}>
        Restaurant not found.
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 96,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        padding: "40px 32px",
        maxWidth: 650,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      aria-label={`Details for ${restaurant.name}`}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
        <div
          style={{
            minWidth: 180,
            minHeight: 180,
            width: 180,
            height: 180,
            background: "#232323",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 8px rgba(18,43,63,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={restaurant.image || "https://via.placeholder.com/180?text=Food"}
            alt={restaurant.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h2
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: "2.3rem",
              margin: "0 0 8px 0",
              lineHeight: 1.1,
            }}
          >
            {restaurant.name}
          </h2>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.10rem",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            {restaurant.location} &bull; {restaurant.cuisine}
          </div>
          {/* Google Map embed for this restaurant by name/location */}
          <div style={{ margin: "14px 0 18px 0", borderRadius: 8, overflow: "hidden", border: "1.5px solid var(--border-color)" }}>
            <iframe
              title="Map"
              width="100%"
              height="170"
              style={{ border: 0, filter: "grayscale(0.18)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(
                restaurant.name + " " + restaurant.location
              )}&key=&zoom=15`}
            />
          </div>
          <div
            style={{
              margin: "14px 0",
              color: "#ddd",
              fontSize: "1.08rem",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {restaurant.description}
          </div>
          <div style={{ marginTop: 24 }}>
            <button
              className="btn btn-large"
              style={{
                minWidth: 130,
                fontSize: "1.07rem",
                marginRight: 12,
              }}
              onClick={() => {
                if (onReserve) {
                  onReserve(restaurant.id);
                } else {
                  navigate(`/reserve/${restaurant.id}`);
                }
              }}
            >
              Reserve
            </button>
            <button
              className="btn"
              style={{ background: "none", color: "var(--primary)", border: "1px solid var(--primary)", minWidth: 100 }}
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
