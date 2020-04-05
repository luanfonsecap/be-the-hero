import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { Form } from "@unform/web";
import Input from "../../Components/Form/Input";
import Textarea from "../../Components/Form/Textarea";
import * as Yup from "yup";
import Lottie from "react-lottie";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../Components/Modal";
import animationData from "../../assets/checked.json";

export default function NewIncident() {
	const token = localStorage.getItem("token");
	const formRef = useRef(null);

	const history = useHistory();

	async function handleNewIncident(data) {
		try {
			const schema = Yup.object().shape({
				title: Yup.string()
					.required("Título é obrigatório")
					.min(5, "No mínimo 5 caracteres"),
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
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			} else {
				alert("Erro ao cadastrar caso, tente novamente");
			}
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

				<Form ref={formRef} onSubmit={handleNewIncident}>
					<Input name="title" placeholder="Título do caso" />
					<Textarea name="description" placeholder="Descrição" />

					<Input name="value" type="number" placeholder="Valor em reais" />

					<button className="button" type="submit">
						Cadastrar
					</button>
				</Form>
			</div>
		</div>
	);
}
