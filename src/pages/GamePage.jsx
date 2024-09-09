import React, { useState } from 'react';
import GuessingForm from '../components/GuessingForm';
import useGame from '../hooks/useGame';
import '../styles/GamePage.css';
import AmongUsDisplay from '../components/AmongUsDisplay';
import amongUsBg from '../assets/background/among-us-bg.jpg';

const GamePage = () => {
    const { score, message, isGameOver, handleGuess, resetGame } = useGame();

    // Estado inicial para los jugadores
    const [players, setPlayers] = useState(
        Array.from({ length: 20 }, (_, index) => ({
            number: index + 1,
            isDead: false,
            isWinner: false,
        }))
    );

    // Maneja la suposición y actualiza el estado de los jugadores
    const handleGuessAndUpdate = (guess) => {
        const result = handleGuess(guess);

        if (result === 'correct') {
            // Marca al jugador adivinado como ganador y restablece el estado después de un breve retraso
            setPlayers(players.map(player =>
                player.number === parseInt(guess, 10)
                    ? { ...player, isWinner: true }
                    : { ...player, isDead: false }
            ));

            setTimeout(() => {
                setPlayers(players.map(player => ({
                    ...player,
                    isDead: false,
                    isWinner: false
                })));
            }, 1000);

        } else {
            // Marca al jugador adivinado como muerto si la suposición es incorrecta
            setPlayers(players.map(player =>
                player.number === parseInt(guess, 10)
                    ? { ...player, isDead: true }
                    : player
            ));
        }
    };

    // Reinicia el juego y el estado de los jugadores
    const handleReset = () => {
        resetGame();
        setPlayers(
            Array.from({ length: 20 }, (_, index) => ({
                number: index + 1,
                isDead: false,
                isWinner: false,
            }))
        );
    };

    return (
        <div className="app">
            <h1>Encuentra al impostor</h1>
            <p>Tu puntuación actual: {score} puntos.</p>
            <AmongUsDisplay players={players} />
            <GuessingForm onGuess={handleGuessAndUpdate} isGameOver={isGameOver} />
            {message && <p>{message}</p>}
            <img src={amongUsBg} alt="Decorative" className="corner-image" />
        </div>
    );
};

export default GamePage;
