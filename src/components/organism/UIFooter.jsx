export default function UIFooter({ variante = 'basico' }) {
  const datos = {
    newsletter: {
      titulo: "¡Suscríbete a nuestro boletín!",
      subtitulo: "Mantente al día con nuestras novedades.",
      placeholder: "Ingresa tu correo",
      boton: "Suscribirme"
    },
    descripcion: {
      nombre: "LANDING",
      texto: "Impulsamos tu negocio con un asistente de IA personal."
    },
    secciones: {
      Plataforma: ["Planes y precios", "Gestor IA personal", "Redactor de negocios IA"],
      Empresa: ["Blog", "Carreras", "Noticias"],
      Recursos: ["Documentación", "Artículos", "Conferencias de prensa"]
    },
    legales: ["Términos de servicio", "Política de privacidad", "Cookies"],
    copyright: "© 2025 LANDING Inc."
  }

  const estilos = {
    basico: 'bg-[#f6f6f6] text-[#111827] neumorphic-shadow',
    oscuro: 'bg-[#111827] text-white neumorphic-shadow',
    minimal: 'bg-white text-gray-700 border-t border-gray-200'
  }

  const posicion = {
    basico: 'sticky bottom-0 z-40',
    oscuro: 'sticky',
    minimal: ''
  }

  const inputEstilo = variante === 'oscuro'
    ? 'bg-[#1f2937] text-white'
    : 'bg-transparent text-sm'

  const buttonEstilo = variante === 'oscuro'
    ? 'bg-white text-[#111827]'
    : 'bg-gray-800 text-white'

  const newsletterBg = variante === 'oscuro' ? 'bg-[#1f2937]' : 'bg-white'

  return (
    <div className={`${estilos[variante]} ${posicion[variante]} w-full px-6 py-10 space-y-12`}>
      {variante !== 'minimal' && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-semibold">
              {datos.newsletter.titulo}<br />{datos.newsletter.subtitulo}
            </div>
          </div>

          <div className={`flex items-center w-full md:w-auto max-w-md rounded-full shadow-inner px-4 py-2 ${newsletterBg}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12A4 4 0 1 0 8 12a4 4 0 0 0 8 0z" />
            </svg>
            <input
              type="email"
              placeholder={datos.newsletter.placeholder}
              className={`w-full bg-transparent outline-none ${inputEstilo}`}
            />
            <button className={`ml-4 text-sm px-4 py-2 rounded-full hover:opacity-90 transition ${buttonEstilo}`}>
              {datos.newsletter.boton}
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-gray-300" />

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <div className="text-2xl font-bold mb-2">{datos.descripcion.nombre}</div>
          <div className="text-sm text-gray-500 max-w-xs">{datos.descripcion.texto}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          {Object.entries(datos.secciones).map(([titulo, items]) => (
            <div key={titulo}>
              <div className="font-semibold mb-2">{titulo}</div>
              <div className="space-y-1">
                {items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300" />

      <div className="flex flex-col md:flex-row justify-between text-xs text-gray-400">
        <div>{datos.copyright}</div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          {datos.legales.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
