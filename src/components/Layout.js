import React from 'react';
import { Link } from 'gatsby';
import Toggle from './Toggle';
import Helmet from 'react-helmet';
import Header from './NavBar';
import Footer from '../components/Footer';

import { rhythm, scale } from '../utils/typography';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import './Layout.css';
import TableOfContents from './TableOfContents';

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
    const {
      children,
      location,
      title,
      layout = 'column',
      tocComponent,
    } = this.props;

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        className={'layout'}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffffff' : '#0d1117',
            },
          ]}
        />
        <Header
          title={title}
          location={location}
          toggle={this.renderToggle()}
        />
        {/* classic layout */}
        {!tocComponent && (
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
        )}
        {/* end classic layout */}
        {/* layout with table of contents */}
        {!!tocComponent && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '250px 1fr 250px',
              // marginLeft: 'auto',
              // marginRight: 'auto',
              // // maxWidth: `calc(${rhythm(30)} + 300px)`,
              // flex: 1,
              // width: '100%',
            }}
          >
            <div
              style={{
                gridColumn: '2',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: rhythm(30),
                padding: `2.625rem ${rhythm(3 / 4)}`,
              }}
            >
              {children}
            </div>
            <></>
            <div
              style={{
                gridColumn: '3',
                display: 'block',
                position: 'sticky',
                top: '0',
                // padding: `2.625rem ${rhythm(3 / 4)}`,
                // position: 'sticky',
                // top: 0,
              }}
            >
              {tocComponent}
            </div>
          </div>
        )}
        {/* end layout with table of contents */}
        <Footer />
      </div>
    );
  }
}

export default Layout;
