import { Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "./ConexionWebsockets";

import NavBar from "./NavBar";
import bgImage from "../assets/bg/fondo.png";

import { useAuth } from "./Auth/useAuth";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const colors = [
    "#6366F1",
    "#F87171",
    "#34D399",
    "#FBBF24",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
];

const generateChartData = (data) => ({
    labels: data.valores.etiquetas,
    datasets: [
        {
            label: "Probabilidades",
            data: data.valores.probabilidades,
            backgroundColor: colors,
            borderRadius: 8,
        },
    ],
});



const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: { font: { size: 14 } },
        },
        title: {
            display: true,
            text: "Análisis de Emociones",
            font: { size: 20 },
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) =>
                    `${tooltipItem.label}: ${(tooltipItem.raw * 100).toFixed(2)}%`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 1,
            ticks: {
                callback: (val) => `${(val * 100).toFixed(0)}%`,
            },
        },
    },
};

export default function Graphics() {
    const { authenticated } = useAuth();

    const [chartData, setChartData] = useState({
        year: null,
        month: null,
        week: null,
        day: null,
    });

    const [loading, setLoading] = useState(false);
    const [lastFecha, setLastFecha] = useState(null);

    // ---------------------------
    // LocalStorage
    // ---------------------------
    useEffect(() => {
        const saved = localStorage.getItem("chartData");
        if (saved) setChartData(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("chartData", JSON.stringify(chartData));
    }, [chartData]);

    // ---------------------------
    // API CALL
    // ---------------------------
    const fetchAnalysis = async (period, fecha) => {
        try {
            const res = await fetch(`http://localhost:8000/analisis/obtener_analisis?fecha=${fecha}&periodo=${period}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) throw new Error("Error API");

            return await res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            return null;
        }
    };

    // ---------------------------
    // WebSocket Handler
    // ---------------------------
    const handleMessage = useCallback(async (data) => {
        console.log("WS message recibido:", data);

        if (!data?.fecha) {
            console.warn("Mensaje sin fecha:", data);
            return;
        }

        // evitar duplicados
        if (data.fecha === lastFecha) return;
        setLastFecha(data.fecha);

        if (loading) return;
        setLoading(true);

        try {
            const fecha = new Date(data.fecha)
                .toISOString()
                .split("T")[0];

            console.log(fecha)

            const [yearData, monthData, weekData] = await Promise.all([
                fetchAnalysis("Y", fecha),
                fetchAnalysis("M", fecha),
                fetchAnalysis("W", fecha),
            ]);

            setChartData((prev) => ({
                ...prev,
                year: yearData,
                month: monthData,
                week: weekData,
                day: data,
            }));
        } catch (err) {
            console.error("Error general:", err);
        } finally {
            setLoading(false);
        }
    }, [loading, lastFecha]);

    // WebSocket conexión
    useWebSocket("ws://localhost:8000/ws", handleMessage);

    const charts = [
        { title: "Anual", data: chartData.year },
        { title: "Mensual", data: chartData.month },
        { title: "Semanal", data: chartData.week },
        { title: "Diario", data: chartData.day },
    ];

    return (
        <div>
            {authenticated ? (
                <div
                    className="relative min-h-screen w-screen bg-cover bg-center text-white flex flex-col"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="absolute inset-0 bg-black/40 z-0" />

                    <div className="relative z-10 flex flex-col flex-1">
                        <nav className="flex flex-wrap gap-6 p-6 text-sm font-semibold justify-center sm:justify-start">
                            <NavBar />
                            <div className="order-1 lg:order-2 text-center lg:text-left">
                                <div className="flex justify-center">
                                    <span className="font-moontime text-7xl italic">K</span>
                                    <span className="font-dmsans text-6xl ml-2">
                                        RYPTÓS
                                    </span>
                                </div>
                            </div>
                        </nav>

                        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-12">
                            <h1 className="text-2xl font-bold">
                                Gráficos de Emociones
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                                {charts.map(({ title, data }) => (
                                    <div
                                        key={title}
                                        className="bg-black/50 p-4 rounded-xl h-64"
                                    >
                                        <h2 className="text-lg font-semibold mb-2">
                                            {title}
                                        </h2>

                                        {data ? (
                                            <Bar
                                                data={generateChartData(data)}
                                                options={chartOptions}
                                            />
                                        ) : (
                                            <p>Cargando...</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}