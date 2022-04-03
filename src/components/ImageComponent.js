import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import './ImageComponent.css';

const ImageComponent = ({ image, alt = '', isRow = false, description }) => {
  return (
    <figure
      style={{ display: 'block', marginBottom: isRow ? '0.75rem' : '1.5rem' }}
      className="image-component"
    >
      <Zoom overlayBgColorEnd="var(--bg)">
        <GatsbyImage image={getImage(image)} alt={alt} />
      </Zoom>
      {description && <figcaption>{description}</figcaption>}
    </figure>
  );
};

export default ImageComponent;
