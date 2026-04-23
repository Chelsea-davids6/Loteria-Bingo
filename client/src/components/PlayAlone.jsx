import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BingoCard from "./BingoCard";
import { gameAPI } from "../api/gameService";

const PlayAlone = () => {
  const navigate = useNavigate();
  const [bingoCard, setBingoCard] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [calledIcons, setCalledIcons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/game/start", {
      method: "POST"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Got data:", data); 
      setBingoCard(data.playerCard);
    })
    .catch((error) => console.error("Error fetching bingo card:", error));  
  }, []);

  const handleGoBack = () => navigate(-1);

  return (
    <div>
      <p onClick={handleGoBack} className="back-button">Back</p>
      <div className="container">
        {bingoCard ? (
          <BingoCard cardImages={bingoCard.icons} />
        ) : (
          <p>Loading</p>
        )} 
      </div>
    </div>
  );
};

export default PlayAlone;
