const Card = ({ children, onClick }) => (
  <div className="card" onClick={onClick}>
    {children}
  </div>
);

export default Card;
