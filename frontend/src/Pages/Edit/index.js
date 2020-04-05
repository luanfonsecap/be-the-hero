import React, { useRef, useEffect, useState } from "react";
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import * as Yup from "yup";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import Input from "../../Components/Form/Input";
import Textarea from "../../Components/Form/Textarea";
import api from "../../services/api";
import Modal from "../../Components/Modal";
import animationData from "../../assets/checked.json";

export default function Edit() {
	const formRef = useRef(null);
	const { id } = useParams();
	const token = localStorage.getItem("token");
	const [incidentTitle, setIncidentTitle] = useState("");
	const history = useHistory();

	useEffect(() => {
		function getInicidentData() {
			return api.get(`/incidents/search/${id}`);
		}

		getInicidentData().then((response) => {
			formRef.current.setData(response.data);
			setIncidentTitle(response.data.title);
		});
	}, [id]);

	async function handleUpdateIncident(data) {
		formRef.current.setErrors({});

		try {
			const schema = Yup.object().shape({
				description: Yup.string()
					.required("Descrição é obrigatório")
					.min(15, "No mínimo 15 caracteres"),
				value: Yup.number()
					.required("Valor é obrigatório")
					.typeError("Digite um valor"),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await api.put(`/incidents/${id}`, data, {
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
							<p>Caso atualizado com sucesso!</p>
							<span>
								<Lottie options={animationOptions} />
							</span>
						</Modal>
					);
				},
			});
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			} else {
				alert("Erro ao atualizar, tente novamente.");
			}
		}
	}

	return (
		<div className="edit-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Editar caso</h1>
					<p>
						Faça as alterações necessárias para deixar o caso da sua ONG
						atualizado.
					</p>
					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar para home
					</Link>
				</section>

				<Form className="form" ref={formRef} onSubmit={handleUpdateIncident}>
					<h2>{incidentTitle}</h2>
					<Textarea name="description" placeholder="Descrição" />

					<Input name="value" type="number" placeholder="Valor em reais" />

					<button className="button" type="submit">
						Atualizar
					</button>
				</Form>
			</div>
		</div>
	);
}
