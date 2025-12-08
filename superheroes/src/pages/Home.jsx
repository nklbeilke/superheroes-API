import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home(){
    const [characters, setCharacters] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [allHeroes, setAllHeroes] = useState([]);


    useEffect(() => {
        loadAllHeroes();
    }, []);

    async function loadAllHeroes(){
        setLoading(true);
        setErrorMsg("");

        try{
            const response = await axios.get(
                "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
            );
            
            if(response.data && response.data.length > 0){
                setAllHeroes(response.data);

                setCharacters(response.data.slice(0, 700));
            }else{
                setErrorMsg("Não foi possível carregar os heróis.");
            }
        }catch(error){
            console.error("Erro ao buscar heróis:", error);
            setErrorMsg("Erro ao buscar super-heróis! Verifique sua conexão.");
        }
        setLoading(false);
    }

    async function handleSearch(){
        if(!searchId || searchId < 1 || searchId > 731){
            setErrorMsg("Digite um ID válido (1-731)");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try{
            const response = await axios.get(
                `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${searchId}.json`
            );
            
            if(response.data){
                setCharacters([response.data]);
            }else{
                setErrorMsg("Herói não encontrado! Tente outro ID.");
                setCharacters([]);
            }
        }catch(error){
            console.error("Erro ao buscar herói:", error);
            setErrorMsg("Herói não encontrado! Tente outro ID.");
            setCharacters([]);
        }
        setLoading(false);
    }

    function handleShowAll(){
        if(allHeroes.length > 0){
            setCharacters(allHeroes.slice(0, 12));
            setSearchId("");
            setErrorMsg("");
        }
    }

    function handleRandomHero(){
        if(allHeroes.length > 0){
            const randomIndex = Math.floor(Math.random() * allHeroes.length);
            setCharacters([allHeroes[randomIndex]]);
            setSearchId("");
            setErrorMsg("");
        }
    }

    return(
        <div className="container">
            <h1>Super Heroes</h1>

            <div className="search-box">
                <input
                    type="number" 
                    placeholder="Digite um ID de herói (1-731)" 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={handleShowAll}>Mostrar Todos</button>
            </div>

            {loading && <p className="loading">Carregando...</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}

            <div className="cards-grid">
                {characters.map((char) => (
                    <Card
                        key={char.id}
                        name={char.name}
                        image={char.images?.md || char.images?.sm}
                        publisher={char.biography?.publisher}
                        alignment={char.biography?.alignment}
                        race={char.appearance?.race}
                        gender={char.appearance?.gender}
                        power={char.powerstats?.power}
                    />
                ))}
            </div>
        </div>
    );
}
