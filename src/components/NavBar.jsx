import { useNavigate } from "react-router-dom";
import { logout } from "./Auth/Auth";
import { useAuth } from "./Auth/useAuth";

export default function NavBar(){
    const { authenticated, setAuthenticated } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        const respuesta = await logout();
        if (respuesta === true){
            setAuthenticated(false);
            navigate("/");
        }else{
            alert("Error al cerrar sesión");
        }

    }

    return(
        <nav className="flex flex-wrap gap-6 p-6 text-sm font-semibold justify-center sm:justify-start cursor-pointer">
          <a onClick={() => navigate("/home")} className="hover:font-bold">INICIO</a>
          <a onClick={() => navigate("/graphics")} className="hover:font-bold">GRAFICOS</a>
          <div>
          {authenticated ? <a onClick={handleLogout} className="hover:font-bold justify-right">Cerrar Sesion</a> : <></>}
          </div>
        </nav>
    )
}