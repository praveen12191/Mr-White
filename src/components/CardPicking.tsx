import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Player } from '../types/game';

interface CardPickingProps {
  players: Player[];
  onPlayerUpdate: (playerId: string, name: string) => void;
  canStartGame: boolean;
  onStartDiscussion: () => void;
}

export function CardPicking({ players, onPlayerUpdate, canStartGame, onStartDiscussion }: CardPickingProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [showWord, setShowWord] = useState(false);

  const handleCardPress = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (player && !player.hasSeenWord) {
      setSelectedCard(playerId);
      setPlayerName('');
      setShowWord(false);
    }
  };

  const handleNameSubmit = () => {
    if (playerName.trim()) {
      setShowWord(true);
    } else {
      Alert.alert('Error', 'Please enter your name');
    }
  };

  const handleWordSeen = () => {
    if (selectedCard && playerName.trim()) {
      onPlayerUpdate(selectedCard, playerName.trim());
      setSelectedCard(null);
      setPlayerName('');
      setShowWord(false);
    }
  };

  const selectedPlayer = players.find(p => p.id === selectedCard);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Pick Your Card</Text>
          <Text style={styles.subtitle}>Each player should pick a card to see their secret word</Text>
        </View>

        <View style={styles.cardsGrid}>
          {players.map((player, index) => (
            <TouchableOpacity
              key={player.id}
              style={[
                styles.card,
                player.hasSeenWord ? styles.cardUsed : styles.cardAvailable,
                selectedCard === player.id && styles.cardSelected,
              ]}
              onPress={() => handleCardPress(player.id)}
              disabled={player.hasSeenWord}
            >
              <Ionicons
                name={player.hasSeenWord ? "eye" : "eye-off"}
                size={32}
                color={player.hasSeenWord ? "#10b981" : "#ffffff"}
              />
              <Text style={[
                styles.cardText,
                player.hasSeenWord ? styles.cardTextUsed : styles.cardTextAvailable
              ]}>
                {player.hasSeenWord ? player.name : `Card ${index + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>Players Joined:</Text>
          <View style={styles.playersList}>
            {players.filter(p => p.hasSeenWord).map((player) => (
              <View key={player.id} style={styles.playerItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
            ))}
            {players.filter(p => p.hasSeenWord).length === 0 && (
              <Text style={styles.noPlayersText}>No players have joined yet</Text>
            )}
          </View>
        </View>

        {canStartGame && (
          <TouchableOpacity style={styles.startButton} onPress={onStartDiscussion}>
            <Text style={styles.startButtonText}>Start Discussion</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        visible={selectedCard !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedCard(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {!showWord ? (
              <>
                <Text style={styles.modalTitle}>Enter Your Name</Text>
                <TextInput
                  style={styles.modalInput}
                  value={playerName}
                  onChangeText={setPlayerName}
                  placeholder="Your name"
                  placeholderTextColor="#9ca3af"
                  autoFocus
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButtonSecondary}
                    onPress={() => setSelectedCard(null)}
                  >
                    <Text style={styles.modalButtonSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButtonPrimary, !playerName.trim() && styles.modalButtonDisabled]}
                    onPress={handleNameSubmit}
                    disabled={!playerName.trim()}
                  >
                    <Text style={styles.modalButtonPrimaryText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Your Secret Word</Text>
                <View style={styles.wordContainer}>
                  <Text style={styles.wordText}>{selectedPlayer?.word}</Text>
                </View>
                <Text style={styles.wordHint}>Remember this word and keep it secret!</Text>
                <TouchableOpacity style={styles.gotItButton} onPress={handleWordSeen}>
                  <Text style={styles.gotItButtonText}>Got it!</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf4ff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardAvailable: {
    backgroundColor: '#3b82f6',
  },
  cardUsed: {
    backgroundColor: '#10b981',
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: '#1d4ed8',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  cardTextAvailable: {
    color: 'white',
  },
  cardTextUsed: {
    color: 'white',
  },
  playersSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  playersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  noPlayersText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  modalButtonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  wordContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  wordText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  wordHint: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  gotItButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  gotItButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});