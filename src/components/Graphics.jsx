import NavBar from "./NavBar";
import bgImage from "/bg-image.jpg";

export default function Graphics() {
    return (
        <div
            className="relative h-screen w-screen bg-cover bg-center text-white flex flex-col"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Capa oscura detrás */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col flex-1">
                {/* Navbar */}
                <nav className="flex flex-wrap gap-6 p-6 text-sm font-semibold justify-center sm:justify-start">
                    <NavBar />
                    {/* Logo */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <div className="flex justify-center">
                            <span className="font-moontime text-7xl italic block lg:inline">K</span>
                            <span className="font-dmsans text-6xl ml-0 lg:ml-2 block lg:inline">RYPTÓS</span>
                        </div>
                    </div>
                </nav>

                {/* Contenedor central */}
                <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 gap-12 w-full max-w-7xl mx-auto">
                    <h1>Graficos</h1>
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
