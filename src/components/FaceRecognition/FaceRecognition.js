import React, { useRef, useState } from 'react';
import { uniqueId } from 'lodash'
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxRegions }) => {
  const imageEl = useRef(null);
  const [dots, setDots] = useState([]);

  const calculateDotsLocations = () => {
    const width = imageEl.current?.width;
    const height = imageEl.current?.height;
    const dotsLocations = boxRegions.map((region) => {
      const box = {};
      box.bottom_row =
        height - region.region_info.bounding_box.bottom_row * height;
      box.left_col = region.region_info.bounding_box.left_col * width;
      box.right_col = width - region.region_info.bounding_box.right_col * width;
      box.top_row = region.region_info.bounding_box.top_row * height;
      return box;
    });
    if (JSON.stringify(dotsLocations) !== JSON.stringify(dots)) {
      setDots(dotsLocations);
    }
  };

  if (imageUrl !== '' && boxRegions) {
    calculateDotsLocations();
  }
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageUrl !== '' ? (
          <img
            ref={imageEl}
            width="500px"
            height="auto"
            src={imageUrl}
            alt="face"
            draggable={false}
          />
        ) : (
          <h3>Enter an Image URL</h3>
        )}
        {dots.map((dot) => {
          return (
            <div
            key={uniqueId(dot.top_row)}
              className="bounding-box"
              style={{
                top: dot.top_row,
                bottom: dot.bottom_row,
                right: dot.right_col,
                left: dot.left_col,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
