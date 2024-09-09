import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultPage.css';

const ResultPage = () => {
    const location = useLocation(); // Obtiene la ubicación actual, incluyendo el estado pasado
    const navigate = useNavigate(); // Hook para manejar la navegación

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
            {result === 'lose' && (
                <>
                    <h1>¡Excelente!</h1>
                    <h2>Tu puntuación más alta esta ronda fue de {score} puntos.</h2>
                </>
            )}
            <h2>Top 10 mejores puntuaciones:</h2>
            <ol className="high-scores-list">
                {highScores.length > 0 ? (
                    highScores.map((score, index) => (
                        <li key={index}>Top {index + 1}: {score} puntos.</li>
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
