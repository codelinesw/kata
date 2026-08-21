export type NativeMessageType = 'HU01_INIT_SESSION' | 'REQUEST_TOKEN' | 'HU01_SESSION_RESPONSE' | 'SHOW_ALERT' | 'NATIVE_PING';

export interface BridgeMessagePayload {
  token?: string;
  title?: string;
  message?: string;
  requestedBy?: string;
}

export interface BridgeMessage {
  type: NativeMessageType;
  payload?: BridgeMessagePayload;
}