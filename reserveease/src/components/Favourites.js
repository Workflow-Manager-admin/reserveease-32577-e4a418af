import React from "react";

// PUBLIC_INTERFACE
// Favourites page: lists all favourite restaurants with details and a Reserve button.
function Favourites({ favourites = [], onReserve, onUnfavourite }) {
  return (
    <div
      style={{
        marginTop: 86,
        maxWidth: 850,
        marginLeft: "auto",
        marginRight: "auto",
        background: "rgba(255,255,255,0.025)",
        borderRadius: 18,
        boxShadow: "0 2px 16px rgba(18,43,63,0.11)",
        padding: "44px 26px 28px 26px",
      }}
    >
      <h2
        style={{
          color: "var(--primary)",
          margin: "0 0 22px 0",
          fontWeight: 700,
          textAlign: "left",
        }}
      >
        Favourites
      </h2>
      {favourites.length === 0 ? (
        <div style={{ color: "var(--text-secondary)", marginTop: 18, fontSize: "1.08rem" }}>
          You have no favourite restaurants. Browse and click the ⭐ to add some!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {favourites.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                background: "rgba(18,23,33,0.91)",
                padding: "18px 20px",
                display: "flex",
                flexDirection: "row",
                gap: 18,
                alignItems: "center",
              }}
              aria-label={`Favourite restaurant: ${restaurant.name}`}
            >
              <div
                style={{
                  width: 94,
                  height: 94,
                  background: "#232323",
                  borderRadius: 10,
                  overflow: "hidden",
                  marginRight: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={restaurant.image || "https://via.placeholder.com/94?text=Food"}
                  alt={restaurant.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "var(--primary)",
                    fontWeight: 600,
                    fontSize: "1.18rem",
                    marginBottom: 3,
                  }}
                >
                  {restaurant.name}
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1.06rem",
                    marginBottom: 2,
                  }}
                >
                  {restaurant.location} &bull; {restaurant.cuisine}
                </div>
                <div
                  style={{
                    color: "#ddd", fontSize: "1.01rem", marginBottom: 3, maxWidth: 450, overflow: "hidden", textOverflow: "ellipsis",
                  }}
                >
                  {restaurant.description}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <button
                  className="btn"
                  style={{
                    minWidth: 84,
                    marginBottom: 5,
                  }}
                  onClick={() => onReserve(restaurant.id)}
                >
                  Reserve
                </button>
                <button
                  className="btn"
                  style={{
                    background: "none",
                    color: "var(--accent)",
                    border: "1.3px solid var(--accent)",
                    minWidth: 72,
                  }}
                  aria-label="Unfavourite"
                  title="Remove from favourites"
                  onClick={() => onUnfavourite(restaurant.id)}
                >
                  ⭐ Unfavourite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
