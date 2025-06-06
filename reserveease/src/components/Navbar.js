import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Navbar - fixed top navigation bar with brand and navigation links.
 */
function Navbar({ favouritesCount }) {
  const location = useLocation();

  const navLinkStyle = (to) => ({
    color: location.pathname === to ? "var(--primary)" : "var(--text-color)",
    fontWeight: location.pathname === to ? 600 : 400,
    textDecoration: "none",
    marginRight: 24,
    fontSize: "1.06rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.13s",
    position: "relative",
    display: "inline-flex",
    alignItems: "center"
  });

  return (
    <nav className="navbar" role="navigation" aria-label="Navigation">
      <div className="logo">
        <span className="logo-symbol" aria-label="ReserveEase">
          🍽️
        </span>
        <span>DineNow</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Link to="/" style={navLinkStyle("/")}>
          Restaurants
        </Link>
        <Link to="/favourites" style={navLinkStyle("/favourites")}>
          <span role="img" aria-label="favourite" style={{marginRight: 4}}>⭐</span>
          Favourites
          {favouritesCount > 0 && (
            <span
              style={{
                marginLeft: 5,
                background: "var(--primary)",
                color: "var(--background-dark)",
                fontWeight: 700,
                borderRadius: 8,
                padding: "0 7px",
                fontSize: "0.97em",
                display: "inline-block"
              }}
            >
              {favouritesCount}
            </span>
          )}
        </Link>
        <Link to="/my-reservations" style={navLinkStyle("/my-reservations")}>
          My Reservations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
