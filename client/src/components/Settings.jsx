import React from 'react';
import { useNavigate } from 'react-router-dom';
import donut from '../assets/donut.svg';

const Settings = () => {
  const navigate = useNavigate(); 
  
    const handleGoBack = () => {
      navigate(-1); 
    };
  return (
    <div className="home-page">
    <p onClick={handleGoBack} className="back-button">
        Back
      </p>
      <header>
        <h1 className="title">Lotería Bingo Settings</h1>
        <p className="subtitle-button" onClick={() => navigate('/play')}>
            Sound
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button" onClick={() => navigate('/how-to-play')}>
          Cards
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
        <p className="subtitle-button" onClick={() => navigate('/settings')}>
          Display
          <span className="hover-icon"><img src={donut} alt="donut" /></span>
        </p>
      </header>     
      <div className="bottom-container">
      </div>
    </div>
  );
}

export default Settings;