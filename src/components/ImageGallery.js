import React, { useState, useEffect } from 'react';
import { rhythm, scale } from '../utils/typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import Img from 'gatsby-image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ImageGallery.css';

const ImageGallery = props => {
  const { images } = props;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const pageWrapperStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: rhythm(28),
    padding: `2rem ${rhythm(3 / 4)}`,
    width: '100%',
  };

  return (
    <div className="image-gallery">
      <div className="inner-box">
        <div
          className="gallery-title-container"
          style={{
            ...pageWrapperStyle,
            paddingTop: '3rem',
            paddingBottom: '1.5rem',
          }}
        >
          <h2 className="gallery-title">Photo gallery</h2>
        </div>
        <div
          style={{
            ...pageWrapperStyle,
            paddingTop: '0.5rem',
            paddingBottom: '2rem',
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            keyboard
            pagination={{ clickable: true }}
            className="swiper-container"
          >
            {images.map(image => (
              <SwiperSlide key={image.childImageSharp.fluid.src}>
                <div className="image-entry">
                  <Img
                    fluid={image.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt=""
                  />
                </div>
                <div className="pagination-padding"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
