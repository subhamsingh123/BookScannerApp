import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet ,Text} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'scanner'>('home');

  const handleNavigateToScanner = () => {
    setCurrentScreen('scanner');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Hello World</Text> */}
      <StatusBar 
        style={Platform.OS === 'ios' ? 'dark' : 'auto'} 
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : undefined}
      />
      {currentScreen === 'home' ? (
        <HomeScreen onNavigateToScanner={handleNavigateToScanner} />
      ) : (
        <ScannerScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
