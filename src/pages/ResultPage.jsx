// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { result } = location.state || { result: 'lose' };
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const scores = JSON.parse(localStorage.getItem('highScores')) || [];
        setHighScores(scores);
    }, []);

    const handleRestart = () => {
        navigate('/');
    };

    return (
        <div className="result-container">
            <h1>{result === 'win' ? '¡Ganaste!' : '¡Perdiste!'}</h1>

            <h2>Ranking de Puntuaciones</h2>
            <ol className="high-scores-list">
                {highScores.length > 0 ? (
                    highScores.map((score, index) => (
                        <li key={index}>Puntuación: {score}</li>
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
