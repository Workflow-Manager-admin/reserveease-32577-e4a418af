import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Lists all reservations for current session (in-memory).
 * Props:
 *   - reservations: array of reservation objects from parent App
 *   - onEditReservation: function(reservationObj)
 *   - onCancelReservation: function(reservationId)
 *   - restaurants: full list of restaurant data (with reviews)
 *   - onSubmitReview: function({restaurantId, reservationId, reviewerName, reviewText, rating})
 */
function MyReservations({
  reservations = [],
  onEditReservation,
  onCancelReservation,
  restaurants = [],
  onSubmitReview,
}) {
  const navigate = useNavigate();
  // For multiple review forms, track state by reservation id
  const [reviewInputs, setReviewInputs] = useState({});

  function isFutureReservation(reservation) {
    const { date, time } = reservation;
    if (!date || !time) return false;
    const now = new Date();
    const resDate = new Date(`${date}T${time}`);
    return resDate.getTime() > now.getTime() + 1 * 60 * 1000;
  }

  // Find restaurant reviews by reservation
  function getReviewForReservation(res) {
    const rObj = restaurants.find((r) => String(r.id) === String(res.restaurantId));
    if (!rObj || !rObj.reviews) return null;
    // Match review by reservation (if reservationId tagging used)
    let found = rObj.reviews.find(
      (rev) => rev.forReservationId && String(rev.forReservationId) === String(res.id)
    );
    if (found) return found;
    // older: match by reviewerName and date proximity (not as precise)
    if (res.contactName) {
      found = rObj.reviews.find(
        (rev) =>
          rev.reviewerName === res.contactName &&
          Math.abs(new Date(rev.date) - new Date(`${res.date}T${res.time}`)) < 3 * 24 * 60 * 60 * 1000 // within 3 days
      );
      if (found) return found;
    }
    return null;
  }

  // REVIEW FORM UI and handlers
  function ReviewForm({ reservation }) {
    const [star, setStar] = useState(
      reviewInputs[reservation.id]?.star || 5
    );
    const [text, setText] = useState(
      reviewInputs[reservation.id]?.text || ""
    );
    const [name, setName] = useState(
      reviewInputs[reservation.id]?.name || (reservation.contactName || "")
    );
    const [alert, setAlert] = useState("");

    function handleRatingSelect(s) {
      setStar(s);
      setReviewInputs((inputs) => ({
        ...inputs,
        [reservation.id]: { ...inputs[reservation.id], star: s },
      }));
    }
    function handleTextChange(e) {
      setText(e.target.value);
      setReviewInputs((inputs) => ({
        ...inputs,
        [reservation.id]: { ...inputs[reservation.id], text: e.target.value },
      }));
    }
    function handleNameChange(e) {
      setName(e.target.value);
      setReviewInputs((inputs) => ({
        ...inputs,
        [reservation.id]: { ...inputs[reservation.id], name: e.target.value },
      }));
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (!star) {
        setAlert("Please select a star rating.");
        return;
      }
      if (!name) {
        setAlert("Name required.");
        return;
      }
      if (
        onSubmitReview &&
        reservation &&
        reservation.restaurantId
      ) {
        onSubmitReview({
          restaurantId: reservation.restaurantId,
          reservationId: reservation.id,
          reviewerName: name,
          reviewText: text,
          rating: parseInt(star, 10),
        });
        setAlert("Review submitted! Thank you!");
        setReviewInputs((inputs) => ({
          ...inputs,
          [reservation.id]: {},
        }));
      }
    }

    return (
      <form
        style={{
          marginTop: 12,
          marginBottom: 6,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 8,
          padding: "12px 10px 10px 14px",
          border: "1.2px solid var(--border-color)",
          maxWidth: 400,
        }}
        onSubmit={handleSubmit}
        aria-label="Submit review"
      >
        <div style={{ color: "var(--primary)", fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>
          Leave a review
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 5, gap: 4 }}>
          <span style={{ color: "#FFC95B", fontSize: 22 }}>
            {[1,2,3,4,5].map(s => (
              <span
                key={s}
                style={{
                  cursor: "pointer",
                  opacity: s <= star ? 1 : 0.5,
                  marginRight: 2,
                }}
                onClick={() => handleRatingSelect(s)}
                aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " "){ handleRatingSelect(s);}}}
              >
                ★
              </span>
            ))}
          </span>
          <span style={{ color: "#FFC95B", fontWeight: 600, fontSize: 15 }}>
            {star}/5
          </span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={handleNameChange}
            required
            style={{
              width: 120,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid var(--border-color)",
              background: "#26292d",
              color: "#fff"
            }}
          />
        </div>
        <div>
          <textarea
            value={text}
            placeholder="Write a review (optional)..."
            rows={2}
            onChange={handleTextChange}
            style={{
              width: "100%",
              padding: "5px 10px",
              borderRadius: 6,
              border: "1.3px solid var(--border-color)",
              background: "#2b2f35",
              color: "#eee",
              fontSize: "1.05rem"
            }}
            maxLength={300}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="btn" type="submit" style={{ minWidth: 80 }}>
            Submit
          </button>
          {alert && (
            <span style={{ marginLeft: 10, color: alert.includes("Thank") ? "var(--accent)" : "var(--accent)", fontWeight: 600, fontSize: "1.01em" }}>
              {alert}
            </span>
          )}
        </div>
      </form>
    );
  }

  // Render confirmation dialog (browser built-in for simplicity)
  function handleCancel(res) {
    if (
      window.confirm(
        `Cancel your reservation at "${res.restaurantName}" on ${res.date} at ${res.time}?`
      )
    ) {
      if (onCancelReservation) onCancelReservation(res.id);
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
            const review = getReviewForReservation(res);
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
                  {/* IF RESERVATION IS EXPIRED and not reviewed: show review form */}
                  {!future && !review && (
                    <ReviewForm reservation={res} />
                  )}
                  {/* IF REVIEW EXISTS: show review summary */}
                  {!future && review && (
                    <div style={{
                      marginTop: 10,
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 8,
                      padding: "9px 13px",
                      color: "#FFC95B",
                      maxWidth: 400,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontWeight: 600, fontSize: 18 }}>
                          {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                        </span>
                        <span style={{ color: "#FFC95B", marginLeft: 5, fontWeight: 600 }}>
                          {review.rating}/5
                        </span>
                        <span style={{ color: "#55CDF6", marginLeft: 8, fontWeight: 500 }}>
                          {review.reviewerName || "You"}
                        </span>
                        <span style={{ color: "#aaa", marginLeft: 9, fontSize: "0.94em" }}>
                          {review.date && new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      {review.text && (
                        <div style={{ marginTop: 3, color: "#eee", fontSize: "1.02rem" }}>
                          {review.text}
                        </div>
                      )}
                    </div>
                  )}
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
