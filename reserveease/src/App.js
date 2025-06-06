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

  // Track if editing (reservationId/null) and prefill
  const [editingReservationId, setEditingReservationId] = React.useState(null);
  const [editInitialDetails, setEditInitialDetails] = React.useState({});

  // PUBLIC_INTERFACE
  function openReservationModal(restaurantId) {
    setSelectedRestaurantId(restaurantId);
    setEditingReservationId(null);
    setEditInitialDetails({});
    setModalOpen(true);
  }

  // PUBLIC_INTERFACE
  function closeReservationModal() {
    setModalOpen(false);
    setSelectedRestaurantId(null);
    setEditingReservationId(null);
    setEditInitialDetails({});
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

  function AppWithNavigate() {
    const navigate = useNavigate();

    /**
     * Handles both adding a new reservation and editing an existing one.
     * If editingReservationId is set, it updates the existing reservation.
     */
    function handleReservationSubmit(formData) {
      let reservation, isEdit = false;
      if (editingReservationId) {
        // Update
        const prev = reservations.find((r) => r.id === editingReservationId);
        const restaurantId = formData.restaurantId ?? prev?.restaurantId;
        const restaurant = restaurants.find(r => String(r.id) === String(restaurantId)) || {};
        reservation = {
          ...prev,
          ...formData,
          restaurantId,
          restaurantName: restaurant.name,
          id: editingReservationId,
          contactName: formData.contactName || formData.contact || prev.contactName || "",
        };
        setReservations((prevArr) =>
          prevArr.map((r) => (r.id === editingReservationId ? reservation : r))
        );
        isEdit = true;
      } else {
        // Add new
        const restaurantId =
          (formData.restaurantId ?? selectedRestaurantId) ?? null;
        const restaurant =
          restaurants.find(
            (r) => String(r.id) === String(restaurantId)
          ) || {};
        reservation = {
          id: generateReservationId(),
          restaurantId,
          restaurantName: restaurant.name,
          // Always store contactName, regardless of the form field's property name
          ...formData,
          contactName: formData.contactName || formData.contact || "",
        };
        setReservations((prev) => [...prev, reservation]);
      }

      // Notification logic (unchanged)
      try {
        if ('Notification' in window) {
          if (Notification.permission === "default") {
            Notification.requestPermission();
          }
          if (Notification.permission === "granted") {
            const dateStr = reservation.date || "";
            const timeStr = reservation.time || "";
            if (dateStr && timeStr) {
              const resDate = new Date(`${dateStr}T${timeStr}`);
              if (!isNaN(resDate.getTime())) {
                const before1h = new Date(resDate.getTime() - 60 * 60 * 1000);
                const msDelay = before1h.getTime() - Date.now();
                if (msDelay > 5000) {
                  setTimeout(() => {
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

      // Redirect to confirmation for new or edited reservation
      navigate('/confirmation', { state: { reservation } });
    }

    // PUBLIC_INTERFACE -- Cancel reservation
    function handleCancelReservation(reservationId) {
      try {
        // Step 1: Log invocation and type.
        console.log(
          '[App.handleCancelReservation] CALLED!',
          '\n  reservationId:', reservationId, '(typeof:', typeof reservationId + ')'
        );
        // Step 2: Log full state before update, with both string/strict matching for all ids.
        setReservations((prev) => {
          console.log('[App.handleCancelReservation] PREVIOUS STATE (full):', JSON.stringify(prev, null, 2));
          const idsList = prev.map((r) => r.id + ' (typeof ' + typeof r.id + ')');
          console.log('[App.handleCancelReservation] ALL RESERVATION IDS:', idsList);

          // Step 3: Log per-reservation, which ids match by string/strict equality.
          const matches = prev.map((r, idx) => {
            const matchStrict = r.id === reservationId;
            const matchString = String(r.id) === String(reservationId);
            if (matchStrict) {
              console.log(
                `[App.handleCancelReservation] #${idx}: STRICT id match for`, r.id, '(typeof', typeof r.id + ')'
              );
            }
            if (matchString) {
              console.log(
                `[App.handleCancelReservation] #${idx}: STRING id match for`, r.id, '(typeof', typeof r.id + ')'
              );
            }
            return { matchStrict, matchString };
          });
          const matchCount = matches.filter(m => m.matchString).length;
          console.log('[App.handleCancelReservation] RESERVATIONS with id == (string):', matchCount);

          // Step 4: Build new filtered state, logging for each
          const filtered = prev.filter((r, idx) => {
            const idMatch = String(r.id) === String(reservationId);
            if (idMatch) {
              console.log(
                `[App.handleCancelReservation] Removing reservation idx`, idx,
                'id:', r.id, '(typeof', typeof r.id + ') for match with:', reservationId, '(typeof', typeof reservationId + ')'
              );
            }
            return !idMatch;
          });

          // Step 5: Log result and before/after ids
          const filteredIds = filtered.map(r => r.id);
          console.log(
            '[App.handleCancelReservation] FILTERED STATE after removal. Remaining IDs:', filteredIds,
            '\n Full filtered:', JSON.stringify(filtered, null, 2)
          );
          if (filtered.length === prev.length) {
            // None were removed
            console.warn(
              '[App.handleCancelReservation] No reservation was removed! Searched for id:',
              reservationId,
              '\nExisting ids:', idsList,
              '\nMatch counts:', matches
            );
            // Additional diagnostic: dump match for object reference
            const matchingObj = prev.find(r => r === reservationId);
            if (matchingObj) {
              console.warn(
                '[App.handleCancelReservation] Found reservation via object reference equality, not id value!',
                matchingObj
              );
            }
            if (matchCount === 0) {
              // The logic failed to match any. Check UI block/hydration issues.
              console.warn('[App.handleCancelReservation] No string id match found at all: data-type or render error?');
            }
          } else {
            console.log(
              '[App.handleCancelReservation] A reservation WAS removed. New count:', filtered.length
            );
          }

          console.log('[App.handleCancelReservation] setReservations() will now return the filtered state.');
          return filtered;
        });
      } catch (err) {
        console.error('[App.handleCancelReservation] Error during cancellation:', err);
      }
    }

    // PUBLIC_INTERFACE -- Edit reservation: open modal prefilled
    function handleEditReservation(reservationObj) {
      if (!reservationObj) return;
      setEditInitialDetails({
        ...reservationObj,
        restaurantId: reservationObj.restaurantId,
      });
      setEditingReservationId(reservationObj.id);
      setSelectedRestaurantId(reservationObj.restaurantId);
      setModalOpen(true);
    }

    // Get restaurant object for modal prefill (edit or add)
    const currentRestaurant = selectedRestaurantId
      ? restaurants.find(
          (r) => String(r.id) === String(selectedRestaurantId)
        )
      : null;

    // Edit or Add initial details
    const reservationInitialDetails = React.useMemo(() => {
      if (editingReservationId && editInitialDetails && editInitialDetails.id) {
        return { ...editInitialDetails };
      }
      return currentRestaurant
        ? { restaurantId: currentRestaurant.id }
        : {};
    }, [currentRestaurant, editingReservationId, editInitialDetails]);

    const reservationModal = (
      <Modal isOpen={modalOpen} onClose={closeReservationModal}>
        {currentRestaurant && (
          <ReservationForm
            key={String(editingReservationId) + "|" + String(currentRestaurant?.id)}
            initialDetails={reservationInitialDetails}
            restaurantName={currentRestaurant.name}
            restaurant={currentRestaurant}
            onSubmit={handleReservationSubmit}
            onCancel={closeReservationModal}
            isEditing={!!editingReservationId}
          />
        )}
      </Modal>
    );

    return (
      <>
        {/* Modal for reservation (new or edit) */}
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
