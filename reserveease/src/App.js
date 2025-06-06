import React from 'react';
import './App.css';
// PUBLIC_INTERFACE
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Placeholder (empty) components for routes
function RestaurantList() {
  return <div style={{ marginTop: 120 }}>Restaurant List Page (stub)</div>;
}
function RestaurantDetails() {
  return <div style={{ marginTop: 120 }}>Restaurant Details Page (stub)</div>;
}
function ReservationForm() {
  return <div style={{ marginTop: 120 }}>Reservation Form Page (stub)</div>;
}
function ConfirmationPage() {
  return <div style={{ marginTop: 120 }}>Confirmation Page (stub)</div>;
}
function MyReservations() {
  return <div style={{ marginTop: 120 }}>My Reservations Page (stub)</div>;
}

function App() {
  return (
    <Router>
      <div className="app">
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