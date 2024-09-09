import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRandomNumber } from '../helpers/numberHelpers';

const INITIAL_LIVES = 5;

const useGame = () => {
    const navigate = useNavigate();
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 20));
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('Introduzca un número entre 1 y 20.');
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentHighScore, setCurrentHighScore] = useState(0);
    const [lives, setLives] = useState(INITIAL_LIVES);

    const handleGuess = (guess) => {
        if (isGameOver) return;

        const numberGuess = parseInt(guess, 10); // Convierte la suposición a un número entero

        if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 20) {
            setMessage('Introduzca un número entre 1 y 20.');
            return 'invalid';
        }

        if (numberGuess === targetNumber) {
            setLives(INITIAL_LIVES); // Reinicia el número de vidas
            const newScore = score + 1;
            setScore(newScore);

            const newHighScore = currentHighScore + 1; // Incrementa la puntuación acumulada
            setCurrentHighScore(newHighScore);

            setMessage('¡Encontraste al impostor!');
            setTargetNumber(generateRandomNumber(1, 20)); // Genera un nuevo número objetivo
            return 'correct';
        } else {
            const newLives = lives - 1;
            if (newLives <= 0) { // Si las vidas llegan a 0, el juego termina
                setIsGameOver(true);

                // Guarda la puntuación acumulada en el almacenamiento local
                const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
                savedScores.push(currentHighScore);
                const updatedScores = savedScores.sort((a, b) => b - a).slice(0, 10); // Ordena y mantiene las 10 mejores puntuaciones
                localStorage.setItem('highScores', JSON.stringify(updatedScores));

                navigate('/result', { state: { result: 'lose', score: currentHighScore } }); // Navega a la página de resultados con el estado de pérdida
                return 'incorrect';
            } else {
                setLives(newLives); // Actualiza el número de vidas
                setMessage(numberGuess > targetNumber ? '¡El impostor está más abajo!' : '¡El impostor está más arriba!'); // Mensaje de pista
                return 'incorrect';
            }
        }
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber(1, 20)); // Reinicia el número objetivo
        setScore(0); // Reinicia la puntuación a cero
        setLives(INITIAL_LIVES);
        setIsGameOver(false); // Reinicia el estado del juego
        setMessage('');
    };

    return {
        score,
        message,
        isGameOver,
        lives,
        handleGuess,
        resetGame,
    };
};

export default useGame;
