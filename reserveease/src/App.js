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

      // Reminder notification logic (only if Notification API available)
      try {
        if ('Notification' in window) {
          if (Notification.permission === "default") {
            Notification.requestPermission(); // non-blocking, will be honored on next booking
          }
          if (Notification.permission === "granted") {
            // Compute 1h before reservation
            const dateStr = reservation.date || "";
            const timeStr = reservation.time || "";
            if (dateStr && timeStr) {
              const resDate = new Date(`${dateStr}T${timeStr}`);
              if (!isNaN(resDate.getTime())) {
                const before1h = new Date(resDate.getTime() - 60 * 60 * 1000);
                const msDelay = before1h.getTime() - Date.now();
                if (msDelay > 5000) {  // ignore notifications for past or <5s-away errors
                  setTimeout(() => {
                    // Notification content (limit to base info)
                    new Notification("Reservation Reminder", {
                      body: `You have a reservation at ${reservation.restaurantName || 'the restaurant'} at ${reservation.time}.`
                    });
                  }, msDelay);
                }
              }
            }
          }
        }
      } catch (e) {
        // Silent fail for prototype
        // eslint-disable-next-line no-console
        console.log("Notification API error:", e);
      }

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

    // Memoize initialDetails so the object reference is stable unless the restaurant changes
    const reservationInitialDetails = React.useMemo(() => {
      return currentRestaurant
        ? { restaurantId: currentRestaurant.id }
        : {};
    }, [currentRestaurant]);

    // Render the reservation modal when open
    const reservationModal = (
      <Modal isOpen={modalOpen} onClose={closeReservationModal}>
        {currentRestaurant && (
          <ReservationForm
            initialDetails={reservationInitialDetails}
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
                  <MyReservations
                    reservations={reservations}
                    onEditReservation={handleEditReservation}
                    onCancelReservation={handleCancelReservation}
                  />
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