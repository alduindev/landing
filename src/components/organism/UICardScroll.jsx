import React, { useRef, useEffect } from 'react'
import { baseCards } from '../../modules/helpers/dataCards'
import UICard from '../molecules/UICard'

const UICardScroll = () => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

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
      <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto py-12 px-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
      >
        <div
          className={`flex gap-6 items-stretch ${
            baseCards.length <= 3 ? 'sm:justify-center' : 'sm:justify-start'
          }`}
        >
          {baseCards.map((card, index) => (
            <UICard key={index} card={card} scrollRef={scrollRef} />
          ))}
          <div className="flex-shrink-0 w-[10%] sm:w-[40%] md:hidden" />
        </div>
      </div>
    </div>
  )
}

export default UICardScroll
