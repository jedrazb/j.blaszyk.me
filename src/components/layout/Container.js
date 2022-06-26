import React from 'react';

import './Container.css';

export const Container = ({ children }) => (
  <div className="layout-container">{children}</div>
);

export const Column = ({ children, flex = 1 }) => (
  <div className="layout-column" style={{ flex: flex }}>
    {children}
  </div>
);

export const MakeItBigContainer = ({ children }) => (
  <div className="layout-wrapper">
    <div className="layout-inner">{children}</div>
  </div>
);
