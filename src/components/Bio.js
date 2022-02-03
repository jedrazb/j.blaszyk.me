import React from 'react';
import { rhythm } from '../utils/typography';
import { StaticImage } from 'gatsby-plugin-image';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
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
          <StaticImage
            src={`../assets/profile-pic.jpg`}
            alt={`Profile pic`}
            width={90}
            height={90}
          />
        </div>

        <p style={{ maxWidth: 380 }}>
          Personal blog by{' '}
          <a href="https://mobile.twitter.com/jedr_blaszyk">Jedr Blaszyk</a>.{' '}
          Bikepacking, triathlon & tech.
        </p>
      </div>
    );
  }
}

export default Bio;
