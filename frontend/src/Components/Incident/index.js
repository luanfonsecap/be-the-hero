import React from "react";
import { FiTrash2 } from "react-icons/fi";

import "./styles.css";

export default function Incident({ incident, callback }) {
  return (
    <li className="incident">
      <strong>CASO:</strong>
      <p>{incident.title}</p>

      <strong>DESCRIÇÃO:</strong>
      <p>{incident.description}</p>

      <strong>VALOR:</strong>
      <p>
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(incident.value)}
      </p>

      <button
        onClick={() => callback(incident.id, incident.title)}
        type="button"
      >
        <FiTrash2 size={20} color="#a8a8b3" />
      </button>
    </li>
  );
}
