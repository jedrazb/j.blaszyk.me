import React from 'react';
import { useRef } from 'react';
import useIntersectionObserver from '@react-hook/intersection-observer';

const LazyIframe = ({ children, height, marginBottom = '0' }) => {
  const containerRef = useRef();
  const lockRef = useRef(false);
  const { isIntersecting } = useIntersectionObserver(containerRef);
  if (isIntersecting) {
    lockRef.current = true;
  }
  return (
    <div
      style={{
        overflow: 'hidden',
        height: `calc(${height} + ${marginBottom}`,
        position: 'relative',
        width: '100%',
        marginBottom: marginBottom,
      }}
      ref={containerRef}
    >
      {lockRef.current && children}
    </div>
  );
};

export default LazyIframe;
