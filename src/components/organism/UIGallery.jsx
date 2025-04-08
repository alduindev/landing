import React, { useState, useEffect, useRef } from 'react';

const originalSlides = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Slide ${i + 1}`,
  category: 'Music',
  description: 'lorem ipsum dolor sit amet.',
  image: `https://placehold.co/800x450?text=Slide+${i + 1}`,
  button: 'Ingresar',
}));

// Clonamos extremos para loop visual
const slides = [
  originalSlides[originalSlides.length - 1],
  ...originalSlides,
  originalSlides[0],
];

const UIGallery = () => {
  const [current, setCurrent] = useState(1);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const isTransitioning = useRef(false);
  const GAP = 32;

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const containerW = containerRef.current.offsetWidth;
        const isMobile = window.innerWidth <= 768;
        setSlideWidth(isMobile ? containerW * 0.9 : containerW * 0.6);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getOffset = (index) =>
    (slideWidth + GAP) * index - (containerRef.current.offsetWidth - slideWidth) / 2;

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      wrapperRef.current.style.transition = 'transform 0.5s ease-in-out';
      wrapperRef.current.style.transform = `translateX(-${getOffset(current)}px)`;
    }
  }, [current, slideWidth]);

  const handleTransitionEnd = () => {
    if (!wrapperRef.current || !containerRef.current) return;

    if (current === 0) {
      const index = slides.length - 2;
      const offset = getOffset(index);

      requestAnimationFrame(() => {
        wrapperRef.current.style.transition = 'none';
        wrapperRef.current.style.transform = `translateX(-${offset}px)`;

        requestAnimationFrame(() => {
          setCurrent(index);
        });
      });
    } else if (current === slides.length - 1) {
      const offset = getOffset(1);

      requestAnimationFrame(() => {
        wrapperRef.current.style.transition = 'none';
        wrapperRef.current.style.transform = `translateX(-${offset}px)`;

        requestAnimationFrame(() => {
          setCurrent(1);
        });
      });
    }

    isTransitioning.current = false;
  };

  const handleClick = (index) => {
    if (isTransitioning.current) return;
    const prev = current - 1;
    const next = current + 1;
    if (index === prev || index === next) {
      isTransitioning.current = true;
      setCurrent(index);
    }
  };

  return (
    <div ref={containerRef} className="w-full mx-auto overflow-hidden py-8">
      <div className="relative w-full overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex gap-8"
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: (slideWidth + GAP) * slides.length,
          }}
        >
          {slides.map((slide, i) => {
            const isActive = i === current;
            const isPrev = i === current - 1;
            const isNext = i === current + 1;

            return (
              <div
                key={`${slide.id}-${i}`}
                onClick={() => handleClick(i)}
                className={`flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                  isActive
                    ? 'scale-100 cursor-default z-10'
                    : isPrev || isNext
                    ? 'scale-95 opacity-80 cursor-pointer z-0'
                    : 'scale-90 opacity-50 pointer-events-none z-0'
                }`}
                style={{ width: `${slideWidth}px` }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[45vw] max-h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-4 md:px-6 md:py-6 flex flex-col md:flex-row justify-between items-start md:items-end text-white gap-4">
                  <div className="space-y-2 flex-col md:block flex w-full gap-1">
                    
                    <p className="text-sm md:text-base">
                      <span className="font-bold">{slide.category}</span>
                      <span className="mx-1">·</span>
                      {slide.description}
                    </p>
                    <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition">
                      {slide.button}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {originalSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index + 1)}
            className={`w-3 h-3 rounded-full transition ${
              index + 1 === current ? 'bg-neutral-800' : 'bg-neutral-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UIGallery;
