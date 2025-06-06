import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ReservationForm: Controlled form for making a reservation.
 * This component ensures all inputs are editable, fully controlled from local state,
 * and debuggable: all onChange handlers have console.log, and current input state is displayed.
 *
 * - NO input has 'disabled' or 'readOnly'
 * - All value props are always set from local state
 * - onChange handlers log their invocation and input
 * - State is only reset when modal/restaurant context changes (never on every input)
 * - Current state (including resetKey) is rendered at the bottom for live debugging
 * - Any issue found with instant value reset due to parent effect or prop is logged and flagged
 */
function ReservationForm({ onSubmit, onCancel, initialDetails = {}, restaurantName, restaurant }) {
  // Compose a reset key based on context (restaurant/modal open)
  const resetKey = React.useMemo(
    () =>
      String(initialDetails.restaurantId ?? "") +
      "|" +
      String(restaurantName ?? "") +
      "|" +
      String(restaurant?.id ?? ""),
    [initialDetails.restaurantId, restaurantName, restaurant?.id]
  );

  // --- Controlled input state for every form field ---
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

  // Table Preferences and Special Request
  const [tableArea, setTableArea] = useState(initialDetails.tableArea || "");
  const [windowSeat, setWindowSeat] = useState(typeof initialDetails.windowSeat !== "undefined" ? initialDetails.windowSeat : "");
  const [specialRequest, setSpecialRequest] = useState(initialDetails.specialRequest || "");

  // For reset-on-modal-open only
  const didFirstInit = useRef(false);

  // Only reset field state on context change, never after every keystroke
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
    // new fields:
    setTableArea(initialDetails.tableArea || "");
    setWindowSeat(typeof initialDetails.windowSeat !== "undefined" ? initialDetails.windowSeat : "");
    setSpecialRequest(initialDetails.specialRequest || "");
    setErrors({});
    didFirstInit.current = true;
    // Debug - log every resetKey-triggered reset
    // eslint-disable-next-line no-console
    console.log("[ReservationForm] RESET: resetKey now", resetKey, initialDetails);
  }, [resetKey]);

  // PUBLIC_INTERFACE
  function validateFields() {
    const next = {};
    if (!date) next.date = "Date is required";
    if (!time) next.time = "Time is required";
    if (!guests || Number(guests) < 1) next.guests = "Guests required";
    if (!contactName) next.contactName = "Name is required";
    if (!contactEmail && !contactPhone) next.contactContact = "Email or phone required";
    if (!tableArea) next.tableArea = "Table area required";
    if (windowSeat === "") next.windowSeat = "Window seat preference required";
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
        // new fields:
        tableArea,
        windowSeat,
        specialRequest,
      };
      if (onSubmit) {
        onSubmit(reservationData);
      }
    }
  }

  // --- Instrumented onChange handlers for each input ---
  const handleDateChange = (e) => {
    console.log("[ReservationForm] date onChange", e.target.value);
    setDate(e.target.value);
  };
  const handleTimeChange = (e) => {
    console.log("[ReservationForm] time onChange", e.target.value);
    setTime(e.target.value);
  };
  const handleGuestsChange = (e) => {
    console.log("[ReservationForm] guests onChange", e.target.value);
    setGuests(e.target.value);
  };
  const handleContactNameChange = (e) => {
    console.log("[ReservationForm] contactName onChange", e.target.value);
    setContactName(e.target.value);
  };
  const handleContactEmailChange = (e) => {
    console.log("[ReservationForm] contactEmail onChange", e.target.value);
    setContactEmail(e.target.value);
  };
  const handleContactPhoneChange = (e) => {
    console.log("[ReservationForm] contactPhone onChange", e.target.value);
    setContactPhone(e.target.value);
  };
  // Table preference handlers
  const handleTableAreaChange = (e) => {
    console.log("[ReservationForm] tableArea onChange", e.target.value);
    setTableArea(e.target.value);
  };
  const handleWindowSeatChange = (e) => {
    console.log("[ReservationForm] windowSeat onChange", e.target.value);
    setWindowSeat(e.target.value === "true" ? true : e.target.value === "false" ? false : "");
  };
  const handleSpecialRequestChange = (e) => {
    console.log("[ReservationForm] specialRequest onChange", e.target.value);
    setSpecialRequest(e.target.value);
  };

  // --- Input elements: NO disabled/readOnly, only state value binding, all changes are debuggable ---
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
            value={date}
            onChange={handleDateChange}
            style={inputStyle(errors.date)}
            autoComplete="off"
            required
            // NO disabled/readOnly
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
            value={guests}
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
        {/* Table Area Preference */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>
            Table Preference <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: 18, marginTop: 7 }}>
            <label>
              <input
                type="radio"
                name="table-area"
                value="Indoor"
                checked={tableArea === "Indoor"}
                onChange={handleTableAreaChange}
                style={{ marginRight: 6 }}
                required
              />
              Indoor
            </label>
            <label>
              <input
                type="radio"
                name="table-area"
                value="Outdoor"
                checked={tableArea === "Outdoor"}
                onChange={handleTableAreaChange}
                style={{ marginRight: 6 }}
                required
              />
              Outdoor
            </label>
          </div>
          {errors.tableArea && <div style={errorStyle}>{errors.tableArea}</div>}
        </div>
        {/* Window Seat Preference */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>
            Window Seat <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: 18, marginTop: 7 }}>
            <label>
              <input
                type="radio"
                name="window-seat"
                value="true"
                checked={windowSeat === true}
                onChange={handleWindowSeatChange}
                style={{ marginRight: 6 }}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="window-seat"
                value="false"
                checked={windowSeat === false}
                onChange={handleWindowSeatChange}
                style={{ marginRight: 6 }}
                required
              />
              No
            </label>
          </div>
          {errors.windowSeat && <div style={errorStyle}>{errors.windowSeat}</div>}
        </div>
        {/* Special Request field */}
        <div style={formGroupStyle}>
          <label htmlFor="special-request" style={labelStyle}>
            Special Request
          </label>
          <textarea
            id="special-request"
            rows={2}
            value={specialRequest}
            onChange={handleSpecialRequestChange}
            style={{
              ...inputStyle(false), resize: "vertical", fontFamily: "inherit", minHeight: 38, maxHeight: 84,
            }}
            placeholder="Any special requests? (e.g. birthday, allergies)"
          />
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
      {/* LIVE DEBUG: Render current field state & resetKey at bottom */}
      <pre style={{
        background: "#222", color: "#2D9CDB", marginTop: 18, padding: 10, borderRadius: 6, fontSize: "1.01rem"
      }}>
        {/* Display all input state for live debugging */}
        {JSON.stringify(
          { date, time, guests, contactName, contactEmail, contactPhone, tableArea, windowSeat, specialRequest, resetKey },
          null,
          2
        )}
      </pre>
    </div>
  );
}

// --- Style objects (unchanged) ---
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
