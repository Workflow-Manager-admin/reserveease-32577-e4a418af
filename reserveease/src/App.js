import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ReservationForm from './components/ReservationForm';
import ConfirmationPage from './components/ConfirmationPage';
import MyReservations from './components/MyReservations';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import restaurants from './data/restaurants';

/**
 * PUBLIC_INTERFACE
 * App: Main ReserveEase container, controls global modal state and selected restaurant for reservation.
 */
function App() {
  // Modal open/close state
  const [modalOpen, setModalOpen] = useState(false);
  // Which restaurant is being reserved (for modal prefill)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Open reservation modal for a specific restaurant
  // PUBLIC_INTERFACE
  function openReservationModal(restaurantId) {
    setSelectedRestaurantId(restaurantId);
    setModalOpen(true);
  }

  // PUBLIC_INTERFACE
  function closeReservationModal() {
    setModalOpen(false);
    setSelectedRestaurantId(null);
  }

  // Get restaurant object for modal prefill
  const currentRestaurant = selectedRestaurantId
    ? restaurants.find(r => String(r.id) === String(selectedRestaurantId))
    : null;

  // Render the reservation modal when open
  const reservationModal = (
    <Modal isOpen={modalOpen} onClose={closeReservationModal}>
      {currentRestaurant && (
        <ReservationForm
          initialDetails={{ restaurantId: currentRestaurant.id }}
          restaurantName={currentRestaurant.name}
          restaurant={currentRestaurant}
          onSubmit={() => {
            // We'll handle real submission logic (saving, confirmation) in subsequent tasks.
            closeReservationModal();
          }}
          onCancel={closeReservationModal}
        />
      )}
    </Modal>
  );

  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Modal for reservation, appears above all routes */}
        {reservationModal}
        <main>
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <RestaurantList
                    onReserve={openReservationModal}
                  />
                }
              />
              <Route
                path="/details/:id"
                element={
                  <RestaurantDetails
                    onReserve={openReservationModal}
                  />
                }
              />
              {/* Page route for reservation is still shown for back compat, but modal is primary */}
              <Route path="/reserve/:id" element={<div style={{ marginTop: 120 }}>Reservation Form Page (stub)</div>} />
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