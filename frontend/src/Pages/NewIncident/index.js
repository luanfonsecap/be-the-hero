import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../Components/Modal";

export default function NewIncident() {
  const [title, setTtile] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [modal, setModal] = useState("none");

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      setModal("flex");
      setTimeout(() => {
        history.push("/profile");
      }, 1200);
    } catch (err) {
      console.log(err);

      alert("Erro ao cadastrar caso, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <Modal visibility={modal}>
        <p>Caso cadastrado com sucesso !</p>
        <span>
          <FiHeart size={32} />
        </span>
      </Modal>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um héroi para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTtile(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
