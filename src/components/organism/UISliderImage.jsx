import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UISliderImage = ({
  slides = [
    {
      title: "Slide 1",
      content: "Este es el contenido de la primera imagen.",
      buttonText: "Ver más",
      imageUrl: "https://placehold.co/1600x900?text=Slide+1&font=roboto",
      link: "/ruta-1",
    },
    {
      title: "Slide 2",
      content: "Contenido del segundo slide.",
      buttonText: "Explorar",
      imageUrl: "https://placehold.co/1600x900?text=Slide+2&font=roboto",
      link: "/ruta-2",
    },
  ],
  interval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(autoplay);
  }, [current, interval]);

  const { title, content, buttonText, imageUrl, link } = slides[current];

  return (
    <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center bg-black overflow-hidden shadow-lg transition-all duration-500 ease-in-out">
      <img
        src={imageUrl}
        alt={title}
        className="absolute w-full h-full object-cover opacity-80 transition-all duration-1000 ease-in-out"
      />

      <div className="absolute w-full h-full bg-black bg-opacity-40"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-white text-sm md:text-lg mb-6">{content}</p>
        <button
          onClick={() => navigate(link)}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          {buttonText}
        </button>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-20 bg-black bg-opacity-30 hover:bg-opacity-60 rounded-full p-2"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-20 bg-black bg-opacity-30 hover:bg-opacity-60 rounded-full p-2"
      >
        &#10095;
      </button>
    </div>
  );
};

export default UISliderImage;
