import React from 'react';

import './Container.css';

export const Container = ({ children }) => (
  <div className="layout-container">{children}</div>
);

export const Column = ({ children }) => (
  <div className="layout-column">{children}</div>
);

export const MakeItBigContainer = ({ children }) => (
  <div className="layout-wrapper">
    <div className="layout-inner">{children}</div>
  </div>
);
