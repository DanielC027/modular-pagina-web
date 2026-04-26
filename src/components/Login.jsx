import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./Auth/useAuth";
import { iniciar_sesion } from "./Auth/Auth"; 

import bgImage from "/bg-image.jpg";

import userIcon from "/login/user.svg"
import passwordIcon from "/login/password.svg"
import eyeIcon from "/login/eye.svg"
import eyeNotIcon from "/login/eye_not.svg"

import NavBar from "./NavBar";

function Login() {
  const { authenticated, setAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEstado, setErrorEstado] = useState(false);

  useEffect(() => {
    console.log(authenticated);
  },[]);

  const handleSesion = async () => {
    try{
      const respuesta = await iniciar_sesion(email, password);
      console.log(respuesta);
      if(respuesta === true){
        setAuthenticated(true);
        setErrorEstado(false);
        navigate("/home");
      }else{
        setErrorEstado(true);
      }
    }catch(error){

    }
  }

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
            {errorEstado ? <div><h3 className="text-red-300 font-bold">Error: datos incorrectos, intenta nuevamente</h3></div> : <></>}
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
              onClick={handleSesion}
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