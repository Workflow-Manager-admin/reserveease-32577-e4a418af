import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function RestaurantList() {
  /**
   * Main page displaying scrollable list of restaurant cards.
   * (Stub - implementation to be completed.)
   */
  return <div style={{ marginTop: 120 }}>Restaurant List Page (stub)</div>;
}

// PUBLIC_INTERFACE
function RestaurantDetails() {
  /**
   * Shows detailed info for a restaurant, with big image and 'Reserve' option.
   * (Stub - implementation to be completed.)
   */
  return <div style={{ marginTop: 120 }}>Restaurant Details Page (stub)</div>;
}

// PUBLIC_INTERFACE
function ReservationForm() {
  /**
   * Reservation form for selected restaurant.
   * (Stub - implementation to be completed.)
   */
  return <div style={{ marginTop: 120 }}>Reservation Form Page (stub)</div>;
}

// PUBLIC_INTERFACE
function ConfirmationPage() {
  /**
   * Shows confirmation of successful reservation.
   * (Stub - implementation to be completed.)
   */
  return <div style={{ marginTop: 120 }}>Confirmation Page (stub)</div>;
}

// PUBLIC_INTERFACE
function MyReservations() {
  /**
   * Lists all reservations for current session.
   * (Stub - implementation to be completed.)
   */
  return <div style={{ marginTop: 120 }}>My Reservations Page (stub)</div>;
}

// PUBLIC_INTERFACE
function Modal({ isOpen, children, onClose }) {
  /**
   * Optional modal component skeleton (not used yet, for future integration)
   */
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 200,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      role="dialog"
      aria-modal="true"
    >
      <div style={{ background: "#222", padding: 32, borderRadius: 8, minWidth: 320, minHeight: 120, position: "relative" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer"
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar stub - fixed top navbar with brand and navigation links
   */
  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div className="logo">
            <span className="logo-symbol">*</span> ReserveEase
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/" className="btn" style={{ textDecoration: 'none' }}>
              Browse Restaurants
            </Link>
            <Link to="/my-reservations" className="btn" style={{ textDecoration: 'none' }}>
              My Reservations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main ReserveEase container: sets up routing and renders main layout
   */
  // For future: modal logic can go here if reservation form uses modal.
  // const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Example of modal integration for reservation form, not yet active */}
        {/* <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} /> */}
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<RestaurantList />} />
              <Route path="/details/:id" element={<RestaurantDetails />} />
              <Route path="/reserve/:id" element={<ReservationForm />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/my-reservations" element={<MyReservations />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;