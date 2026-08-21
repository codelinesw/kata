import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { handleWebMessage } from '../../../bridge/BridgeHandler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@infrastructure/store/store';
//Styles
import { styles } from './web-app-container-style';

interface WebAppContainerProps {
  webUrl: string;
  // Usamos el tipo exacto de RefObject que acepta WebView
  webViewRef: React.RefObject<any>;
  goalId: string;
  onBack: () => void;
}

export const WebAppContainer: React.FC<WebAppContainerProps> = ({ webUrl, webViewRef, goalId, onBack }) => {
  const dispatch = useDispatch();

  // Leemos la meta actual directamente de Redux
  const goal = useSelector((state: RootState) =>
    state.savings.goals.find((g) => g.id === goalId)
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver a Metas</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{goal?.name || ""}</Text>
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: webUrl }}
        onMessage={(event: any) => {
          // Validamos que webViewRef esté definido antes de pasar el evento
          if (webViewRef) {
            handleWebMessage(event, webViewRef);
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={['*']}
      />
    </View>
  );
};