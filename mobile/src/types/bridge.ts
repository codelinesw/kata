export type NativeMessageType = 'HU01_INIT_SESSION' | 'REQUEST_TOKEN' | 'HU01_SESSION_RESPONSE' | 'DEPOSIT_REQUEST' | 'DEPOSIT_SUCCESS_RESPONSE' | 'SHOW_ALERT' | 'NATIVE_PING';

export interface BridgeMessagePayload {
  token?: string;
  title?: string;
  success?: boolean;
  message?: string;
  requestedBy?: string;
  goalId: string;
  amount?: number
}

export interface BridgeMessage {
  type: NativeMessageType;
  payload?: BridgeMessagePayload;
}