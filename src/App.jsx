import { useState, useEffect } from "react";
import Card from "./components/Card";
import shuffleArr from "./utils/shuffleArr";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [alreadyClickedCards, setAlreadyClickedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const fetchCharacters = async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
    );
    const data = await response.json();
    return data;
  };

  const filterOutCharsWithNoPortrait = (arr) => {
    const filteredArr = arr.filter(
      (item) => !item.images.md.includes("no-portrait")
    );
    return filteredArr;
  };

  const getTenRandomChar = (arr) => {
    const tenRandomChars = new Set();
    while (tenRandomChars.size < 10) {
      const randomInd = Math.floor(Math.random() * arr.length);
      tenRandomChars.add(arr[randomInd]);
    }
    setCharacters([...tenRandomChars]);
  };

  useEffect(() => {
    fetchCharacters().then((data) =>
      getTenRandomChar(filterOutCharsWithNoPortrait(data))
    );
  }, []);

  const handleClick = (id) => {
    if (alreadyClickedCards.includes(id)) setGameOver(true);
    else {
      setAlreadyClickedCards((prevState) => [...prevState, id]);
      setCharacters(shuffleArr(characters));
    }
  };

  const charElements = characters.map((char) => (
    <Card key={char.id} onClick={gameOver ? null : () => handleClick(char.id)}>
      <div className="cardName">
        <p>{char.name}</p>
      </div>
      <img className="cardImage" src={char.images.md} />
    </Card>
  ));
  return <div className="cards-container">{characters && charElements}</div>;
}

export default App;
