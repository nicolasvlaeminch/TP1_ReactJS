const AmongUsPlayer = ({ number, isDead, isWinner }) => {
  const playerClass = `among-us-player ${isDead ? 'dead' : ''} ${isWinner ? 'winner' : ''}`;

  return (
    <div className={playerClass}>
      <span>{number}</span>
    </div>
  );
};

export default AmongUsPlayer;
