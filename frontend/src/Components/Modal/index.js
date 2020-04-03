import React from "react";

import "./styles.css";

export default function Modal({ children }) {
  return (
    <div className="modal-shadow">
      <div className="modal-container">{children}</div>
    </div>
  );
}
