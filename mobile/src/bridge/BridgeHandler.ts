import { RefObject } from 'react';
import { Alert } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { BridgeMessage, NativeMessageType, BridgeMessagePayload } from '../types/bridge';
import { AppDispatch, RootState } from '../infrastructure/store/store';
import { addDeposit } from '../presentation/storage/savingsSlice';
import { DepositRequestPayload } from '../domain/interfaces/BridgeContact';
import { isGoalCompleted } from '../domain/entities/SavingsGoal';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

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
        //sendToWeb(webViewRef, 'HU01_SESSION_RESPONSE', mockSession);
        break;
      case 'REQUEST_TOKEN':
        // sendToWeb(webViewRef, 'RESPONSE_TOKEN' as NativeMessageType, {
        //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_payload',
        // });
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

export const handleIncomingBridgeMessage = async (
  rawMessage: string,
  dispatch: AppDispatch,
  getState: () => RootState
): Promise<BridgeMessage | null> => {
  try {
    const message: BridgeMessage = JSON.parse(rawMessage);

    switch (message.type) {

      case 'HU01_INIT_SESSION':
        console.log('[Native Shell TS] Procesando Handshake HU01...');

        // Simulamos la respuesta de credenciales guardadas en el dispositivo
        return {
          type: 'HU01_INIT_SESSION',
          payload: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2V2aW4ifQ',
              title: "",
              success: true,
              message: "",
              requestedBy: "",
              goalId: "",
              amount: 0
          },
        };

        // Enviamos la respuesta de vuelta a la Web
        //sendToWeb(webViewRef, 'HU01_SESSION_RESPONSE', mockSession);
        
      case 'REQUEST_TOKEN':
        // sendToWeb(webViewRef, 'RESPONSE_TOKEN' as NativeMessageType, {
        //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_payload',
        // });
          return null;
        break;

      case 'DEPOSIT_REQUEST': {
        const payload = message.payload as DepositRequestPayload;
        if (!payload?.goalId || !payload?.amount || payload.amount <= 0) {
          throw new Error('Payload de abono inválido');
        }

        // 1. Actualizar Redux (HU03)
        dispatch(addDeposit({ goalId: payload.goalId, amount: payload.amount }));

        // 2. Verificar si alcanzó el 100% para disparar HU04 (Librería Nativa)
        const updatedGoal = getState().savings.goals.find((g) => g.id === payload.goalId);
        if (updatedGoal && isGoalCompleted(updatedGoal)) {
          try {
            //await notifyGoalCompleted(updatedGoal.name);
          } catch (e) {
            console.warn('Error notificando módulo nativo:', e);
          }
        }

        return {
          type: 'DEPOSIT_SUCCESS_RESPONSE',
          payload: {
            success: true,
            goalId: payload.goalId,
            amount: updatedGoal?.currentAmount,
          },
        };
      }

      default:
        console.warn('Tipo de mensaje no reconocido:', message.type);
        return null;
    }
  } catch (error) {
    console.error('Error parseando mensaje de WebView:', error);
    return null;
  }
};

export const sendToWeb = (
  webViewRef: RefObject<WebView | null>,
  type: NativeMessageType,
  payload: BridgeMessagePayload = {
    goalId: ''
  }
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