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
        onClick={e => e.stopPropagation()} // Prevent closing when clicking modal
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
      {/* Overlay click closes modal */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top:0, left:0, width:"100vw", height:"100vh",
          zIndex:199,
        }}
        onClick={onClose}
      />
    </div>
  );
}

export default Modal;
