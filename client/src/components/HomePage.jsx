import React from 'react';
import { useNavigate } from 'react-router-dom';
import donut from '../assets/donut.svg';



const HomePage = () => {
  const navigate = useNavigate(); 
  return (
    <div className="home-page">
      <header>
        <h1 className="title">Welcome to Lotería Bingo!</h1>
        <p className="subtitle-button" onClick={() => navigate('/play')}>
          Play Now
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button" onClick={() => navigate('/how-to-play')}>
          How to Play
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button" onClick={() => navigate('/settings')}>
          Settings
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
      </header>     
      <div className="bottom-container">
      </div>
    </div>
  );
}

export default HomePage;
