import React, { useRef, useEffect, useState } from 'react';

const UICardsImageSlider = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      subTitle: 'Apple Intelligence y macOS',
      title: 'Tan fáciles de usar como de disfrutar.',
      imageUrl: 'https://placehold.co/600x800/EEE/000?text=macOS',
    },
    {
      subTitle: 'Rendimiento y batería',
      title: 'A toda velocidad.\nEn todos lados.',
      imageUrl: 'https://placehold.co/600x800/111/fff?text=Rendimiento',
    },
    {
      subTitle: 'Mac y iPhone',
      title: 'Un dream team.',
      imageUrl: 'https://placehold.co/600x800/DFF/000?text=Mac+iPhone',
    },
    {
      subTitle: 'Compatibilidad',
      title: 'Tus apps favoritas\nfuncionan en la Mac.',
      imageUrl: 'https://placehold.co/600x800/BBE/000?text=Compatibilidad',
    },
    {
      subTitle: 'Privacidad y seguridad',
      title: 'Lo que es tuyo\nes sólo tuyo.',
      imageUrl: 'https://placehold.co/600x800/FF33A6/fff?text=Privacidad',
    },
    {
      subTitle: 'Durabilidad',
      title: 'Una compañera para la vida.',
      imageUrl: 'https://placehold.co/600x800/000/fff?text=Durabilidad',
    },
    {
      subTitle: 'Valores de Apple',
      title: 'Nuestros valores impulsan nuestras acciones.',
      imageUrl: 'https://placehold.co/600x800/0af/fff?text=Valores',
    },
    {
      subTitle: 'Diseño icónico',
      title: 'Cada detalle cuenta.',
      imageUrl: 'https://placehold.co/600x800/ccc/000?text=Diseño',
    },
    {
      subTitle: 'Ecosistema Apple',
      title: 'Todo conectado a la perfección.',
      imageUrl: 'https://placehold.co/600x800/eaeaea/000?text=Ecosistema',
    },
    {
      subTitle: 'Alto rendimiento',
      title: 'Potencia en cada tarea.',
      imageUrl: 'https://placehold.co/600x800/333/fff?text=Rendimiento+Pro',
    },
  ];

  const animateScroll = (element, to, duration = 500) => {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      element.scrollLeft = start + change * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollToCard = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = slider.querySelectorAll('.card');
    const card = cards[index];
    if (!card) return;

    const sliderWidth = slider.offsetWidth;
    const cardWidth = card.offsetWidth;
    const cardOffset = card.offsetLeft;

    const scrollTo = cardOffset - (sliderWidth / 2) + (cardWidth / 2);
    animateScroll(slider, scrollTo, 500);
  };

  const scroll = (dir) => {
    let newIndex = activeIndex;
    if (dir === 'left') newIndex = Math.max(activeIndex - 1, 0);
    if (dir === 'right') newIndex = Math.min(activeIndex + 1, cards.length - 1);

    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  useEffect(() => {
    scrollToCard(activeIndex);
  }, []);

  useEffect(() => {
    const handleResize = () => scrollToCard(activeIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  return (
    <div className="relative w-full bg-white overflow-hidden py-4 md:py-16">
      <div className="w-full md:px-12 px-4">
        <p className="font-bold md:text-[4rem] text-[2.5rem]">Descubre</p>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 scroll-smooth scrollbar-hide transition-all duration-300 ease-in-out px-4 md:px-12"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="card w-[260px] md:w-[350px] h-[450px] sm:h-[500px] rounded-[28px] flex-shrink-0 relative overflow-hidden shadow-md group transition-transform duration-500"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
            <div className="relative z-20 p-4 h-full flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-white/80">{card.subTitle}</p>
                <h3 className="text-white text-xl font-semibold whitespace-pre-line leading-snug">
                  {card.title}
                </h3>
              </div>
              <button
                onClick={() => alert(`Click en: ${card.title}`)}
                className="w-9 h-9 bg-white text-black rounded-full absolute bottom-4 right-4 flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas */}
      <div className="flex justify-end px-4 md:absolute md:bottom-3 md:right-6 gap-3 z-2 mt-6 md:mt-0">
        <button
          onClick={() => scroll('left')}
          disabled={activeIndex === 0}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${
            activeIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          &#10094;
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={activeIndex === cards.length - 1}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${
            activeIndex === cards.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          &#10095;
        </button>
      </div>

      {/* Ocultar scrollbars visualmente */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default UICardsImageSlider;
