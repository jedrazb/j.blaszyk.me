import React from 'react';

import './Container.css';

export const Container = ({ children }) => (
  <div className="layout-container">{children}</div>
);

export const Column = ({ children }) => (
  <div className="layout-column">{children}</div>
);
