const RestartButton = ({ onClick }) => (
  <div className="restartButtonDiv">
    <button className="restartButton" onClick={onClick}>
      restart game
    </button>
  </div>
);

export default RestartButton;
