const Card = ({ children, onClick, cardClicked }) => {
  const handleMouseMove = (e) => {
    const { target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    target.style.setProperty("--card-rotate-x", `${x / 15}deg`);
    target.style.setProperty("--card-rotate-y", `${y / 15}deg`);
  };
  const handleMouseLeave = (e) => {
    const { target } = e;
    target.style.setProperty("--card-rotate-x", "0deg");
    target.style.setProperty("--card-rotate-y", "0deg");
  };

  return (
    <div
      className={cardClicked ? "card active" : "card"}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-inner">
        <div className="card-front">{children}</div>
        <div className="card-back">
          <p>memory card game</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
