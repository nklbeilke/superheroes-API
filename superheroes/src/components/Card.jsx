import React from "react";

export default function Card({ image, publisher, alignment, name, race, gender, power }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p><strong>Editora:</strong> {publisher || "Desconhecida"}</p>
            <p><strong>Alinhamento:</strong> {alignment || "N/A"}</p>
            <p><strong>Raça:</strong> {race || "N/A"}</p>
            <p><strong>Gênero:</strong> {gender || "N/A"}</p>
            <p><strong>Poder:</strong> {power || "N/A"}</p>
        </div>
    );
}