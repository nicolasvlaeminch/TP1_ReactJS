import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRandomNumber } from '../helpers/numberHelpers';

const useGame = () => {
    const navigate = useNavigate();
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 20));
    const [score, setScore] = useState(100);
    const [message, setMessage] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0); // Highest score during the round
    const [hasNewHighScore, setHasNewHighScore] = useState(false); // Flag to check new high score

    const handleGuess = (guess) => {
        if (isGameOver) return;

        const numberGuess = parseInt(guess, 10);

        if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 20) {
            setMessage('Por favor introduzca un número entre 1 y 20.');
            return;
        }

        if (numberGuess === targetNumber) {
            const finalScore = score + 100; // Add 100 points to the score
            setScore(finalScore);

            // Check if the new score is higher than the current high score
            if (finalScore > highScore) {
                setHighScore(finalScore);
                setHasNewHighScore(true);
            }
            
            setMessage('¡Adivinaste el número!');
            
            // Generate a new target number
            setTargetNumber(generateRandomNumber(1, 20));
        } else {
            const newScore = score - 10;
            if (newScore <= 0) {
                setIsGameOver(true);
                
                // Save high score to localStorage if a new high score was set
                if (hasNewHighScore) {
                    const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
                    savedScores.push(highScore);
                    savedScores.sort((a, b) => b - a).slice(0, 10); // Keep top 10 scores
                    localStorage.setItem('highScores', JSON.stringify(savedScores));
                    
                    // Reset the flag
                    setHasNewHighScore(false);
                }
                
                navigate('/result', { state: { result: 'lose', score: highScore } }); // Pass highScore
            } else {
                setScore(newScore);
                setMessage(numberGuess > targetNumber ? '¡Demasiado alto!' : '¡Demasiado bajo!');
            }
        }
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber(1, 20));
        setScore(100);
        setHighScore(0); // Reset high score
        setIsGameOver(false);
        setMessage('');
        setHasNewHighScore(false); // Reset the flag
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
