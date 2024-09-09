import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extrae el resultado y la puntuación del estado de la ubicación, con valores predeterminados
    const { result, score } = location.state || { result: 'lose', score: 0 };
    const [highScores, setHighScores] = useState([]); // Estado para las puntuaciones más altas

    useEffect(() => {
        // Obtiene las puntuaciones más altas desde el almacenamiento local y las establece en el estado
        const scores = JSON.parse(localStorage.getItem('highScores')) || [];
        setHighScores(scores.slice(0, 10)); // Limita a las 10 mejores puntuaciones
    }, []);

    // Navega a la página de inicio para reiniciar el juego
    const handleRestart = () => {
        navigate('/');
    };

    return (
        <div className="result-container">
            <h1>¡Bien jugado!</h1>
            <h2>Total de impostores encontrados: {score}</h2>
            <h2>Top 10 mejores detectives:</h2>
            <ol className="high-scores-list">
                {highScores.length > 0 ? (
                    highScores.map((score, index) => (
                        <li key={index}>Top {index + 1}: Impostores encontrados: {score}.</li>
                    ))
                ) : (
                    <li>No hay puntuaciones registradas.</li>
                )}
            </ol>
            <button onClick={handleRestart}>Volver a jugar</button>
        </div>
    );
};

export default ResultPage;
