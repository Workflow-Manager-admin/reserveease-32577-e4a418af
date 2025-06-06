import React, { useState } from "react";

// PUBLIC_INTERFACE
function ReservationForm({ onSubmit, onCancel, initialDetails = {}, restaurantName }) {
  /**
   * ReservationForm: Collect reservation details (date, time, guests, contact info).
   * - Controlled (React state) form.
   * - Styled for dark theme.
   * - Validation stubs in place for client-side checks (not yet implemented).
   * - Can be used in a modal or full-page route.
   * 
   * Props:
   * - onSubmit: function(reservationData)
   * - onCancel: function() | optional (for modal flow)
   * - initialDetails: object | optional (prefill)
   * - restaurantName: string | optional, display as heading
   */

  // Internal state for form fields.
  const [date, setDate] = useState(initialDetails.date || "");
  const [time, setTime] = useState(initialDetails.time || "");
  const [guests, setGuests] = useState(initialDetails.guests || 2);
  const [contactName, setContactName] = useState(initialDetails.contactName || "");
  const [contactContact, setContactContact] = useState(initialDetails.contactContact || ""); // phone or email

  // Validation state (placeholders for logic).
  const [errors, setErrors] = useState({});

  // Handlers
  const handleChange = (setter) => (e) => setter(e.target.value);

  // PUBLIC_INTERFACE
  function validateFields() {
    /** Placeholder for actual client-side validation */
    // This will be filled with real checks (required fields, formats, etc.)
    const nextErrors = {};
    // Stub for required field checking
    if (!date) nextErrors.date = "Date is required";
    if (!time) nextErrors.time = "Time is required";
    if (!guests || Number(guests) < 1) nextErrors.guests = "Number of guests required";
    if (!contactName) nextErrors.contactName = "Contact name required";
    if (!contactContact) nextErrors.contactContact = "Phone or email required";
    // Add more sophisticated validation here as needed (formats, time slot rules, etc.)
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // PUBLIC_INTERFACE
  function handleFormSubmit(e) {
    e.preventDefault();
    if (validateFields()) {
      // Compose reservation object
      const reservationData = {
        date,
        time,
        guests: Number(guests),
        contactName,
        contactContact,
      };
      if (onSubmit) {
        onSubmit(reservationData);
      } else {
        // Fallback: just log (for testing standalone)
        // eslint-disable-next-line no-console
        console.log("Reservation submitted:", reservationData);
      }
    }
  }

  // Main form UI
  return (
    <div
      style={{
        margin: "56px auto 0 auto",
        maxWidth: 400,
        background: "rgba(31,36,51,0.97)",
        padding: "36px 30px 30px 30px",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(18,43,63,0.09)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "var(--primary)",
          fontWeight: 700,
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        {restaurantName || "Reserve a Table"}
      </h2>

      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Date */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="reservation-date" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Date <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-date"
            type="date"
            value={date}
            onChange={handleChange(setDate)}
            min={new Date().toISOString().split("T")[0]}
            style={inputStyle(errors.date)}
            autoComplete="off"
          />
          {errors.date && <div style={errorStyle}>{errors.date}</div>}
        </div>

        {/* Time */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="reservation-time" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Time <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-time"
            type="time"
            value={time}
            onChange={handleChange(setTime)}
            style={inputStyle(errors.time)}
            autoComplete="off"
          />
          {errors.time && <div style={errorStyle}>{errors.time}</div>}
        </div>

        {/* Guests */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="reservation-guests" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Number of Guests <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-guests"
            type="number"
            min={1}
            max={30}
            value={guests}
            onChange={handleChange(setGuests)}
            style={inputStyle(errors.guests)}
          />
          {errors.guests && <div style={errorStyle}>{errors.guests}</div>}
        </div>

        {/* Contact Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="reservation-name" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Contact Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-name"
            type="text"
            value={contactName}
            onChange={handleChange(setContactName)}
            style={inputStyle(errors.contactName)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.contactName && <div style={errorStyle}>{errors.contactName}</div>}
        </div>

        {/* Contact Email or Phone */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="reservation-contact" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Contact Phone or Email <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-contact"
            type="text"
            value={contactContact}
            onChange={handleChange(setContactContact)}
            style={inputStyle(errors.contactContact)}
            placeholder="Email or phone number"
            autoComplete="email"
          />
          {errors.contactContact && <div style={errorStyle}>{errors.contactContact}</div>}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 14, marginTop: 8, justifyContent: "center" }}>
          <button type="submit" className="btn btn-large" style={{ minWidth: 110 }}>
            Submit
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn"
              style={{
                background: "none",
                color: "var(--primary)",
                border: "1px solid var(--primary)",
                minWidth: 86,
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Internal styling helpers
const inputStyle = (error) => ({
  marginTop: 4,
  padding: "10px 14px",
  borderRadius: 6,
  border: error ? "1.5px solid var(--accent)" : "1.5px solid var(--border-color)",
  background: "var(--background-dark)",
  color: "var(--text-color)",
  fontSize: "1.07rem",
  fontWeight: 400,
  outline: "none",
  boxShadow: "none",
  marginBottom: 2,
});

const errorStyle = {
  color: "var(--accent)",
  fontSize: "0.97rem",
  fontWeight: 500,
  marginTop: 2,
};

export default ReservationForm;
