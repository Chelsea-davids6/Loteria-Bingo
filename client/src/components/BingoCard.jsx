import React from "react";
import "../BingoCard.css"; 
import ImageMap from "./ImageMap"; 
import staricon from '../assets/StarIcon.svg';

const BingoCard = ({ cardImages }) => {
  return (
    <div className="bingo-card">
      <h1 className="bingo-title">
        BINGO <img src={staricon} alt="star icon" className="star-icon" />
      </h1>
      <div className="bingo-grid">
        {cardImages.map((imageName, index) => (
          <div key={index} className="bingo-cell">
          {console.log("Image name:", imageName, "Path:", ImageMap[imageName])}
          <img src={ImageMap[imageName]} alt={imageName} />
        </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;
