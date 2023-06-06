const GameOver = ({ currentScore }) => (
  <p className="gameOver">
    gameover!!! {`${currentScore === 20 ? "you win." : "you lose."}`}
  </p>
);

export default GameOver;
