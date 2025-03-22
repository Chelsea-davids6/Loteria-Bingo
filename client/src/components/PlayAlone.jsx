import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BingoCard from "./BingoCard";

const PlayAlone = () => {
  const navigate = useNavigate();
  const [bingoCard, setBingoCard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/call-next")
    .then((res) => res.json())
    .then((data) => {
      setBingoCard(shuffleArray([...data.nextItems]));
    })
    .catch((error) => console.error("Error fetching bingo card:", error));  
  }, []);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleGoBack = () => navigate(-1);

  return (
    <div>
      <p onClick={handleGoBack} className="back-button">Back</p>
      <div className="container">
        {bingoCard.length > 0 && <BingoCard cardImages={bingoCard} />}
      </div>
    </div>
  );
};

export default PlayAlone;
