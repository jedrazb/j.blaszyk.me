import React from 'react';
import { useRef } from 'react';
import useIntersectionObserver from '@react-hook/intersection-observer';

import './layout/Container.css';

const LazyIframe = ({ children, height, marginBottom = '0' }) => {
  const containerRef = useRef();
  const lockRef = useRef(false);
  const { isIntersecting } = useIntersectionObserver(containerRef);
  if (isIntersecting) {
    lockRef.current = true;
  }
  return (
    <div
      className="layout-container layout-iframe-container"
      style={{
        height: `calc(${height} + ${marginBottom}`,
        marginBottom: marginBottom,
      }}
      ref={containerRef}
    >
      {lockRef.current && children}
    </div>
  );
};

export default LazyIframe;
