import React from 'react';
import { rhythm } from '../utils/typography';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = ({ isBike }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(1),
      }}
    >
      <div
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          minWidth: rhythm(2),
          height: rhythm(2),
          borderRadius: '50%',
          overflow: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {isBike ? (
          <StaticImage
            src={`../assets/profile-pic-bike.jpg`}
            alt={`Profile pic`}
            width={90}
            height={90}
          />
        ) : (
          <StaticImage
            src={`../assets/profile-pic.jpg`}
            alt={`Profile pic`}
            width={90}
            height={90}
          />
        )}
      </div>

      <p style={{ maxWidth: 380 }}>
        Blog by{' '}
        <a href="https://mobile.twitter.com/jedr_blaszyk">Jedr Blaszyk</a>.{' '}
        Tech, cycling, photography & travelling.
      </p>
    </div>
  );
};

export default Bio;
