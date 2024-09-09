import React from 'react';
import GuessingForm from '../components/GuessingForm';
import useGame from '../hooks/useGame';
import '../styles/GamePage.css';

const GamePage = () => {
    const { score, highScore, message, isGameOver, handleGuess, resetGame } = useGame();

    const handleReset = () => {
        resetGame();
    };

    return (
        <div className="app">
            <h1>Juego de adivinar el numero</h1>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <GuessingForm onGuess={handleGuess} isGameOver={isGameOver} />
            {message && <p>{message}</p>}
            {isGameOver && (
                <button className="reset-button" onClick={handleReset}>
                    Volver a intentar
                </button>
            )}
        </div>
    );
};

export default GamePage;
