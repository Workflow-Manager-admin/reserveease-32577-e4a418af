import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

  // In-memory state for reservations in current session
  const [reservations, setReservations] = useState([]);

  // Navigation helper hook
  // Only available in a child component under Router; so we use a wrapper below

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

  // Generate a unique reservation id
  const generateReservationId = () => {
    return (
      'res_' +
      Math.random().toString(36).substring(2, 8) +
      '_' +
      Date.now().toString(36)
    );
  };

  // Wrapper to provide navigate for save handler
  function AppWithNavigate() {
    const navigate = useNavigate();
    const location = useLocation();

    // Save reservation handler
    // PUBLIC_INTERFACE
    function handleReservationSubmit(formData) {
      // Attach restaurantId (if not present) and generate unique reservation id
      const restaurantId =
        (formData.restaurantId ?? selectedRestaurantId) ?? null;
      const restaurant =
        restaurants.find(
          (r) => String(r.id) === String(restaurantId)
        ) || {};
      const reservation = {
        id: generateReservationId(),
        restaurantId: restaurantId,
        restaurantName: restaurant.name,
        ...formData,
      };
      setReservations((prev) => [...prev, reservation]);
      closeReservationModal();
      // Redirect to confirmation with reservation details (use location state)
      navigate('/confirmation', { state: { reservation } });
    }

    // Get restaurant object for modal prefill
    const currentRestaurant = selectedRestaurantId
      ? restaurants.find(
          (r) => String(r.id) === String(selectedRestaurantId)
        )
      : null;

    // Render the reservation modal when open
    const reservationModal = (
      <Modal isOpen={modalOpen} onClose={closeReservationModal}>
        {currentRestaurant && (
          <ReservationForm
            initialDetails={{ restaurantId: currentRestaurant.id }}
            restaurantName={currentRestaurant.name}
            restaurant={currentRestaurant}
            onSubmit={handleReservationSubmit}
            onCancel={closeReservationModal}
          />
        )}
      </Modal>
    );

    return (
      <>
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
              <Route
                path="/reserve/:id"
                element={
                  <div style={{ marginTop: 120 }}>
                    Reservation Form Page (stub)
                  </div>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <ConfirmationPage />
                }
              />
              <Route
                path="/my-reservations"
                element={
                  <MyReservations reservations={reservations} />
                }
              />
            </Routes>
          </div>
        </main>
      </>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <AppWithNavigate />
      </div>
    </Router>
  );
}

export default App;