import React from "react";

import "./styles.css";

export default function Modal({ children, visibility = "none" }) {
  return (
    <div className="modal-shadow" style={{ display: visibility }}>
      <div className="modal-container">{children}</div>
    </div>
  );
}
