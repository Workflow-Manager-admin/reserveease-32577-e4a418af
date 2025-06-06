import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Copy-paste or import sampleRestaurants
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
function RestaurantDetails() {
  /**
   * Shows detailed info for a restaurant, with big image and 'Reserve' option.
   * Fetches by ID from route param, finds restaurant in shared data.
   */
  const { id } = useParams();
  const navigate = useNavigate();

  // Restaurant IDs are numeric in sample
  const restaurant = sampleRestaurants.find(
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
              onClick={() => navigate(`/reserve/${restaurant.id}`)}
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
