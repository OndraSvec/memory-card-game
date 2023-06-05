import { useState, useEffect } from "react";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";
import shuffleArr from "./utils/shuffleArr";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [cardClicked, setCardClicked] = useState(false);
  const [alreadyClickedCards, setAlreadyClickedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("memoryCardGameBestScore") || 0
  );

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      setError("There was an error loading the data, try again later.");
    }
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

  useEffect(() => {
    if (alreadyClickedCards.length > 0) {
      setTimeout(() => {
        setCharacters(shuffleArr(characters));
      }, 700);
      setTimeout(() => {
        setCardClicked(false);
      }, 800);
    }
  }, [alreadyClickedCards]);

  useEffect(() => {
    if (currentScore > bestScore) {
      localStorage.setItem("memoryCardGameBestScore", currentScore);
      setBestScore(localStorage.getItem("memoryCardGameBestScore"));
    }
  }, [gameOver]);

  const handleClick = (id) => {
    if (alreadyClickedCards.includes(id)) setGameOver(true);
    else {
      setCardClicked(true);
      setAlreadyClickedCards((prevState) => [...prevState, id]);
      setCurrentScore((prevState) => prevState + 1);
    }
  };

  const charElements = characters.map((char) => (
    <Card
      key={char.id}
      cardClicked={cardClicked}
      onClick={gameOver ? null : () => handleClick(char.id)}
    >
      <div className="cardName">
        <p>{char.name}</p>
      </div>
      <img className="cardImage" src={char.images.md} />
    </Card>
  ));
  return error ? (
    <h1>{error}</h1>
  ) : (
    <>
      <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      <div className="cards-container">{characters && charElements}</div>
    </>
  );
}

export default App;
