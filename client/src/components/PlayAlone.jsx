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

  const [claimable, setClaimable] = useState(false);
  const [expired, setExpired] = useState(false);
  const [callsRemaining, setCallsRemaining] = useState(null);
  const [isStarShaking, setIsStarShaking] = useState(false);
 
  const syncClaimStatus = (data) => {
    if (!data) return;
    setClaimable(!!data.claimable);
    setExpired(!!data.expired);
    setCallsRemaining(data.callsRemaining ?? null);
  };

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
        setCurrentIcon(null);
        syncClaimStatus(result.data);
      }
    } catch (err) {
      setError("Failed to start game. Make sure server is running!");
      console.error(err);
    }
  };

  const callNextIcon = async () => {
    if (!gameId || gameComplete || isPaused || expired) return;

    try {
      const result = await gameAPI.callNextIcon(gameId);
      if (result.success) {
        setCurrentIcon(result.data.calledIcon);
        setCalledIcons(result.data.gameState.calledIcons);
        syncClaimStatus(result.data);
      }
    } catch (err) {
      setError("Failed to call next icon");
      console.error(err);
    }
  };

  const handleIconClick = async (iconName, index) => {
    if (!gameId || gameComplete || isPaused || expired) return;
 
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
        syncClaimStatus(result.data);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleStarClick = async () => {
    if (!gameId || gameComplete || isPaused || expired) return;
 
    try {
      const result = await gameAPI.claimBingo(gameId);
      if (result.success) {
        setBingoCard(result.data.gameState.playerCard);
        setIsPaused(result.data.isPaused);
        setGameComplete(result.data.gameComplete);
        setCurrentRound(result.data.currentRound);
        setRoundMessage(result.message);
        syncClaimStatus(result.data);
 
        if (result.data.isPaused || result.data.gameComplete) {
          setIsAutoCall(false);
        }
      }
    } catch (err) {
      setIsStarShaking(true);
      setTimeout(() => setIsStarShaking(false), 500);
      setError(err.message || "Invalid claim!");
      setTimeout(() => setError(null), 2200);
    }
  };

  const resumeToNextRound = async () => {
    try {
      const result = await gameAPI.resumeToNextRound(gameId);
      if (result.success) {
        setIsPaused(false);
        setRoundMessage("");
        setCurrentRound(result.data.currentRound);
        syncClaimStatus(result.data);
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
    if (!isAutoCall || !gameId || gameComplete || isPaused || expired) return;

    const interval = setInterval(() => {
      callNextIcon();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoCall, gameId, gameComplete, isPaused, expired]);

  useEffect(() => {
    if (expired) setIsAutoCall(false);
  }, [expired]);

  const handleGoBack = () => navigate(-1);

  const getRoundName = (round) => {
    switch(round) {
      case 1: return "Round 1: Line";
      case 2: return "Round 2: Cluster";
      case 3: return "Round 3: Blackout";
      default: return `Round ${round}`;
    }
  };

  const bannerStyle = {
    display: 'inline-block',
    marginTop: 8,
    padding: '8px 18px',
    borderRadius: 999,
    fontWeight: 700,
    background: callsRemaining === 0 ? '#fecaca' : '#fef3c7',
    color: callsRemaining === 0 ? '#991b1b' : '#92400e',
    border: callsRemaining === 0 ? '2px solid #dc2626' : '2px solid transparent',
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
 
            {claimable && callsRemaining !== null && (
              <div style={bannerStyle}>
                {callsRemaining === 0
                  ? '⚡ LAST CALL — tap the star now!'
                  : `⚡ Bingo possible — ${callsRemaining} call${callsRemaining === 1 ? '' : 's'} before it's gone`}
              </div>
            )}
          </div>
 
          <div className="game-controls">
            <button 
              className="game-button" 
              onClick={callNextIcon}
              disabled={gameComplete || isPaused || isAutoCall || expired}
            >
              Call Next Icon
            </button>
            <button 
              className="game-button" 
              onClick={toggleAutoCall}
              disabled={gameComplete || isPaused || expired}
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
                onStarClick={handleStarClick}
                isStarSpinning={claimable && !gameComplete && !isPaused && !isStarShaking}
                isStarShaking={isStarShaking}
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
 
          {expired && !gameComplete && !isPaused && (
            <div className="winner-overlay">
              <div className="winner-modal">
                <h1 className="winner-title">You missed it!</h1>
                <p className="subtitle">
                  A bingo was on your card, but you didn't claim it in time.
                </p>
                <button className="game-button" onClick={startNewGame}>
                  Try Again
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
