import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GameSetupProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  onStartGame: (count: number) => void;
}

export function GameSetup({ playerCount, setPlayerCount, onStartGame }: GameSetupProps) {
  const [inputValue, setInputValue] = useState(playerCount.toString());

  const handleStartGame = () => {
    const count = parseInt(inputValue);
    if (count >= 4 && count <= 10) {
      setPlayerCount(count);
      onStartGame(count);
    }
  };

  const isValidCount = () => {
    const count = parseInt(inputValue);
    return count >= 4 && count <= 10;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={40} color="#3b82f6" />
            </View>
            <Text style={styles.title}>MrWhitey</Text>
            <Text style={styles.subtitle}>The ultimate word guessing game</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Number of Players</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholder="Enter number of players (4-10)"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.hint}>Minimum 4, Maximum 10 players</Text>

            <TouchableOpacity
              style={[styles.button, !isValidCount() && styles.buttonDisabled]}
              onPress={handleStartGame}
              disabled={!isValidCount()}
            >
              <Ionicons name="play" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rules}>
            <Text style={styles.rulesTitle}>How to Play:</Text>
            <Text style={styles.ruleText}>• Each player picks a card to see their secret word</Text>
            <Text style={styles.ruleText}>• Most players get the same word, one gets a different word</Text>
            <Text style={styles.ruleText}>• Discuss and guess who has the different word</Text>
            <Text style={styles.ruleText}>• Reveal to see who was Mr. White!</Text>
            <Text style={styles.signature}>Namatha🤙</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#dbeafe',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rules: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  ruleText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  signature: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
  },
});