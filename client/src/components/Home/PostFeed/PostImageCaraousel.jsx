import React, { useEffect, useState } from "react";

const PostImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Automatically advance to the next image every 5 seconds
    const timer = setInterval(nextImage, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentImage]);

  return (
    <div className="awesome-image-carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            className={index === currentImage ? "active" : "caraouselimg"}
          />
        ))}
      </div>
      <button onClick={prevImage} className="prev">
        &#10094;
      </button>
      <button onClick={nextImage} className="next">
        &#10095;
      </button>
    </div>
  );
};

export default PostImageCarousel;
