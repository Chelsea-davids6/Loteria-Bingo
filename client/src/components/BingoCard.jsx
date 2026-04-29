import React from "react";
import "../BingoCard.css"; 
import ImageMap from "./ImageMap"; 
import staricon from '../assets/StarIcon.svg';

const BingoCard = ({ cardImages, markedPositions = [], calledIcons = [], onIconClick }) => {
  const isIconCalled = (iconName) => {
    return calledIcons.includes(iconName);
  };

  return (
    <div className="bingo-card">
      <h1 className="bingo-title">
        BINGO <img src={staricon} alt="star icon" className="star-icon" />
      </h1>
      <div className="bingo-grid">
        {cardImages.map((imageName, index) => (
          <div 
            key={index} 
            className={`bingo-cell ${markedPositions[index] ? 'marked' : ''} ${
              isIconCalled(imageName) && !markedPositions[index] ? 'callable' : ''
            }`}
            onClick={() => onIconClick && onIconClick(imageName, index)}
          >
            <img 
              src={ImageMap[imageName]} 
              alt={imageName}
            />
            {markedPositions[index] && (
              <div className="mark-overlay">✓</div>
            )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;
