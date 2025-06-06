import React from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * RestaurantDetails: Shows detailed info for a restaurant and Reserve button (opens modal via prop).
 * Props:
 *   - onReserve: function(restaurantId) (optional, for opening reservation modal)
 *   - restaurants: array of all restaurant objects (with reviews/avg)
 */
function RestaurantDetails({ onReserve, isFavourite, onToggleFavourite, restaurants }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Restaurant IDs are numeric in sample
  const restaurant = (restaurants || []).find(
    (r) => String(r.id) === String(id)
  );

  const fav = isFavourite ? isFavourite(restaurant?.id) : false;

  // Extract reviews and average rating
  const reviews = restaurant?.reviews || [];
  const avg = typeof restaurant?.averageRating === "number" ? restaurant.averageRating : null;

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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            {onToggleFavourite && (
              <button
                aria-label={fav ? "Unfavourite" : "Favourite"}
                title={fav ? "Remove from favourites" : "Add to favourites"}
                style={{
                  fontSize: 30,
                  color: fav ? "var(--primary)" : "var(--text-secondary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: 12,
                  outline: fav ? "2px solid var(--primary)" : "none"
                }}
                onClick={() => {
                  onToggleFavourite(restaurant.id);
                }}
              >
                {fav ? "⭐" : "☆"}
              </button>
            )}
          </div>
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
          {typeof avg === "number" && (
            <div style={{ margin: "1px 0 8px 0", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#FFC95B", fontSize: 21 }}>
                {"★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg))}
              </span>
              <span style={{ color: "#FFC95B", fontSize: 17, fontWeight: 600 }}>
                {avg.toFixed(1)}
              </span>
              <span style={{ color: "#aaa", fontSize: 14 }}>
                ({reviews.length} review{reviews.length === 1 ? "" : "s"})
              </span>
            </div>
          )}
          {/* Map view removed */}
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
          {/* Display all reviews for this restaurant */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{
              color: "var(--primary)",
              fontSize: "1.22rem",
              fontWeight: 600,
              margin: "0 0 12px 0"
            }}>
              Reviews
            </h3>
            {reviews.length === 0 ? (
              <div style={{ color: "var(--text-secondary)", marginBottom: 16, fontSize: "1.06rem" }}>
                No reviews yet. Be the first to review after your reservation!
              </div>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column", gap: 15, marginBottom: 12
              }}>
                {reviews.slice().reverse().map(r => (
                  <div
                    key={r.id}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 9,
                      padding: "12px 15px 8px 15px",
                      fontSize: "1.03rem",
                      color: "#fff"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ fontWeight: 500, color: "#FFC95B", fontSize: 19 }}>
                        {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                      </span>
                      <span style={{ color: "#FFC95B", fontSize: 15, fontWeight: 600 }}>
                        {r.rating}/5
                      </span>
                      <span style={{ color: "#55CDF6", marginLeft: 6, fontWeight: 500 }}>
                        {r.reviewerName || "Guest"}
                      </span>
                      <span style={{ color: "#aaa", marginLeft: 12, fontSize: "0.96em" }}>
                        {new Date(r.date).toLocaleDateString()}
                      </span>
                    </div>
                    {r.text && (
                      <div style={{ marginTop: 4, color: "#eee", fontSize: "1.04rem" }}>
                        {r.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
