import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function ConfirmationPage() {
  /**
   * Shows confirmation of successful reservation.
   */
  const location = useLocation();
  const navigate = useNavigate();

  // Reservation might be passed via location.state.reservation
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <div style={{ marginTop: 96, color: "var(--accent)", fontWeight: 600 }}>
        No reservation found. <br />
        <button className="btn" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 450,
        margin: "110px auto 0 auto",
        background: "rgba(31,36,51,0.97)",
        padding: "38px 34px 32px 34px",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(18,43,63,0.11)",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: 750, margin: "0 0 16px 0" }}>Reservation Confirmed!</h2>
      <div style={{ color: "var(--primary)", fontSize: "1.18rem", fontWeight: 600 }}>
        {reservation.restaurantName ? reservation.restaurantName : `Restaurant #${reservation.restaurantId}`}
      </div>
      <div style={{ margin: "18px 0 12px 0", color: "var(--text-secondary)" }}>
        <strong>Date:</strong> {reservation.date} <br />
        <strong>Time:</strong> {reservation.time} <br />
        <strong>Guests:</strong> {reservation.guests} <br />
        <strong>Name:</strong> {reservation.contactName}
        {(reservation.contactEmail || reservation.contactPhone) && (
          <>
            <br />
            <strong>Contact:</strong>{" "}
            {reservation.contactEmail
              ? reservation.contactEmail
              : reservation.contactPhone}
          </>
        )}
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12 }}>
        <button className="btn btn-large" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <button
          className="btn"
          style={{
            background: "none",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
            minWidth: 110,
          }}
          onClick={() => navigate("/my-reservations")}
        >
          My Reservations
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
