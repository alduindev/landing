import React from "react";
import UIButton from "../atoms/UIButton";

const UICard = ({ card }) => {
  return (
    <div
      className="card-item flex-shrink-0 snap-center 
                 w-[90%] sm:w-[75%] md:w-[60%] lg:w-72 xl:w-80 
                 bg-white rounded-3xl shadow-lg hover:shadow-2xl 
                 transform hover:scale-[1.03] transition-all duration-300 ease-in-out 
                 border border-gray-100"
      onTouchEnd={(e) => {
        e.currentTarget.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }}
    >
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-44 sm:h-48 md:h-40 object-cover rounded-t-3xl"
      />
      <div className="p-5">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
          {card.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          {card.description}
        </p>
        <UIButton
          onClick={() => console.log(`Ver más de ${card.title}`)}
          variant="primary"
          size="sm"
          className="mt-4"
          fullWidth
        >
          Ver más
        </UIButton>
      </div>
    </div>
  );
};

export default UICard;
