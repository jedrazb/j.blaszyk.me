import React from 'react';
import { rhythm } from '../utils/typography';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = ({ isBike, size = 'm', style }) => {
  const imageSizePx = (() => {
    switch (size) {
      case 'm':
        return 150;
      case 'l':
        return 300;
      default:
        return 150;
    }
  })();
  const imageSize = (() => {
    switch (size) {
      case 'm':
        return 2;
      case 'l':
        return 3;
      default:
        return 2;
    }
  })();
  return (
    <div
      style={{
        ...{
          display: 'flex',
          marginBottom: rhythm(1),
        },
        ...style,
      }}
    >
      <div
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(imageSize),
          minWidth: rhythm(imageSize),
          height: rhythm(imageSize),
          borderRadius: '50%',
          overflow: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {isBike ? (
          <StaticImage
            src={`../assets/profile-pic-bike.jpg`}
            alt={`Profile pic`}
            width={imageSizePx}
            height={imageSizePx}
          />
        ) : (
          <StaticImage
            src={`../assets/profile-pic.jpg`}
            alt={`Profile pic`}
            width={imageSizePx}
            height={imageSizePx}
          />
        )}
      </div>

      <p style={{ maxWidth: 380, margin: 0 }}>
        Blog by{' '}
        <a href="https://mobile.twitter.com/jedr_blaszyk">Jedr Blaszyk</a>.{' '}
        Tech, cycling, photography & travelling.
      </p>
    </div>
  );
};

export default Bio;
