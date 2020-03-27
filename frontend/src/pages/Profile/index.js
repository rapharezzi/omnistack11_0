import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
    const ongId = localStorage.getItem("ongId");
    const ongName = localStorage.getItem("ongName");
    const [incident, setIncident] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get("/profile", {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            console.log(response.data);
            setIncident(response.data);
        })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`/incident/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncident(incident.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso!');
        }
    }

    function handlerLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handlerLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incident.map(incdt => (
                    <li key={incdt.id}>
                        <strong>CASO:</strong>
                        <p>{incdt.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incdt.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency', currency: 'BRL'
                        }).format(incdt.value)}</p>

                        <button type="button" onClick={() => handleDelete(incdt.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}