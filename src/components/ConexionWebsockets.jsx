import { useEffect, useRef } from "react";

export function useWebSocket(url, onMessage) {
    const wsRef = useRef(null);
    const onMessageRef = useRef(onMessage);

    // Mantener siempre la ultima version del callback sin recrear conexion
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(() => {
        let ws;
        let reconnectTimeout;

        const connect = () => {
            console.log("🟢 Conectando WS...");
            ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log("✅ WebSocket conectado");
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    onMessageRef.current(data);
                } catch (err) {
                    console.error("Error parseando mensaje:", err);
                }
            };

            ws.onclose = () => {
                console.log("🔴 WebSocket cerrado. Reintentando en 3s...");
                reconnectTimeout = setTimeout(connect, 3000);
            };

            ws.onerror = (err) => {
                console.error("⚠️ WebSocket error:", err);
                ws.close();
            };
        };

        connect();

        return () => {
            console.log("🧹 Cerrando conexión WS");
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            if (ws) ws.close();
        };
    }, [url]);
}