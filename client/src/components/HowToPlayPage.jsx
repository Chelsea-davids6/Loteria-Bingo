import React from 'react';
import card from '../assets/card.png';
import { useNavigate } from 'react-router-dom';
import staricon from '../assets/StarIcon.svg';

const HowToPlayPage = () => {
  const navigate = useNavigate(); 
  return (
    <div>
    <p onClick={() => navigate('/')} className="back-button">
        Home
      </p>
      <h1 className="title">How to play Loteria Bingo</h1>
      <p className="subtitle">Round 1: Line</p>
      <p className="subtitle">To win round 1 you have to get four in a row</p>
      <img src={card} alt="card" className="image" />
      <p className="subtitle">
        When you have a bingo click the star icon{' '}
        <img src={staricon} alt="star icon" className="star-icon" />
      </p>
      <p className="subtitle">If you click too late you will miss the bingo</p>

      <p className="next-button" onClick={() => navigate('/how-to-play-page-two')}>
        Next
      </p>
      
      <div className="bottom-container">
      </div>
    </div>
  );
};

export default HowToPlayPage;
