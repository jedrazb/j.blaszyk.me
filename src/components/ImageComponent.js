import React from 'react';
import { GatsbyImage, getImage, getSrcSet } from 'gatsby-plugin-image';

import { selectHighestResolutionFromSrcSet } from '../utils/imageUtils';

const ImageComponent = ({ image, alt = '', isRow = false }) => {
  return (
    <a
      className="gatsby-resp-image-link"
      href={selectHighestResolutionFromSrcSet(getSrcSet(image))}
      target="_blank"
      rel="noopener"
      style={{ display: 'block', marginBottom: isRow ? '0.75rem' : '1.5rem' }}
    >
      <GatsbyImage image={getImage(image)} alt={alt} />
    </a>
  );
};

export default ImageComponent;
