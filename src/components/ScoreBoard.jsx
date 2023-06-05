const ScoreBoard = ({ currentScore, bestScore }) => (
  <div className="scoreBoard">
    <p>Current Score: {currentScore}</p>
    <p>Best Score: {bestScore}</p>
  </div>
);

export default ScoreBoard;
