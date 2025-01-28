import React from 'react';
import donut from '../assets/donut.svg';
import { useNavigate } from 'react-router-dom';

const PlayPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    <div>
      <h1 className="title">Play Lotería Bingo</h1>
      <p onClick={handleGoBack} className="back-button">
        Back
      </p>
      <div className="hover-container">
        <p className="subtitle-button">
          Play with friends
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button">
          Play with strangers
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button">
          Play with bots
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
      </div>
      <div className="bottom-container"></div>
    </div>
  );
};

export default PlayPage;

