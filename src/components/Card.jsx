const Card = ({ children, onClick, cardClicked }) => (
  <div className={cardClicked ? "card active" : "card"} onClick={onClick}>
    <div className="card-inner">
      <div className="card-front">{children}</div>
      <div className="card-back">
        <p>memory card game</p>
      </div>
    </div>
  </div>
);

export default Card;
