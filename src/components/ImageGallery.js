import React, { useState, useEffect } from 'react';
import { rhythm, scale } from '../utils/typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import { GatsbyImage, getSrcSet, getImage } from 'gatsby-plugin-image';
import { Aperture } from 'react-feather';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { selectHighestResolutionFromSrcSet } from '../utils/imageUtils';

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
    <div className="image-gallery" id="image-gallery">
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
          className="gallery-title-container"
          style={{
            ...pageWrapperStyle,
            paddingTop: '0',
            paddingBottom: '0',
          }}
        >
          <small>Check out all, high-resolution photos from the trip.</small>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1024px',
            width: '100%',
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
                  <GatsbyImage image={getImage(image)} alt="" />
                </div>
                <div className="pagination-padding"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={selectSrc(images[previewPhotoIdx])}
          nextSrc={selectSrc(images[(previewPhotoIdx + 1) % images.length])}
          prevSrc={selectSrc(
            images[(previewPhotoIdx + images.length - 1) % images.length]
          )}
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

const selectSrc = image => {
  return selectHighestResolutionFromSrcSet(getSrcSet(image));
};

export default ImageGallery;
