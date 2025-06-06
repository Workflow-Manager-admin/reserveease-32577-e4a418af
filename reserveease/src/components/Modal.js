import React from "react";

/**
 * PUBLIC_INTERFACE
 * Modal: Generic modal dialog following ReserveEase dark theme.
 * Props:
 *   - isOpen: boolean, modal visibility
 *   - children: ReactNode, modal content
 *   - onClose: function to close the modal
 */
function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  // Clicking the overlay (not the modal content) closes the modal.
  // The overlay and modal content are siblings, so to guarantee correct event handling,
  // we restructure as follows: a single overlay <div> (fills screen) handles onClick, and 
  // clicking inside the child modal content stops propagation, thus only overlay clicks trigger close.

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 200,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.54)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      role="dialog"
      aria-modal="true"
      onClick={onClose} // click-outside closes modal
    >
      <div
        style={{
          background: "var(--background-dark)",
          padding: 36,
          borderRadius: 12,
          minWidth: 340,
          minHeight: 120,
          position: "relative",
          boxShadow: "0 8px 48px rgba(18,43,63,0.18)",
        }}
        onClick={e => e.stopPropagation()} // Prevent inside clicks from propagating to overlay
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 28,
            cursor: "pointer",
            opacity: 0.75,
            transition: "opacity .15s",
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
