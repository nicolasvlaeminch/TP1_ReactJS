import React, { useState } from 'react';

const GuessingForm = ({ onGuess, isGameOver }) => {
    const [guess, setGuess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onGuess(guess);
        setGuess('');
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="Numero"
            min="1"
            max="20"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Ingresa un numero"
            required
            disabled={isGameOver}
        />
        <button type="submit" disabled={isGameOver}>Adivinar</button>
        </form>
    );
};

export default GuessingForm;
