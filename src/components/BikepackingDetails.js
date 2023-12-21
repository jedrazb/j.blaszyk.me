import React from 'react';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import './BikepackingDetails.css';

export const BikepackingDetails = (props) => {
  const { logo, title, elevation, distance, time, date } = props;

  return (
    <div className="bikepacking-details">
      <div className="content-container">
        <div className="bikepacking-logo">
          <GatsbyImage image={getImage(logo)} alt="Bikepacking Logo" />
        </div>
        <div className="route-details">
          <p className="title">{title}</p>
          <ul className="route-details-list">
            <li>
              Distance: <b className="data">{distance}</b>
            </li>
            <li>
              Elevation: <b className="data">{elevation}</b>
            </li>
            <li>
              Time: <b className="data">{time}</b>
            </li>
            <li>
              Date: <b className="data">{date}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
