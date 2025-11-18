import React, { useState } from 'react';
import { Link } from 'gatsby';

import './NavBar.css';

import { scale } from '../utils/typography';

function NavBar({ title, location, toggle }) {
  const [opened, setOpened] = useState(false);

  const closeMenu = () => {
    const scrollY = document.body.style.top;

    //menu close
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setOpened(false);
  };

  const openMenu = () => {
    //menu open
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.display = 'block';
    document.body.style.width = '100%';
    setOpened(true);
  };

  const handleMenuClick = () => {
    if (opened) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <header>
      <div className="navbar">
        <div className="nav-container">
          <span
            style={{
              ...scale(0.5),
              marginBottom: 0,
              marginTop: 0,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--textTitle)',
                fontSize: '1.1rem',
              }}
              onClick={closeMenu}
              to={'/'}
              className="no-select"
            >
              {title}
            </Link>
          </span>
          <nav
            role="navigation"
            itemScope=""
            itemType="http://schema.org/SiteNavigationElement"
          >
            <ul className={opened ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={closeMenu}
                  itemProp="url"
                >
                  <span itemProp="name">About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/tech-blog/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={closeMenu}
                  partiallyActive={true}
                  itemProp="url"
                >
                  <span itemProp="name">Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
          {toggle}
          <div
            className={`menu-btn-1 no-select menu-btn-1-controller ${
              opened && 'active'
            }`}
            onClick={handleMenuClick}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
