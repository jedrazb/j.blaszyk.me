import React from 'react';
import { Link } from 'gatsby';
import Toggle from './Toggle';
import Helmet from 'react-helmet';
import Header from './NavBar';
import Footer from '../components/Footer';

import { rhythm, scale } from '../utils/typography';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

class Layout extends React.Component {
  state = {
    theme: null,
  };
  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  renderToggle() {
    return this.state.theme !== null ? (
      <Toggle
        icons={{
          checked: (
            <img
              src={moon}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
            />
          ),
          unchecked: (
            <img
              src={sun}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
            />
          ),
        }}
        checked={this.state.theme === 'dark'}
        onChange={(e) =>
          window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')
        }
      />
    ) : (
      <div style={{ height: '24px' }} />
    );
  }
  render() {
    const { children, location, title } = this.props;

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '70px',
        }}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffffff' : '#202020',
            },
          ]}
        />
        <Header
          title={title}
          location={location}
          toggle={this.renderToggle()}
        />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(30),
            padding: `2.625rem ${rhythm(3 / 4)}`,
            flex: 1,
            width: '100%',
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
