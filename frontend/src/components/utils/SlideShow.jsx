import React, { useState, useEffect } from "react";
import "../../style/slideShow.css";
import iphone from "../../assets/iphone_banner.jpeg";

import purse from "../../assets/purse_banner.png";
import { useNavigate } from "react-router-dom";

const images = [
    { src: iphone, link: "/product/67264772d8657450541da996" },
    { src: purse, link: "/product/67265071d8657450541daab9" },
];

const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const delay = 8000;
    const navigate = useNavigate();

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleImageClick = (link) => {
        navigate(link);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, delay);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={
                            index === currentIndex ? "slide active" : "slide"
                        }
                    >
                        {index === currentIndex && (
                            <img
                                src={image.src}
                                alt={`Slide ${index + 1}`}
                                onClick={() => handleImageClick(image.link)}
                                style={{ cursor: "pointer" }}
                            />
                        )}
                    </div>
                ))}

                {/* Navigation Controls */}
                <button className="prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>

            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={
                            index === currentIndex ? "dot active" : "dot"
                        }
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
