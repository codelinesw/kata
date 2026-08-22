import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { handleWebMessage } from '../../../bridge/BridgeHandler';
//Styles
import { styles } from './web-app-container-style';
import { useWebAppContainerViewModel } from './web-app-container-view-model';

interface WebAppContainerProps {
  webUrl: string;
  // Usamos el tipo exacto de RefObject que acepta WebView
  webViewRef: React.RefObject<any>;
  goalId: string;
  onBack: () => void;
}

export const WebAppContainerComponent: React.FC<WebAppContainerProps> = ({ webUrl, webViewRef, goalId, onBack }) => {
  const viewModel = useWebAppContainerViewModel(webViewRef, goalId);
  console.log(" bolsillo seleccionado :: ", viewModel.goal);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{viewModel.goal?.name || ""}</Text>
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: webUrl }}
        onMessage={viewModel.handleWebMessage}
        onLoadEnd={viewModel.sendUserToWeb}
        originWhitelist={['*']}
      />
    </View>
  );
};