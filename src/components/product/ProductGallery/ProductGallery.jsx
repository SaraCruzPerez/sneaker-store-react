import { useState } from "react";
import "./ProductGallery.css";
import iconNext from "../../../assets/icons/icon-next.svg";
import iconPrev from "../../../assets/icons/icon-previous.svg";

const ProductGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      nextImage();
    }

    if (diff < -50) {
      prevImage();
    }
  };

  return (
    <div className="gallery">      
      <div className="gallery__thumbnails">
        {images.map((img, index) => (
          <button 
            key={index} 
            className={`gallery__thumb-wrapper ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`View product image ${index + 1}`}
          >
            <img src={img} alt="" aria-hidden="true"/>
          </button>
        ))}
      </div>
      
      <div 
        className="gallery__main"
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd}     
      >        
        <button 
          className="gallery__btn gallery__btn-prev" 
          onClick={prevImage} 
          aria-label="Previous image">
            <img src={iconPrev} alt="" aria-hidden="true"/>
        </button>
        
        <div className="gallery__slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Product view ${index + 1}`}
              className="gallery__slider-img" 
            />
          ))}
        </div>
        
        <button 
          className="gallery__btn gallery__btn-next" 
          onClick={nextImage} 
          aria-label="Next image">
            <img src={iconNext} alt="" aria-hidden="true"/>
        </button>
        
        <div className="gallery__dots">
          {images.map((_, index) => (
            <button 
              key={index} 
              className={`gallery__dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;