import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Lists all reservations for current session (in-memory).
 * Props:
 *   - reservations: array of reservation objects from parent App
 *   - onEditReservation: function(reservationObj)
 *   - onCancelReservation: function(reservationId)
 */
function MyReservations({
  reservations = [],
  onEditReservation,
  onCancelReservation,
}) {
  const navigate = useNavigate();

  // Helper to determine if reservation is in the future (with 1 min grace)
  function isFutureReservation(reservation) {
    const { date, time } = reservation;
    if (!date || !time) return false;
    const now = new Date();
    const resDate = new Date(`${date}T${time}`);
    return resDate.getTime() > now.getTime() + 1 * 60 * 1000;
  }

  // Render confirmation dialog (browser built-in for simplicity)
  function handleCancel(res) {
    if (
      window.confirm(
        `Cancel your reservation at "${res.restaurantName}" on ${res.date} at ${res.time}?`
      )
    ) {
      onCancelReservation && onCancelReservation(res.id);
    }
  }

  return (
    <div
      style={{
        marginTop: 108,
        maxWidth: 700,
        marginLeft: "auto",
        marginRight: "auto",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        boxShadow: "0 2px 20px rgba(18,43,63,0.09)",
        padding: "34px 24px 26px 24px",
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
        My Reservations
      </h2>
      {reservations.length === 0 ? (
        <div style={{ color: "var(--text-secondary)", marginTop: 16, fontSize: "1.08rem" }}>
          You have no reservations for this session.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {reservations.map((res) => {
            const future = isFutureReservation(res);
            return (
              <div
                key={res.id}
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  background: "rgba(18,23,33,0.89)",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 18,
                  alignItems: "center",
                }}
                aria-label={`Reservation for ${res.restaurantName}`}
              >
                <span
                  role="img"
                  aria-label="booking"
                  style={{ fontSize: 30, marginRight: 10 }}
                >
                  🗓️
                </span>
                <div style={{ flex: 2 }}>
                  <div
                    style={{
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "1.14rem",
                    }}
                  >
                    {res.restaurantName || `Restaurant #${res.restaurantId}`}
                  </div>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "1.04rem",
                      margin: "6px 0 3px 0",
                    }}
                  >
                    {res.date} &nbsp;|&nbsp; {res.time} &nbsp;|&nbsp; {res.guests} guests
                  </div>
                  <div
                    style={{
                      color: "#b9ffdc",
                      fontWeight: 500,
                      fontSize: "1.02rem",
                    }}
                  >
                    {res.contactName}
                    {res.contactEmail && (
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          marginLeft: 10,
                        }}
                      >
                        {res.contactEmail}
                      </span>
                    )}
                    {res.contactPhone && (
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          marginLeft: 10,
                        }}
                      >
                        {res.contactPhone}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* PUBLIC_INTERFACE - Edit Button */}
                  {future ? (
                    <button
                      className="btn"
                      style={{
                        background: "var(--primary)",
                        color: "var(--background-dark)",
                        minWidth: 76,
                        cursor: "pointer",
                        opacity: 1,
                        marginBottom: 4,
                      }}
                      onClick={() => onEditReservation && onEditReservation(res)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{
                        background: "var(--primary)",
                        color: "var(--background-dark)",
                        minWidth: 76,
                        cursor: "not-allowed",
                        opacity: 0.6,
                        marginBottom: 4,
                      }}
                      disabled
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      Edit
                    </button>
                  )}
                  {/* PUBLIC_INTERFACE - Cancel Button */}
                  {future ? (
                    <button
                      className="btn"
                      style={{
                        background: "none",
                        color: "var(--accent)",
                        border: "1.3px solid var(--accent)",
                        minWidth: 76,
                        cursor: "pointer",
                        opacity: 1,
                      }}
                      onClick={() => handleCancel(res)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{
                        background: "none",
                        color: "var(--accent)",
                        border: "1.3px solid var(--accent)",
                        minWidth: 76,
                        cursor: "not-allowed",
                        opacity: 0.5,
                      }}
                      disabled
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <button className="btn" onClick={() => navigate("/")}>Back to Restaurants</button>
      </div>
    </div>
  );
}

export default MyReservations;
