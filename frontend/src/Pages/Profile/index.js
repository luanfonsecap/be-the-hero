import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiX } from "react-icons/fi";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../Components/Modal";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [modal, setModal] = useState("none");
  const [deleting, setDeleting] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(resposne => setIncidents(resposne.data));
  }, [ongId]);

  function handleDeleteIncident(id, title) {
    setDeleting([id, title]);

    setModal("flex");
  }

  async function deleteIncident() {
    try {
      await api.delete(`/incidents/${deleting[0]}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== deleting[0]));
      setModal("none");
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <Modal visibility={modal}>
        <p>Deseja realmente excluir este caso ?</p>
        <span>{deleting[1]}</span>
        <button onClick={deleteIncident} className="button">
          SIM
        </button>
        <button onClick={() => setModal("none")}>
          <FiX size={18} color="#e02041" />
        </button>
      </Modal>

      <ul>
        {incidents.length === 0 && (
          <p className="no-cases">Não há casos cadastrados para sua ONG.</p>
        )}
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id, incident.title)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
