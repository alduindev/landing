import { useState } from 'react'

export default function UIHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="sticky top-4 z-50 bg-[#f6f6f6] shadow-md flex items-center justify-between rounded-2xl mx-4 my-4 p-4 neumorphic-shadow">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-[#111827] hidden md:block">LANDING</div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#111827] hover:text-[#6b7280] neumorphic-button p-2 rounded-full"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">Nosotros</a>
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">Preguntas frecuentes</a>
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">Quiero unirme</a>
      </div>

      <div>
        <button className="bg-[#f6f6f6] px-4 py-2 rounded-full text-[#111827] hover:text-[#6b7280] neumorphic-button transition">
          Iniciar Sesión
        </button>
      </div>

      {isMenuOpen && (
        <div className="mt-2 md:hidden absolute top-full left-0 w-full bg-[#f6f6f6] rounded-xl shadow-lg flex flex-col items-start p-4 space-y-4 neumorphic-shadow transition-all duration-300">
          <div className="text-5xl font-bold text-[#111827] mb-2">LANDING</div>
          <a className="text-[#6b7280] hover:text-[#111827] w-full">Nosotros</a>
          <a className="text-[#6b7280] hover:text-[#111827] w-full">Preguntas frecuentes</a>
          <a className="text-[#6b7280] hover:text-[#111827] w-full">Quiero unirme</a>
        </div>
      )}
    </div>
  )
}
