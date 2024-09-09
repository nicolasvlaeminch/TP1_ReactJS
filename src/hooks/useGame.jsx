import { useState } from 'react';
import { generateRandomNumber } from '../helpers/numberHelpers';

const useGame = () => {
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 20));
    console.log(targetNumber);
    const [score, setScore] = useState(100);
    const [highScore, setHighScore] = useState(0);
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
        setMessage('¡Felicidades Ganaste!');
        setHighScore(prevHighScore => Math.max(prevHighScore, score));
        resetGame();
    } else {
        const newScore = score - 10;
        if (newScore <= 0) {
            setMessage('¡Game Over! Te has quedado sin vidas.');
            setIsGameOver(true);
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
        highScore,
        message,
        isGameOver,
        handleGuess,
        resetGame,
    };
};

export default useGame;
