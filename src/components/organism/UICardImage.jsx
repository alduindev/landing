import React from 'react';

const UICardImage = ({ cards }) => {
  const count = cards.length;
  const isImpar = count % 2 !== 0;

  console.log(count)

  const renderCard = (card, index, extraClasses = '') => (
    <div
      key={index}
      className={`relative rounded-xl shadow-md overflow-hidden h-[400px] sm:h-[700px] flex items-center justify-center text-white w-full ${extraClasses}`}
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
        <p className="text-sm mb-4">{card.subtitle}</p>
        {card.cta && (
          <button className="mt-2 px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-gray-100 transition">
            {card.cta}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 md:px-12 py-10">
      {count === 1 ? (
        <div className="w-full">{renderCard(cards[0], 0)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const isLast = index === count - 1;
            const shouldSpan = isImpar && isLast;
            return renderCard(card, index, shouldSpan ? 'sm:col-span-2' : '');
          })}
        </div>
      )}
    </div>
  );
};

export default UICardImage;
