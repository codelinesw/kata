// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import React, { useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/infrastructure/store/store';
import { HomeScreen } from './src/presentation/screens/home/home-screen';
import { StyleSheet, Platform } from 'react-native';
import { WebAppContainerComponent } from './src/presentation/components/web-app-container/web-app-container-component';
import { sendToWeb } from './src/bridge/BridgeHandler';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  
  const webViewRef = useRef<WebView | null>(null);

  // En Android el emulador usa 10.0.2.2 para mapear el localhost de la máquina
  const WEB_APP_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5173' : 'http://localhost:5173';

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
        {!selectedGoalId ? (
          <HomeScreen onSelectGoal={(id) => setSelectedGoalId(id)} />
        ) : (
          <WebAppContainerComponent 
            webUrl={WEB_APP_URL}
            webViewRef={webViewRef} 
            goalId={selectedGoalId} 
            onBack={() => setSelectedGoalId(null)}
          />
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  webViewContainer: { flex: 1 }
});