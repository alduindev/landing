import React, { useRef } from "react";
import { baseCards } from "../../modules/helpers/dataCards";
import UICard from "../molecules/UICard";

const UICardScroll = () => {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="xl:hidden">
        <button
          onClick={() => scrollByAmount(-200)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md z-20 rounded-full p-2"
        >
          &lt;
        </button>
        <button
          onClick={() => scrollByAmount(200)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md z-20 rounded-full p-2"
        >
          &gt;
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex space-x-4 lg:justify-center lg:items-center overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4
             px-4 sm:px-6 md:px-8
             [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <div className="shrink-0 w-[5%] sm:w-[10%] md:w-[12%] lg:w-[15%]" />
        {baseCards.map((card, index) => (
          <UICard key={index} card={card} />
        ))}
        <div className="shrink-0 w-[5%] sm:w-[10%] md:w-[12%] lg:w-[15%]" />
      </div>
    </div>
  );
};

export default UICardScroll;
