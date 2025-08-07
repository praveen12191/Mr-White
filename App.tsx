import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GameApp } from './src/GameApp';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GameApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});