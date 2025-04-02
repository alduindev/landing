import React, { useRef, useEffect } from 'react'

const UICardScroll = () => {
  const scrollRef = useRef(null)

  const baseCards = [
    { title: 'Card 1', description: 'This is the first card.', img: 'https://placehold.co/400x200?text=Card+1' },
    { title: 'Card 2', description: 'This is the second card.', img: 'https://placehold.co/400x200?text=Card+2' },
    { title: 'Card 3', description: 'This is the third card.', img: 'https://placehold.co/400x200?text=Card+3' },
    { title: 'Card 4', description: 'This is the fourth card.', img: 'https://placehold.co/400x200?text=Card+4' },
    { title: 'Card 5', description: 'This is the fifth card.', img: 'https://placehold.co/400x200?text=Card+5' },
  ]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Centrar la primera card en mobile al montar
    if (window.innerWidth < 640) {
      const firstCard = container.querySelector('.card-item')
      if (firstCard) {
        const containerRect = container.getBoundingClientRect()
        const cardRect = firstCard.getBoundingClientRect()

        const offset = cardRect.left - containerRect.left - (container.clientWidth / 2) + (firstCard.clientWidth / 2)
        container.scrollBy({ left: offset, behavior: 'smooth' })
      }
    }
  }, [])

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full">
      {/* Gradients laterales para efecto visual UX */}
      <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Botones móviles encima de las cards */}
      <div className="sm:hidden">
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

      {/* Contenedor scrolleable */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto py-6 px-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-6 items-stretch">
          {baseCards.map((card, index) => (
            <div
              key={index}
              className="card-item flex-shrink-0 snap-center w-[90%] sm:w-[60%] md:w-72 lg:w-80 xl:w-96 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 ease-in-out border border-gray-100"
              onClick={(e) => {
                const container = scrollRef.current
                const cardElement = e.currentTarget

                if (container && cardElement) {
                  const containerRect = container.getBoundingClientRect()
                  const cardRect = cardElement.getBoundingClientRect()

                  const offset =
                    cardRect.left - containerRect.left - (container.clientWidth / 2) + (cardElement.clientWidth / 2)

                  container.scrollBy({ left: offset, behavior: 'smooth' })
                }
              }}
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
              </div>
            </div>
          ))}

          {/* Spacer solo en mobile para permitir centrado de la última card */}
          <div className="flex-shrink-0 w-[10%] sm:w-[40%] md:hidden" />
        </div>
      </div>
    </div>
  )
}

export default UICardScroll
