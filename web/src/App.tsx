import React, { useEffect, useState } from 'react';
import { type UserSession, type GoalData } from './types/bridge';
import { GoalDetailScreen } from './presentation/screens/goal-detail-screen';


interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: UserSession | null;
  token: string | null;
  goalData: GoalData | null
}

export default function App(): React.JSX.Element {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    authenticated: false,
    user: null,
    token: null,
    goalData: null
  });

  useEffect(() => {

    const handleMessage = (event: any) => {

      try {
        const message = JSON.parse(event.data);
        if (message.type === "SAY_SON_GOKU") {
          setAuthState({
            loading: false,
            authenticated: true,
            user: null,
            token: null,
            goalData: message.payload
          })
        }
      } catch (error) {
        console.error("Ha ocurrido un error capturando la información del bolsillo");
      }
    };

    document.addEventListener(
      "message",
      handleMessage
    );

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "READY",
      })
    );

    return () => {
      document.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, []);

  if (authState.loading) {
    return (
      <div style={styles.container}>
        <h3>Iniciando Handshake Seguro con Shell Nativo...</h3>
        <pre>{JSON.stringify(authState, null, 2)}</pre>
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
    <GoalDetailScreen 
      name={authState?.goalData?.name || ""}
      currentAmount={authState?.goalData?.currentAmount || 0}
      targetAmount={authState?.goalData?.targetAmount || 0}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' },
  card: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: 16, borderRadius: 8 },
  code: { display: 'block', padding: 8, background: '#0f172a', color: '#38bdf8', borderRadius: 4, wordBreak: 'break-all', fontSize: 12 }
};