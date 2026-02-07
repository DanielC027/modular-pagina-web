import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();
    return(
        <nav className="flex flex-wrap gap-6 p-6 text-sm font-semibold justify-center sm:justify-start cursor-pointer">
          <a onClick={() => navigate("/Home")} className="hover:font-bold">INICIO</a>
          <a onClick={() => navigate("/Graphics")} className="hover:font-bold">GRAFICOS</a>
        </nav>
    )
}