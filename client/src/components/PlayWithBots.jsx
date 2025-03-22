import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayWithBots = () => {
    const navigate = useNavigate(); 
    const [bots, setBots] = useState(0); 
    const handleGoBack = () => {
        navigate(-1); 
    };

    const increaseBots = () => {
        setBots(bots + 1);
    };
    
    const decreaseBots = () => {
        if (bots > 0) {
          setBots(bots - 1); 
        }
    };   
  return (
    <div>
    <p onClick={handleGoBack} className="back-button">
        Back
      </p>
      <header>
        <h1 className="title">Customize bot match</h1>
        <div >
          <p className="subtitle">Bots in game</p>
          <p className="subtitle-button" onClick={decreaseBots}>-</p>
          <p className="subtitle">{bots}</p>
          <p className="subtitle-button" onClick={increaseBots}>+</p>
        </div>
      </header>  
      <body>
        <p className="next-button">Start</p>
      </body>   
      <div className="bottom-container">
      </div>
    </div>
  );
}

export default PlayWithBots;
