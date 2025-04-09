import { useState } from "react";

export default function UIHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-[#f6f6f6] shadow-md flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="text-xl font-bold text-[#111827] hidden md:block">
          LANDING
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#111827] hover:text-[#6b7280] neumorphic-button p-2 rounded-full"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">
          Nosotros
        </a>
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">
          Preguntas frecuentes
        </a>
        <a className="text-[#6b7280] hover:text-[#111827] cursor-pointer">
          Quiero unirme
        </a>
      </div>

      <div>
        <button className="bg-[#f6f6f6] px-4 py-2 rounded-full text-[#111827] hover:text-[#6b7280] neumorphic-button transition">
          Iniciar Sesión
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f6f6f6] md:hidden flex flex-col items-start p-6 space-y-6 overflow-y-auto">
          <div className="text-4xl font-bold text-[#111827] mb-4">LANDING</div>

          <a className="text-[#6b7280] hover:text-[#111827] w-full">Nosotros</a>
          <a className="text-[#6b7280] hover:text-[#111827] w-full">
            Preguntas frecuentes
          </a>
          <a className="text-[#6b7280] hover:text-[#111827] w-full">
            Quiero unirme
          </a>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="fixed top-1 right-4 bg-white text-[#6b7280] hover:text-[#111827] p-1 rounded-full shadow-lg"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
