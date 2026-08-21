import { RefObject } from 'react';
import { Alert } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { BridgeMessage, NativeMessageType, BridgeMessagePayload } from '../types/bridge';

export const handleWebMessage = (
  event: WebViewMessageEvent,
  webViewRef: RefObject<WebView | null>
): void => {
  try {
    const message: BridgeMessage = JSON.parse(event.nativeEvent.data);
    const { type, payload } = message;

    console.log('[Native Shell TS] Mensaje recibido:', type, payload);

    switch (type) {
      case 'HU01_INIT_SESSION':
        console.log('[Native Shell TS] Procesando Handshake HU01...');

        // Simulamos la respuesta de credenciales guardadas en el dispositivo
        const mockSession = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2V2aW4ifQ',
          user: { name: 'Kevin User', role: 'Premium Developer' },
        };

        // Enviamos la respuesta de vuelta a la Web
        sendToWeb(webViewRef, 'HU01_SESSION_RESPONSE', mockSession);
        break;
      case 'REQUEST_TOKEN':
        sendToWeb(webViewRef, 'RESPONSE_TOKEN' as NativeMessageType, {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_payload',
        });
        break;

      case 'SHOW_ALERT':
        Alert.alert(payload?.title || 'Nativo', payload?.message || '');
        break;

      default:
        console.warn('Tipo de evento no manejado:', type);
    }
  } catch (error) {
    console.error('Error procesando mensaje de WebView:', error);
  }
};

export const sendToWeb = (
  webViewRef: RefObject<WebView | null>,
  type: NativeMessageType,
  payload: BridgeMessagePayload = {}
): void => {
  if (webViewRef.current) {
    const dataString = JSON.stringify({ type, payload });
    const jsCode = `
      if (window.receiveFromNative) {
        window.receiveFromNative(${JSON.stringify(dataString)});
      }
      true;
    `;
    webViewRef.current.injectJavaScript(jsCode);
  }
};