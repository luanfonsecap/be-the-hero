import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function Incident({ incident, callback }) {
	const history = useHistory();

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
			<button
				onClick={() => history.push(`/edit/${incident.id}`)}
				type="button edit"
			>
				<FiEdit size={20} color="#a8a8b3" />
			</button>
		</li>
	);
}
