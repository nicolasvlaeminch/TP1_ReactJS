import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRandomNumber } from '../helpers/numberHelpers';

const useGame = () => {
    const navigate = useNavigate();
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 20)); // Inicializa el número objetivo
    const [score, setScore] = useState(100); // Inicializa la puntuación
    const [message, setMessage] = useState('Introduzca un número entre 1 y 20.'); // Mensaje inicial
    const [isGameOver, setIsGameOver] = useState(false); // Controla si el juego ha terminado
    const [currentHighScore, setCurrentHighScore] = useState(0); // Guarda la puntuación más alta actual

    const handleGuess = (guess) => {
        if (isGameOver) return;

        const numberGuess = parseInt(guess, 10); // Convierte la suposición a un número entero

        if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 20) {
            setMessage('Introduzca un número entre 1 y 20.');
            return 'invalid';
        }

        if (numberGuess === targetNumber) {
            const newScore = score + 100;
            setScore(newScore);

            if (newScore > currentHighScore) { // Actualiza la puntuación más alta si es necesario
                setCurrentHighScore(newScore);
            }

            setMessage('¡Encontraste al impostor!');
            setTargetNumber(generateRandomNumber(1, 20)); // Genera un nuevo número objetivo
            return 'correct';
        } else {
            const newScore = score - 10;
            if (newScore <= 0) { // Si la puntuación llega a 0 o menos, el juego termina
                setIsGameOver(true);

                if (currentHighScore > 0) { // Guarda la puntuación más alta en el almacenamiento local
                    const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
                    savedScores.push(currentHighScore);
                    savedScores.sort((a, b) => b - a).slice(0, 10); // Ordena y mantiene las 10 mejores puntuaciones
                    localStorage.setItem('highScores', JSON.stringify(savedScores));
                }

                navigate('/result', { state: { result: 'lose', score: currentHighScore } }); // Navega a la página de resultados con el estado de pérdida
                return 'incorrect';
            } else {
                setScore(newScore); // Actualiza la puntuación
                setMessage(numberGuess > targetNumber ? '¡El impostor está más abajo!' : '¡El impostor está más arriba!'); // Mensaje de pista
                return 'incorrect';
            }
        }
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber(1, 20)); // Reinicia el número objetivo
        setScore(100); // Reinicia la puntuación
        setCurrentHighScore(0); // Reinicia la puntuación más alta
        setIsGameOver(false); // Reinicia el estado del juego
        setMessage(''); // Limpia el mensaje
    };

    return {
        score,
        message,
        isGameOver,
        handleGuess,
        resetGame,
    };
};

export default useGame;
