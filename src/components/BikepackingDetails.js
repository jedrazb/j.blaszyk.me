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
              <span className="metric">Distance:</span>{' '}
              <b className="data">{distance}</b>
            </li>
            <li>
              <span className="metric">Elevation:</span>{' '}
              <b className="data">{elevation}</b>
            </li>
            <li>
              <span className="metric">Time:</span>{' '}
              <b className="data">{time}</b>
            </li>
            <li>
              <span className="metric">Date:</span>{' '}
              <b className="data">{date}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
