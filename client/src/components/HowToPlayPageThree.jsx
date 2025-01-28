import React from 'react';
import card from '../assets/card3.png';
import { useNavigate } from 'react-router-dom';
import staricon from '../assets/StarIcon.svg';
const HowToPlayPageThree = () => {
  const navigate = useNavigate(); 
  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    <div>
    <p onClick={() => navigate('/')} className="back-button">
        Home
      </p>
      <h1 className="title">How to play Loteria Bingo</h1>
      <p className="subtitle">Round 3: Fullhouse</p>
      <p className="subtitle">To win round 3 you have to get a fullhouse</p>
      <img src={card} alt="card" className="image" />
      <p className="subtitle">
        When you have a bingo click the star icon{' '}
        <img src={staricon} alt="star icon" className="star-icon" />
      </p>
      <p className="subtitle">If you click too late you will miss the bingo</p>
      <p onClick={handleGoBack} className="previous-button">
        Previous
      </p>
      <div className="bottom-container">
      </div>
    </div>
  );
};

export default HowToPlayPageThree;