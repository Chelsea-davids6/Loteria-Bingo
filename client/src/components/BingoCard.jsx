import React from "react";
import "../BingoCard.css"; 
import ImageMap from "./ImageMap"; 
import staricon from '../assets/StarIcon.svg';

const BingoCard = ({
  cardImages,
  markedPositions = [],
  calledIcons = [],
  onIconClick,
  onStarClick,
  isStarSpinning = false,
  isStarShaking = false,
}) => {
  const isIconCalled = (iconName) => {
    return calledIcons.includes(iconName);
  };

  const starClasses = [
    'star-icon',
    isStarSpinning ? 'spinning' : '',
    isStarShaking ? 'shaking' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="bingo-card">
      <h1 className="bingo-title">
        BINGO <img
          src={staricon}
          alt="star icon"
          className={starClasses}
          onClick={onStarClick}
        />
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