import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
    );
    const data = await response.json();
    return data;
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
    fetchCharacters().then((data) => getTenRandomChar(data));
  }, []);

  const charElements = characters.map((char) => (
    <Card key={char.id}>
      <img src={char.images.md} />
    </Card>
  ));
  return <>{characters && charElements}</>;
}

export default App;
