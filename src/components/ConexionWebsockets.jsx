import { useEffect, useRef } from "react";

export function useWebSocket(url, onMessage) {
  const wsRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    
    // GET THE SESSION
    //answer = fetch()
    
    isMounted.current = true;
    
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS conectado");
    };

    ws.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data));
      } catch {
        console.error("Mensaje no es JSON");
      }
    };

    ws.onerror = () => {
      console.error("WS error");
    };

    ws.onclose = () => {
      console.log("WS cerrado");
    };

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return wsRef;
}
