import React, { useState, useEffect } from 'react';
import { rhythm, scale } from '../utils/typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import Img from 'gatsby-image';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ImageGallery.css';

const ImageGallery = props => {
  const { images } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [previewPhotoIdx, setPreviewPhotoIdx] = useState(null);
  const [swiper, setSwiper] = useState(null);

  const slideTo = index => swiper.slideTo(index);

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
            onSwiper={setSwiper}
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            keyboard
            pagination={{ clickable: true }}
            className="swiper-container"
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="image-entry"
                  onClick={() => {
                    setPreviewPhotoIdx(idx);
                    setIsOpen(true);
                  }}
                >
                  <Img
                    fluid={image.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt=""
                    loading="eager"
                  />
                </div>
                <div className="pagination-padding"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[previewPhotoIdx].childImageSharp.fluid.src}
          nextSrc={
            images[(previewPhotoIdx + 1) % images.length].childImageSharp.fluid
              .src
          }
          prevSrc={
            images[(previewPhotoIdx + images.length - 1) % images.length]
              .childImageSharp.fluid.src
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            setPreviewPhotoIdx(
              (previewPhotoIdx + images.length - 1) % images.length
            );
            slideTo((previewPhotoIdx + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setPreviewPhotoIdx((previewPhotoIdx + 1) % images.length);
            slideTo((previewPhotoIdx + 1) % images.length);
          }}
        />
      )}
    </div>
  );
};

export default ImageGallery;
