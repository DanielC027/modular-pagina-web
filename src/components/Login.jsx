import { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "/bg-image.jpg";

import userIcon from "/login/user.svg"
import passwordIcon from "/login/password.svg"
import eyeIcon from "/login/eye.svg"
import eyeNotIcon from "/login/eye_not.svg"

import NavBar from "./NavBar";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LINK_BACKEND = "http://localhost:8000/auth/login";

  const iniciar_sesion = async () => {
    try {
      const response = await fetch(LINK_BACKEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      // opcional: si el backend devuelve info
      const data = await response.json();
      console.log("Login exitoso:", data);

      // 🚀 redirigir si todo salió bien
      navigate("/Home");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center text-white flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar/>

        <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 gap-12">
          
          <div className="order-2 lg:order-1 bg-black/20 backdrop-blur-sm rounded-xl border border-white/40 p-8 w-full max-w-sm shadow-lg">
            <h2 className="text-center text-lg font-semibold mb-6">
              INICIO DE SESIÓN
            </h2>

            {/* Email */}
            <div className="flex items-center border-b border-white/60 mb-6">
              <img src={userIcon} className="h-4" />
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent flex-1 py-2 outline-none placeholder-white text-white ml-2"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-b border-white/60 mb-8">
              <img src={passwordIcon} className="h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent flex-1 py-2 outline-none placeholder-white text-white ml-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                {showPassword 
                  ? <img src={eyeNotIcon} className="h-4" /> 
                  : <img src={eyeIcon} className="h-4" />
                }
              </button>
            </div>

            <button
              className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition"
              onClick={iniciar_sesion}
            >
              INICIAR
            </button>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="flex justify-center">
              <span className="font-moontime text-7xl italic block lg:inline">K</span>
              <span className="font-dmsans text-6xl ml-0 lg:ml-2 block lg:inline">RYPTÓS</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-6">
          <hr className="border-gray-400/60 my-4 w-full max-w-6xl" />
        </div>

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