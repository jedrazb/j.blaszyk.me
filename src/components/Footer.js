import React from 'react';
import { Link } from 'gatsby';

import { Twitter, GitHub, Linkedin, Instagram, Rss } from 'react-feather';
import Strava from '../assets/strava.inline.svg';
import Sitemap from '../assets/sitemap.inline.svg';

import { rhythm } from '../utils/typography';

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          padding: `2rem ${rhythm(3 / 4)}`,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(30),
        }}
      >
        <div style={{ float: 'right' }}>
          <Link to="/sitemap-index.xml" className="footer-icon icon-has-next">
            <Sitemap />
          </Link>
          <Link
            href="/tech-blog/rss.xml"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <Rss />
          </Link>
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
          href="https://www.linkedin.com/in/jedrzej-blaszyk/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon icon-has-next"
        >
          <Linkedin />
        </a>
      </footer>
    );
  }
}

export default Footer;
