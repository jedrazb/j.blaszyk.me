import React from 'react';

import './Container.css';

export const Container = ({ children }) => {
  const isChildColumn = child => child.props.mdxType == 'Column';
  const someAreColumns =
    Array.isArray(children) && children.some(isChildColumn);

  // Fix weird behaviour with columns when taking extra margin into account
  const extraWidth = someAreColumns ? '0.4rem' : '0.7rem';
  return (
    <div
      className="layout-container"
      style={{ maxWidth: `calc(1024px + ${extraWidth})` }}
    >
      {children}
    </div>
  );
};

export const IFrameContainer = ({ children }) => (
  <div className="layout-container layout-iframe-container">{children}</div>
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

export const ThreePhotosContainer = ({ children }) => (
  <Container>
    <div className="grid-wrapper">
      <div className="grid-image-one">{children[0]}</div>
      <div className="grid-image-two">{children[1]}</div>
      <div className="grid-image-three">{children[2]}</div>
    </div>
  </Container>
);
