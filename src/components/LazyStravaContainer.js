import React from 'react';
import { useRef, useEffect } from 'react';
import classnames from 'classnames';
import useIntersectionObserver from '@react-hook/intersection-observer';

import './layout/Container.css';

const LazyStravaContainer = ({
  children,
  height,
  marginBottom = '0',
  wrapperClassName,
}) => {
  const containerRef = useRef();
  const lockRef = useRef(false);
  const { isIntersecting } = useIntersectionObserver(containerRef);
  if (isIntersecting) {
    lockRef.current = true;
  }

  useEffect(() => {
    if (lockRef.current) {
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [lockRef.current]);

  return (
    <div
      className={classnames(
        'layout-container layout-iframe-container',
        wrapperClassName
      )}
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

export default LazyStravaContainer;
