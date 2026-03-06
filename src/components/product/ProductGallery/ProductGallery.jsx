import { useState } from "react";
import "./ProductGallery.css";
import iconNext from "../../../assets/icons/icon-next.svg";
import iconPrev from "../../../assets/icons/icon-previous.svg";

const ProductGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="gallery">      
      <div className="gallery__thumbnails">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`gallery__thumb-wrapper ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={img} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>
      
      <div className="gallery__main">        
        <button className="gallery__btn gallery__btn-prev" onClick={prevImage} aria-label="Previous image">
          <img src={iconPrev} alt="" />
        </button>
        
        <img 
          src={images[currentIndex]} 
          alt="Product view" 
          className="gallery__main-img" 
        />
        
        <button className="gallery__btn gallery__btn-next" onClick={nextImage} aria-label="Next image">
          <img src={iconNext} alt="" />
        </button>
        
        <div className="gallery__dots">
          {images.map((_, index) => (
            <span 
              key={index} 
              className={`gallery__dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;