import React from 'react';
import card from '../assets/card2.png';
import { useNavigate } from 'react-router-dom';
import staricon from '../assets/StarIcon.svg';

const HowToPlayPageTwo = () => {
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
      <p className="subtitle">Round 2: Cluster</p>
      <p className="subtitle">To win round 2 you have to get four in a row</p>
      <img src={card} alt="card" className="image" />
      <p className="subtitle">
        When you have a bingo click the star icon{' '}
        <img src={staricon} alt="star icon" className="star-icon" />
      </p>
      <p className="subtitle">If you click too late you will miss the bingo</p>
      <p className="next-button" onClick={() => navigate('/how-to-play-page-three')}>
        Next
      </p>
      <p onClick={handleGoBack} className="previous-button">
        Previous
      </p>
      <div className="bottom-container">
      </div>
    </div>
  );
};

export default HowToPlayPageTwo;
