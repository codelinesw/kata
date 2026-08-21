// Extendemos el objeto Window global para incluir las funciones del puente nativo
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    receiveFromNative?: (jsonString: string) => void;
  }
}

export type WebMessageType = 'HU01_INIT_SESSION';
export type NativeMessageType = 'HU01_SESSION_RESPONSE';

export interface WebMessagePayload {
  clientVersion?: string;
}

export interface UserSession {
  name: string;
  role: string;
}

export interface NativeMessagePayload {
  token?: string;
  user?: UserSession;
}

export interface BridgeMessage {
  type: WebMessageType | NativeMessageType;
  payload?: WebMessagePayload & NativeMessagePayload;
}