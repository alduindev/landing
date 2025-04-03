import React from 'react'
import UIButton from '../atoms/UIButton'

const UICard = ({ card, scrollRef }) => {
  const handleClick = (e) => {
    const container = scrollRef.current
    const cardElement = e.currentTarget
    if (container && cardElement) {
      const containerRect = container.getBoundingClientRect()
      const cardRect = cardElement.getBoundingClientRect()
      const offset =
        cardRect.left - containerRect.left - (container.clientWidth / 2) + (cardElement.clientWidth / 2)
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="card-item flex-shrink-0 snap-center w-[90%] sm:w-[60%] md:w-72 lg:w-80 xl:w-96 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 ease-in-out border border-gray-100"
      onClick={handleClick}
      onTouchEnd={(e) => {
        e.currentTarget.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }}
    >
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-40 object-cover rounded-t-3xl"
      />
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{card.title}</h3>
        <p className="text-sm md:text-base text-gray-500 mt-2">{card.description}</p>
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
  )
}

export default UICard
