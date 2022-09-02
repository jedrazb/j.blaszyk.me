import React from 'react';

import { Twitter, GitHub, Linkedin, Rss } from 'react-feather';
import Strava from '../assets/strava.inline.svg';

import { rhythm } from '../utils/typography';

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <Rss />
          </a>
        </div>
        <a
          href="https://mobile.twitter.com/jedr_blaszyk"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon icon-has-next"
        >
          <Twitter />
        </a>
        <a
          href="https://github.com/jedrazb"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon icon-has-next"
        >
          <GitHub />
        </a>
        <a
          href="https://www.strava.com/athletes/jedr_blaszyk"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon icon-has-next"
        >
          <Strava />
        </a>
        <a
          href="https://www.linkedin.com/in/jedrzej-blaszyk/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <Linkedin />
        </a>
      </footer>
    );
  }
}

export default Footer;
