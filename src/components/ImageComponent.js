import React from 'react';
import { GatsbyImage, getImage, getSrc, getSrcSet } from 'gatsby-plugin-image';
import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';

import { selectThumbnailFromSrcSet } from '../utils/imageUtils';

import './ImageComponent.css';

import '@fancyapps/ui/dist/fancybox.css';

const ImageComponent = ({ image, alt = '', isRow = false, description }) => {
  return (
    <figure
      style={{
        display: 'block',
        marginBottom: isRow ? '0.6rem' : '1.5rem',
        maxWidth: '1024px',
      }}
      className="image-component"
    >
      <a
        href={getSrc(image)}
        data-fancybox="gallery"
        data-caption={description}
        data-thumb={selectThumbnailFromSrcSet(getSrcSet(image))}
      >
        <GatsbyImage image={getImage(image)} alt={alt} />
      </a>
    </figure>
  );
};

export default ImageComponent;
