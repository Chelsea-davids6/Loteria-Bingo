import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BingoCard from "./BingoCard";
import { gameAPI } from "../api/gameService";
import "../PlayAlone.css";

const PlayAlone = () => {
  const navigate = useNavigate();
  const [bingoCard, setBingoCard] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [calledIcons, setCalledIcons] = useState([]);
  const [currentIcon, setCurrentIcon] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [roundMessage, setRoundMessage] = useState("");
  const [isAutoCall, setIsAutoCall] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    try {
      const result = await gameAPI.startGame();
      if (result.success) {
        setGameId(result.data.gameId);
        setBingoCard(result.data.playerCard);
        setCalledIcons(result.data.calledIcons);
        setCurrentRound(result.data.currentRound);
        setIsPaused(false);
        setGameComplete(false);
        setRoundMessage("");
        setError(null);
      }
    } catch (err) {
      setError("Failed to start game. Make sure server is running!");
      console.error(err);
    }
  };

  const callNextIcon = async () => {
    if (!gameId || gameComplete || isPaused) return;

    try {
      const result = await gameAPI.callNextIcon(gameId);
      if (result.success) {
        setCurrentIcon(result.data.calledIcon);
        setCalledIcons(result.data.gameState.calledIcons);
      }
    } catch (err) {
      setError("Failed to call next icon");
      console.error(err);
    }
  };

  const handleIconClick = async (iconName, index) => {
    if (!gameId || gameComplete || isPaused) return;

    if (bingoCard.marked[index]) return;

    if (!calledIcons.includes(iconName)) {
      setError("This icon hasn't been called yet!");
      setTimeout(() => setError(null), 2000);
      return;
    }

    try {
      const result = await gameAPI.markIcon(gameId, iconName);
      if (result.success) {
        setBingoCard(result.data.gameState.playerCard);
        
        if (result.data.roundWon) {
          setIsPaused(result.data.isPaused);
          setGameComplete(result.data.gameComplete);
          setCurrentRound(result.data.currentRound);
          setRoundMessage(result.message);
          
          if (result.data.isPaused || result.data.gameComplete) {
            setIsAutoCall(false);
          }
        }
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    }
  };

  const resumeToNextRound = async () => {
    try {
      const result = await gameAPI.resumeToNextRound(gameId);
      if (result.success) {
        setIsPaused(false);
        setRoundMessage("");
        setCurrentRound(result.data.currentRound);
      }
    } catch (err) {
      setError("Failed to resume game");
      console.error(err);
    }
  };

  const toggleAutoCall = () => {
    setIsAutoCall(!isAutoCall);
  };

  useEffect(() => {
    if (!isAutoCall || !gameId || gameComplete || isPaused) return;

    const interval = setInterval(() => {
      callNextIcon();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoCall, gameId, gameComplete, isPaused]);

  const handleGoBack = () => navigate(-1);

  const getRoundName = (round) => {
    switch(round) {
      case 1: return "Round 1: Line";
      case 2: return "Round 2: Cluster";
      case 3: return "Round 3: Blackout";
      default: return `Round ${round}`;
    }
  };

  return (
    <div className="play-alone-page">
      <p onClick={handleGoBack} className="back-button">Back</p>
      {error && <div className="error-message">{error}</div>}
      
      {!bingoCard ? (
        <div className="loading">Loading game...</div>
      ) : (
        <>
          <div className="game-info">
            <h2 className="subtitle">{getRoundName(currentRound)}</h2>
            {currentIcon && (
              <div className="current-icon-display">
                <p className="subtitle">Current Icon:</p>
                <div className="icon-badge">{currentIcon.replace(/_/g, ' ').toUpperCase()}</div>
              </div>
            )}
            <p className="subtitle">Icons Called: {calledIcons.length}</p>
          </div>

          <div className="game-controls">
            <button 
              className="game-button" 
              onClick={callNextIcon}
              disabled={gameComplete || isPaused || isAutoCall}
            >
              Call Next Icon
            </button>
            <button 
              className="game-button" 
              onClick={toggleAutoCall}
              disabled={gameComplete || isPaused}
            >
              {isAutoCall ? 'Stop Auto-Call' : 'Start Auto-Call'}
            </button>
            <button 
              className="game-button" 
              onClick={startNewGame}
            >
              New Game
            </button>
          </div>

          <div className="container">
            {bingoCard && (
              <BingoCard 
                cardImages={bingoCard.icons} 
                markedPositions={bingoCard.marked}
                calledIcons={calledIcons}
                onIconClick={handleIconClick}
              />
            )}
          </div>

          {isPaused && !gameComplete && (
            <div className="winner-overlay">
              <div className="winner-modal">
                <h1 className="winner-title">{roundMessage}</h1>
                <button className="game-button" onClick={resumeToNextRound}>
                  Continue to Next Round
                </button>
              </div>
            </div>
          )}

          {gameComplete && (
            <div className="winner-overlay">
              <div className="winner-modal">
                <h1 className="winner-title">BLACKOUT!</h1>
                <p className="subtitle">You completed all 3 rounds!</p>
                <button className="game-button" onClick={startNewGame}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayAlone;
