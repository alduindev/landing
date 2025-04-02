import { useState, useEffect } from 'react'

export default function UIBanner() {
    const [mostrarModal, setMostrarModal] = useState(false)

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [tipoDocumento, setTipoDocumento] = useState('DNI')
    const [nroDocumento, setNroDocumento] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [valido, setValido] = useState(false)
    const [showTerminos, setShowTerminos] = useState(false)

    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/

    useEffect(() => {
        const nombreValido = nombre.trim().length > 3
        const apellidoValido = apellido.trim().length > 3
        const docValido = nroDocumento.trim().length > 3
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const telefonoValido = /^\d{9}$/.test(telefono)
        const passwordValida = regexPassword.test(password)
        const confirmacionValida = password === confirmPassword
        const fechaValida = Boolean(fechaNacimiento)

        setValido(
            nombreValido &&
            apellidoValido &&
            docValido &&
            emailValido &&
            telefonoValido &&
            passwordValida &&
            confirmacionValida &&
            fechaValida
        )
    }, [nombre, apellido, nroDocumento, email, telefono, password, confirmPassword, fechaNacimiento])

    const fechaValida = (() => {
        if (!fechaNacimiento) return false
        const hoy = new Date()
        const nacimiento = new Date(fechaNacimiento)
        const edad = hoy.getFullYear() - nacimiento.getFullYear()
        const cumpleEsteAnio = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())
        return edad > 18 || (edad === 18 && hoy >= cumpleEsteAnio)
    })()


    const handleTipoDocumento = (value) => {
        setTipoDocumento(value)
        setNroDocumento('')
    }

    const handleRegistro = () => {
        const payload = {
            nombre,
            apellido,
            tipo_documento: tipoDocumento,
            nro_documento: nroDocumento,
            email,
            telefono,
            password,
            fecha_nacimiento: fechaNacimiento,
        }

        console.log('Payload listo para enviar al API:', payload)
        alert('✅ JSON generado. Revisa la consola.')
    }

    const handleDocumentoChange = (e) => {
        let valor = e.target.value.toUpperCase()

        if (tipoDocumento === 'DNI') {
            valor = valor.replace(/\D/g, '').slice(0, 8)
        } else if (tipoDocumento === 'CE') {
            valor = valor.replace(/\D/g, '').slice(0, 9)
        } else if (tipoDocumento === 'Pasaporte') {
            valor = valor.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)
        }

        setNroDocumento(valor)
    }

    return (
        <div className="relative bg-white w-full">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10 md:py-20 max-w-7xl mx-auto">
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-semibold text-purple-600 leading-tight">
                        Conecta con<br />
                        trabajadoras independientes<br />
                        en limpieza cerca de ti
                    </h1>
                    <div className="w-full max-w-md mx-auto md:mx-0">
                        <button
                            onClick={() => setMostrarModal(true)}
                            className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                        >
                            Empezar
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <img src="https://placehold.co/300x160" alt="Personas" className="w-full object-cover" />
                </div>
            </div>

            {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
                    <div className="bg-[#f0f0f3] rounded-2xl  max-h-[90vh] min-w-[90%] md:min-w-[400px] max-w-md w-full p-6 relative shadow-xl overflow-y-auto">
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
                        >
                            &times;
                        </button>

                        {!showTerminos ? (
                            <>
                                <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Crear Una Cuenta</h2>
                                <p className="text-xs text-center text-gray-500 lg:mt-4 lg:mb-12">
                                    Ten en cuenta que los datos ingresados serán tomados para el comprobante de pago de tu servicio.
                                </p>

                                <form className="space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="w-full sm:w-1/2 px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            className="w-full sm:w-1/2 px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <select
                                            value={tipoDocumento}
                                            onChange={(e) => handleTipoDocumento(e.target.value)}
                                            className="w-full text-gray-400 sm:w-1/2 px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                        >
                                            <option value="DNI">DNI</option>
                                            <option value="Pasaporte">Pasaporte</option>
                                            <option value="CE">CE</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Documento"
                                            value={nroDocumento}
                                            onChange={handleDocumentoChange}
                                            className="uppercase w-full sm:w-1/2 px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                        />
                                    </div>

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                        className="w-full px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Celular"
                                        value={telefono}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 9) setTelefono(e.target.value.replace(/\D/g, ''))
                                        }}
                                        className="w-full px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                    />
                                    <div className="relative w-full">
                                        <input
                                            id="fechaNacimientoInput"
                                            type="date"
                                            value={fechaNacimiento}
                                            onChange={(e) => setFechaNacimiento(e.target.value)}
                                            onClick={() => document.getElementById('fechaNacimientoInput').showPicker?.()}
                                            className={`w-full px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none appearance-none
      ${fechaNacimiento ? "text-gray-400" : "text-transparent"}`}
                                        />
                                        {!fechaNacimiento && (
                                            <span
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 cursor-text select-none"
                                                onClick={() => document.getElementById('fechaNacimientoInput').showPicker?.()}
                                            >
                                                Fecha de Cumpleaños
                                            </span>
                                        )}
                                    </div>




                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-full text-sm bg-[#f0f0f3] shadow-inner border border-gray-200 outline-none"
                                    />

                                    <button
                                        type="button"
                                        disabled={!valido}
                                        onClick={handleRegistro}
                                        className={`w-full py-3 rounded-full font-medium text-sm shadow-md transition ${valido
                                            ? 'bg-purple-600 text-white hover:opacity-90'
                                            : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Continuar
                                    </button>

                                    <p className="text-center text-[11px] text-gray-500 mt-2">
                                        Al hacer uso de la plataforma, aceptas los{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowTerminos(true)}
                                            className="text-purple-600 underline hover:text-purple-800"
                                        >
                                            Términos y condiciones
                                        </button>.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col h-full max-h-[80vh] overflow-y-auto">
                                    <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Términos y Condiciones</h2>

                                    <div className="flex-1 text-[13px] text-gray-700 space-y-3 bg-white p-4 rounded-xl shadow-inner text-justify overflow-y-auto">
                                        <p>
                                            Tus datos personales serán tratados de manera confidencial y utilizados únicamente para fines relacionados
                                            con la prestación del servicio, emisión de comprobantes, y comunicación con el cliente.
                                        </p>
                                        <p>
                                            Al continuar, aceptas que podremos enviarte notificaciones relacionadas al servicio, novedades y otros mensajes necesarios.
                                        </p>
                                        <p>
                                            No compartiremos tu información con terceros sin tu consentimiento, salvo obligación legal.
                                        </p>
                                        <p>
                                            Este servicio sigue normas de privacidad establecidas por las leyes peruanas sobre protección de datos personales.
                                        </p>
                                        <p>
                                            Nos reservamos el derecho de actualizar los términos, en cuyo caso se notificará por los medios registrados.
                                        </p>
                                        <p>
                                            Para más información, puedes escribirnos a contacto@ejemplo.com.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setShowTerminos(false)}
                                        className="mt-6 w-full bg-purple-600 text-white py-3 rounded-full font-medium text-sm hover:opacity-90 transition shadow-md"
                                    >
                                        Volver
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
