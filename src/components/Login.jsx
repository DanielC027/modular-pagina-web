import { useState } from "react";
import bgImage from "/bg-image.jpg"; // tu fondo

import userIcon from "/login/user.svg"
import passwordIcon from "/login/password.svg"
import eyeIcon from "/login/eye.svg"

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center text-white flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Capa oscura detrás */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex flex-wrap gap-6 p-6 text-sm font-semibold justify-center sm:justify-start">
          <a href="#" className="hover:font-bold">INICIO</a>
          <a href="#" className="hover:font-bold">GRAFICOS</a>
          <a href="#" className="hover:font-bold">EXPORTAR</a>
        </nav>

        {/* Contenedor central */}
        <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 gap-12">
          
          {/* Caja de login */}
          <div className="order-2 lg:order-1 bg-black/20 backdrop-blur-sm rounded-xl border border-white/40 p-8 w-full max-w-sm shadow-lg">
            <h2 className="text-center text-lg font-semibold mb-6">
              INICIO DE SESIÓN
            </h2>

            {/* Input correo */}
            <div className="flex items-center border-b border-white/60 mb-6">
              <img src={userIcon} className="h-4" />
              <input
                type="email"
                placeholder="Correo"
                className="bg-transparent flex-1 py-2 outline-none placeholder-white text-white ml-2"
              />
            </div>

            {/* Input contraseña */}
            <div className="flex items-center border-b border-white/60 mb-8">
              <img src={passwordIcon} className="h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="bg-transparent flex-1 py-2 outline-none placeholder-white text-white ml-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                <span className="material-icons">
                  {showPassword ? "visibility" : <img src={eyeIcon} className="h-4" />}
                </span>
              </button>
            </div>

            <button className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition">
              INICIAR
            </button>
          </div>

          {/* Logo */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="flex justify-center">
              <span className="font-moontime text-7xl  italic block lg:inline">K</span>
              <span className="font-dmsans text-6xl  ml-0 lg:ml-2 block lg:inline">RYPTÓS</span>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="flex justify-center px-6">
          <hr className="border-gray-400/60 my-4 w-full max-w-6xl" />
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2">
          <div></div>
          <footer className="text-center text-xs py-4">
            © 2025 KRYPTÓS. TODOS LOS DERECHOS RESERVADOS.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
