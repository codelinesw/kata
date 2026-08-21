import { type WebMessageType, type WebMessagePayload, type BridgeMessage } from '../types/bridge';

// Envía un mensaje desde Vite TS hacia React Native
export const sendToNative = (type: WebMessageType, payload: WebMessagePayload = {}): void => {
  if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
    const message: BridgeMessage = { type, payload };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    console.warn('[Web TS] No se detectó el objeto window.ReactNativeWebView');
  }
};

// Escucha eventos inyectados desde el Shell Nativo
export const listenFromNative = (callback: (data: BridgeMessage) => void): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<BridgeMessage>;
    try {
      const data = typeof customEvent.detail === 'object' 
        ? customEvent.detail 
        : JSON.parse(customEvent.detail as unknown as string);
      
      callback(data);
    } catch (err) {
      console.error('[Web TS Bridge] Error procesando evento nativo:', err);
    }
  };

  window.addEventListener('NativeBridgeMessage', handler);
  
  // Función de limpieza para useEffect
  return () => window.removeEventListener('NativeBridgeMessage', handler);
};