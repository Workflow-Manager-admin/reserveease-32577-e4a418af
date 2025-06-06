import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ReservationForm: Controlled form for making a reservation.
 * All fields are fully controlled via local state, and the state is only initialized/reset
 * when the modal is first opened or the restaurant changes. State is NOT reset on every render/
 * user edit, and all form fields are always editable. No useEffect or handler should ever cause repeated resets!
 *
 * - All input values are controlled from local state.
 * - Fields are initialized on modal open or restaurant change.
 * - No field state is controlled by props or reset by a useEffect using field state as dependency.
 */
function ReservationForm({ onSubmit, onCancel, initialDetails = {}, restaurantName, restaurant }) {
  // Reset key: only changes when restaurantId, modal open, or initialDetails change (NOT field values!)
  const resetKey = React.useMemo(
    () =>
      String(initialDetails.restaurantId ?? "") +
      "|" +
      String(restaurantName ?? "") +
      "|" +
      String(restaurant?.id ?? ""),
    [initialDetails.restaurantId, restaurantName, restaurant?.id]
  );

  // Local state for all fields. Initialized only when resetKey changes.
  const [date, setDate] = useState(initialDetails.date || "");
  const [time, setTime] = useState(initialDetails.time || "");
  const [guests, setGuests] = useState(
    typeof initialDetails.guests === "number"
      ? String(initialDetails.guests)
      : initialDetails.guests || "2"
  );
  const [contactName, setContactName] = useState(initialDetails.contactName || "");
  const [contactEmail, setContactEmail] = useState(initialDetails.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(initialDetails.contactPhone || "");
  const [errors, setErrors] = useState({});

  // Ref for checking if first mount to avoid double-init
  const didFirstInit = useRef(false);

  // Reset form state ONLY on resetKey change (i.e., modal open/close, restaurant change).
  useEffect(() => {
    setDate(initialDetails.date || "");
    setTime(initialDetails.time || "");
    setGuests(
      typeof initialDetails.guests === "number"
        ? String(initialDetails.guests)
        : initialDetails.guests || "2"
    );
    setContactName(initialDetails.contactName || "");
    setContactEmail(initialDetails.contactEmail || "");
    setContactPhone(initialDetails.contactPhone || "");
    setErrors({});
    didFirstInit.current = true;
    // Debug: Show reset on modal/restaurant change
    // eslint-disable-next-line no-console
    // console.log("[ReservationForm] Reset fields: date", initialDetails.date, "time", initialDetails.time, "guests", initialDetails.guests);
    // eslint-disable-next-line
  }, [resetKey]);

  // PUBLIC_INTERFACE
  function validateFields() {
    /** Validation stub—core checks only (expand as needed) */
    const next = {};
    if (!date) next.date = "Date is required";
    if (!time) next.time = "Time is required";
    if (!guests || Number(guests) < 1) next.guests = "Guests required";
    if (!contactName) next.contactName = "Name is required";
    if (!contactEmail && !contactPhone) next.contactContact = "Email or phone required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // PUBLIC_INTERFACE
  function handleFormSubmit(e) {
    e.preventDefault();
    if (validateFields()) {
      const reservationData = {
        restaurantId: initialDetails.restaurantId,
        date,
        time,
        guests: Number(guests),
        contactName,
        contactEmail,
        contactPhone,
      };
      if (onSubmit) {
        onSubmit(reservationData);
      }
    }
  }

  // Controlled input handlers per field
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleGuestsChange = (e) => setGuests(e.target.value);
  const handleContactNameChange = (e) => setContactName(e.target.value);
  const handleContactEmailChange = (e) => setContactEmail(e.target.value);
  const handleContactPhoneChange = (e) => setContactPhone(e.target.value);

  return (
    <div
      style={{
        margin: "56px auto 0 auto",
        maxWidth: 430,
        background: "rgba(31,36,51,0.99)",
        padding: "38px 30px 30px 30px",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(18,43,63,0.10)",
      }}
      role="form"
      aria-label="Reservation Form"
    >
      <h2
        style={{
          marginTop: 0,
          color: "var(--primary)",
          fontWeight: 700,
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: 22,
        }}
      >
        {restaurantName ?? "Reserve a Table"}
      </h2>
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Date */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-date" style={labelStyle}>
            Date <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date || ""}
            onChange={handleDateChange}
            style={inputStyle(errors.date)}
            autoComplete="off"
            required
          />
          {errors.date && <div style={errorStyle}>{errors.date}</div>}
        </div>
        {/* Time */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-time" style={labelStyle}>
            Time <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            style={inputStyle(errors.time)}
            autoComplete="off"
            required
          />
          {errors.time && <div style={errorStyle}>{errors.time}</div>}
        </div>
        {/* Guests */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-guests" style={labelStyle}>
            Number of Guests <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-guests"
            type="number"
            min={1}
            max={24}
            value={guests || "2"}
            onChange={handleGuestsChange}
            style={inputStyle(errors.guests)}
            required
          />
          {errors.guests && <div style={errorStyle}>{errors.guests}</div>}
        </div>
        {/* Contact Name */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-name" style={labelStyle}>
            Contact Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-name"
            type="text"
            value={contactName}
            onChange={handleContactNameChange}
            style={inputStyle(errors.contactName)}
            placeholder="Your name"
            autoComplete="name"
            required
          />
          {errors.contactName && <div style={errorStyle}>{errors.contactName}</div>}
        </div>
        {/* Contact Email */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-email" style={labelStyle}>
            Contact Email <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-email"
            type="email"
            value={contactEmail}
            onChange={handleContactEmailChange}
            style={inputStyle(errors.contactContact)}
            placeholder="Email (or use phone below)"
            autoComplete="email"
          />
        </div>
        {/* Contact Phone */}
        <div style={formGroupStyle}>
          <label htmlFor="reservation-phone" style={labelStyle}>
            Contact Phone <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="reservation-phone"
            type="tel"
            value={contactPhone}
            onChange={handleContactPhoneChange}
            style={inputStyle(errors.contactContact)}
            placeholder="Phone (or use email above)"
            autoComplete="tel"
          />
          {errors.contactContact && <div style={errorStyle}>{errors.contactContact}</div>}
        </div>
        {/* Buttons */}
        <div style={{ display: "flex", gap: 14, marginTop: 8, justifyContent: "center" }}>
          <button type="submit" className="btn btn-large" style={{ minWidth: 110 }}>
            Reserve
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

// Internal style objects
const formGroupStyle = { display: "flex", flexDirection: "column" };
const labelStyle = { color: "var(--text-secondary)", fontWeight: 500 };
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
