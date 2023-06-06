import { useState, useEffect } from "react";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";
import GameOver from "./components/GameOver";
import RestartButton from "./components/RestartButton";
import shuffleArr from "./utils/shuffleArr";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [cardClicked, setCardClicked] = useState(false);
  const [alreadyClickedCards, setAlreadyClickedCards] = useState([]);
  const [gameStart, setGameStart] = useState(true);
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

  const getTwentyRandomChars = (arr) => {
    const tenRandomChars = new Set();
    while (tenRandomChars.size < 20) {
      const randomInd = Math.floor(Math.random() * arr.length);
      tenRandomChars.add(arr[randomInd]);
    }
    setCharacters([...tenRandomChars]);
  };

  useEffect(() => {
    fetchCharacters().then((data) =>
      getTwentyRandomChars(filterOutCharsWithNoPortrait(data))
    );
  }, [gameStart]);

  useEffect(() => {
    if (alreadyClickedCards.length > 0 && alreadyClickedCards.length < 20) {
      setTimeout(() => {
        setCharacters(shuffleArr(characters));
      }, 700);
      setTimeout(() => {
        setCardClicked(false);
      }, 800);
    }
    if (currentScore === 20) {
      setCardClicked(true);
      setGameOver(true);
    }
  }, [alreadyClickedCards]);

  useEffect(() => {
    if (currentScore > bestScore) {
      localStorage.setItem("memoryCardGameBestScore", currentScore);
      setBestScore(localStorage.getItem("memoryCardGameBestScore"));
    }
    setGameStart(false);
  }, [gameOver]);

  const handleClick = (id) => {
    if (alreadyClickedCards.includes(id)) {
      setGameOver(true);
      setCardClicked(true);
    } else {
      setCardClicked(true);
      setAlreadyClickedCards((prevState) => [...prevState, id]);
      setCurrentScore((prevState) => prevState + 1);
    }
  };

  const handleRestart = () => {
    setGameStart(true);
    setGameOver(false);
    setCurrentScore(0);
    setAlreadyClickedCards([]);
    setTimeout(() => {
      setCardClicked(false);
    }, 800);
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
    <h1 className="error">{error}</h1>
  ) : (
    <>
      {gameOver ? (
        <>
          <GameOver currentScore={currentScore} />
          <RestartButton onClick={handleRestart} />
        </>
      ) : (
        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      )}
      <div className="cards-container">{characters && charElements}</div>
    </>
  );
}

export default App;
