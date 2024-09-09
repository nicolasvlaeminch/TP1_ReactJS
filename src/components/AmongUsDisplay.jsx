import AmongUsPlayer from "./AmongUsPlayer";
import "../styles/AmoungUsDisplay.css";

const AmongUsDisplay = ({ players }) => {
  return (
    <div className="among-us-display">
      {players.map((player) => (
        <AmongUsPlayer
          key={player.number}
          number={player.number}
          isDead={player.isDead}
          isWinner={player.isWinner}
        />
      ))}
    </div>
  );
};

export default AmongUsDisplay;
