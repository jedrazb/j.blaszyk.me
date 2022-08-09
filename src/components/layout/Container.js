import React from 'react';

import './Container.css';

export const Container = ({ children }) => (
  <div className="layout-container">{children}</div>
);

export const ColumnContainer = ({ children }) => (
  <div className="layout-container layout-column-container">{children}</div>
);

export const IFrameContainer = ({ children }) => (
  <div className="layout-container layout-iframe-container">{children}</div>
);

export const Column = ({ children, hasMarginRight = false, flex = 1 }) => (
  <div
    className="layout-column"
    style={{
      flex: flex,
      marginRight: hasMarginRight ? '0.8rem' : 0,
    }}
  >
    {children}
  </div>
);

export const MakeItBigContainer = ({ children }) => (
  <div className="layout-wrapper">
    <div className="layout-inner">{children}</div>
  </div>
);

export const ThreePhotosContainer = ({ children }) => (
  <Container>
    <div className="grid-wrapper">
      <div className="grid-image-one">{children[0]}</div>
      <div className="grid-image-two">{children[1]}</div>
      <div className="grid-image-three">{children[2]}</div>
    </div>
  </Container>
);
