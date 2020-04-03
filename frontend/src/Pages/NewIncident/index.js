import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import Lottie from "react-lottie";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../Components/Modal";
import animationData from "../../assets/checked.json";

export default function NewIncident() {
	const [title, setTtile] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");

	const token = localStorage.getItem("token");

	const history = useHistory();

	async function handleNewIncident(e) {
		e.preventDefault();

		const data = { title, description, value };

		try {
			await api.post("/incidents", data, {
				headers: {
					Authorization: token,
				},
			});

			const animationOptions = {
				loop: false,
				autoplay: true,
				animationData: animationData,
				rendererSettings: {
					preserveAspectRatio: "xMidYMid slice",
				},
			};

			confirmAlert({
				customUI: ({ onClose }) => {
					setTimeout(() => {
						onClose();
						history.push("/profile");
					}, 1300);
					return (
						<Modal>
							<p>Caso criado com sucesso!</p>
							<span>
								<Lottie options={animationOptions} />
							</span>
						</Modal>
					);
				},
			});
		} catch (err) {
			console.log(err);

			alert("Erro ao cadastrar caso, tente novamente");
		}
	}

	return (
		<div className="new-incident-container">
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
						onChange={(e) => setTtile(e.target.value)}
					/>
					<textarea
						placeholder="Descrição"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						placeholder="Valor em reais"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>

					<button className="button" type="submit">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
