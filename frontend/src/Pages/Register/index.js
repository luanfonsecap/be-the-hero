import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { Form } from "@unform/web";
import * as Yup from "yup";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../Components/Modal";
import Input from "../../Components/Form/Input";

export default function Register() {
	const formRef = useRef(null);
	const history = useHistory();

	async function handleRegister(data) {
		formRef.current.setErrors({});
		try {
			const schema = Yup.object().shape({
				name: Yup.string()
					.required("Nome é obrigatório")
					.min(3, "No mínimo 3 caracteres"),
				email: Yup.string()
					.required("Email é obrigatório")
					.email("Digite um email válido"),
				whatsapp: Yup.number()
					.typeError("WhatsApp é obrigatório")
					.required("WhatsApp é obrigatório")
					.min(10, "Digite seu número com o DDD sem o zero"),
				city: Yup.string().required("Cidade é obrigatório"),
				uf: Yup.string()
					.required("UF é obrigatório")
					.max(2, "Digite somente a silga da UF"),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const response = await api.post("/ongs", data);

			confirmAlert({
				customUI: ({ onClose }) => (
					<Modal>
						<p>Anote seu ID de cadastro:</p>
						<p>
							<span>{response.data.id}</span>
						</p>
						<button onClick={() => handleBackLogin(onClose)} className="button">
							Logar
						</button>
					</Modal>
				),
			});
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			} else {
				alert("Erro no cadastro, tente novamente.");
			}
		}
	}

	function handleBackLogin(cb) {
		cb();
		history.push("/");
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>
						Faça seu cadastro, entre na plataforma e ajuda pessoas a encontrarem
						os casos da sua ONG.
					</p>
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar
					</Link>
				</section>

				<Form ref={formRef} onSubmit={handleRegister}>
					<Input placeholder="Nome da ONG" name="name" type="text" />
					<Input placeholder="Email" name="email" type="email" />
					<Input placeholder="WhatsApp" name="whatsapp" type="number" />

					<div className="input-group">
						<Input placeholder="Cidade" name="city" type="text" />
						<Input
							placeholder="UF"
							name="uf"
							type="text"
							style={{ marginLeft: 8, width: 80 }}
						/>
					</div>

					<button className="button" type="submit">
						Cadastrar
					</button>
				</Form>
			</div>
		</div>
	);
}
