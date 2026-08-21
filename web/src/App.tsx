import React, { useEffect, useState } from 'react';
import { sendToNative, listenFromNative } from './bridge/nativeBridge';
import { type UserSession, type BridgeMessage } from './types/bridge';

interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: UserSession | null;
  token: string | null;
}

export default function App(): React.JSX.Element {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    authenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // 1. Escuchar la respuesta del Shell Nativo
    const unsubscribe = listenFromNative((data: BridgeMessage) => {
      if (data.type === 'HU01_SESSION_RESPONSE') {
        if (data.payload?.token && data.payload?.user) {
          setAuthState({
            loading: false,
            authenticated: true,
            user: data.payload.user,
            token: data.payload.token,
          });
        } else {
          setAuthState({ loading: false, authenticated: false, user: null, token: null });
        }
      }
    });

    // 2. Disparar handshake de inicio de sesión al Shell Nativo
    sendToNative('HU01_INIT_SESSION', { clientVersion: '1.0.0-vite-ts' });

    return () => unsubscribe();
  }, []);

  if (authState.loading) {
    return (
      <div style={styles.container}>
        <h3>Iniciando Handshake Seguro con Shell Nativo...</h3>
      </div>
    );
  }

  if (!authState.authenticated) {
    return (
      <div style={styles.container}>
        <h3 style={{ color: '#ef4444' }}>Error de Autenticación</h3>
        <p>No se recibió un token válido desde la app móvil.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Micro-App Web (Vite + React + TS)</h2>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' },
  card: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: 16, borderRadius: 8 },
  code: { display: 'block', padding: 8, background: '#0f172a', color: '#38bdf8', borderRadius: 4, wordBreak: 'break-all', fontSize: 12 }
};