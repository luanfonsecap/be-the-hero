import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";

import "./styles.css";
import "../../Components/Modal/styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Incident from "../../Components/Incident";
import Modal from "../../Components/Modal";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then((resposne) => setIncidents(resposne.data));
  }, [ongId]);

  async function handleDeleteIncident(id, name) {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Modal>
          <h2>Tem certeza?</h2>
          <p>
            Deletar o caso <span>{name}</span>
          </p>
          <button
            className="button"
            onClick={async () => {
              try {
                await api.delete(`/incidents/${id}`, {
                  headers: {
                    Authorization: ongId,
                  },
                });

                setIncidents(
                  incidents.filter((incident) => incident.id !== id)
                );
                onClose();
              } catch (err) {
                alert("Erro ao deletar caso, tente novamente");
              }
            }}
          >
            Sim
          </button>
          <div>
            <button className="button" onClick={onClose}>
              Não
            </button>
          </div>
        </Modal>
      ),
    });
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

      <ul>
        {incidents.length === 0 && (
          <p className="no-cases">Não há casos cadastrados para sua ONG.</p>
        )}
        {incidents.map((incident) => (
          <Incident
            incident={incident}
            key={incident.id}
            callback={handleDeleteIncident}
          />
        ))}
      </ul>
    </div>
  );
}
