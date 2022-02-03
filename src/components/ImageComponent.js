import React from 'react';
import { GatsbyImage, getSrc, getImage } from 'gatsby-plugin-image';

const ImageComponent = ({ image, alt = '' }) => {
  return (
    <p>
      <a
        className="gatsby-resp-image-link"
        href={getSrc(image)}
        target="_blank"
        rel="noopener"
        style={{ display: 'block' }}
      >
        <GatsbyImage image={getImage(image)} alt={alt} />
      </a>
    </p>
  );
};

export default ImageComponent;
