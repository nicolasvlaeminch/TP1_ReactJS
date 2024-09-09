// src/hooks/useGame.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRandomNumber } from '../helpers/numberHelpers';

const useGame = () => {
    const navigate = useNavigate();
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 20));
    const [score, setScore] = useState(100);
    const [message, setMessage] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);

    const handleGuess = (guess) => {
        if (isGameOver) return;

        const numberGuess = parseInt(guess, 10);

        if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 20) {
            setMessage('Por favor introduzca un número entre 1 y 20.');
            return;
        }

        if (numberGuess === targetNumber) {
            // Save high score to localStorage
            const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
            savedScores.push(score);
            savedScores.sort((a, b) => b - a).slice(0, 10); // Keep top 10 scores
            localStorage.setItem('highScores', JSON.stringify(savedScores));

            navigate('/result', { state: { result: 'win' } });
        } else {
            const newScore = score - 10;
            if (newScore <= 0) {
                setIsGameOver(true);
                navigate('/result', { state: { result: 'lose' } });
            } else {
                setScore(newScore);
                setMessage(numberGuess > targetNumber ? '¡Demasiado alto!' : '¡Demasiado bajo!');
            }
        }
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber(1, 20));
        setScore(100);
        setIsGameOver(false);
        setMessage('');
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
