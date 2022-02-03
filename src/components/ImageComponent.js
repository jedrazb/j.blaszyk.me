import React from 'react';
import { GatsbyImage, getSrc, getImage } from 'gatsby-plugin-image';

const ImageComponent = ({ image, alt = '', isRow = false }) => {
  return (
    <a
      className="gatsby-resp-image-link"
      href={getSrc(image)}
      target="_blank"
      rel="noopener"
      style={{ display: 'block', marginBottom: isRow ? '0.75rem' : '1.5rem' }}
    >
      <GatsbyImage image={getImage(image)} alt={alt} />
    </a>
  );
};

export default ImageComponent;
