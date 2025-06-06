import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Navbar - fixed top navigation bar with brand and navigation links.
 */
function Navbar() {
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
        <Link to="/my-reservations" style={navLinkStyle("/my-reservations")}>
          My Reservations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
