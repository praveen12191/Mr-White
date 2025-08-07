import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Player } from '../types/game';

interface DiscussionProps {
  players: Player[];
  onCardCheck: (playerId: string) => void;
  checkedCards: Set<string>;
  currentWordPair: { normal: string; mrWhite: string };
  onNewGame: () => void;
}

export function Discussion({ players, onCardCheck, checkedCards, currentWordPair, onNewGame }: DiscussionProps) {
  const remainingPlayers = players.filter(player => !checkedCards.has(player.id));
  const mrWhiteFound = players.some(player => checkedCards.has(player.id) && player.isMrWhite);
  const mrWhitePlayer = players.find(player => player.isMrWhite);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="chatbubbles" size={32} color="#10b981" />
          </View>
          <Text style={styles.title}>Discussion Phase</Text>
          <Text style={styles.subtitle}>
            {mrWhiteFound 
              ? "🎉 Mr. White has been found!" 
              : "Discuss and tap a player's card to guess who is Mr. White!"
            }
          </Text>
        </View>

        {!mrWhiteFound && remainingPlayers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="people" size={20} color="#1f2937" /> Tap to Guess Mr. White
            </Text>
            <View style={styles.playersGrid}>
              {remainingPlayers.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={styles.playerCard}
                  onPress={() => onCardCheck(player.id)}
                >
                  <View style={styles.playerIcon}>
                    <Ionicons name="help" size={24} color="#6b7280" />
                  </View>
                  <Text style={styles.playerName}>{player.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {checkedCards.size > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Checked Players</Text>
            <View style={styles.playersGrid}>
              {players.filter(player => checkedCards.has(player.id)).map((player) => (
                <View
                  key={player.id}
                  style={[
                    styles.checkedCard,
                    player.isMrWhite ? styles.mrWhiteCard : styles.notMrWhiteCard
                  ]}
                >
                  <View style={[
                    styles.checkedIcon,
                    player.isMrWhite ? styles.mrWhiteIcon : styles.notMrWhiteIcon
                  ]}>
                    <Ionicons
                      name={player.isMrWhite ? "crown" : "close"}
                      size={24}
                      color={player.isMrWhite ? "#dc2626" : "#6b7280"}
                    />
                  </View>
                  <Text style={styles.checkedPlayerName}>{player.name}</Text>
                  <Text style={[
                    styles.checkedPlayerStatus,
                    player.isMrWhite ? styles.mrWhiteStatus : styles.notMrWhiteStatus
                  ]}>
                    {player.isMrWhite ? '👑 Mr. White!' : '❌ Not Mr. White'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {mrWhiteFound && (
          <View style={styles.winSection}>
            <View style={styles.winHeader}>
              <View style={styles.winIcon}>
                <Ionicons name="trophy" size={40} color="#10b981" />
              </View>
              <Text style={styles.winTitle}>Game Complete!</Text>
              <Text style={styles.winSubtitle}>Mr. White has been successfully identified!</Text>
            </View>

            <View style={styles.wordsReveal}>
              <Text style={styles.wordsTitle}>Game Words Revealed:</Text>
              <View style={styles.wordsContainer}>
                <View style={styles.normalWordCard}>
                  <Text style={styles.wordCardTitle}>Normal Players' Word:</Text>
                  <Text style={styles.wordCardText}>{currentWordPair.normal}</Text>
                </View>
                <View style={styles.mrWhiteWordCard}>
                  <Text style={styles.wordCardTitle}>Mr. White's Word:</Text>
                  <Text style={styles.wordCardText}>{currentWordPair.mrWhite}</Text>
                </View>
              </View>
              {mrWhitePlayer && (
                <View style={styles.mrWhiteInfo}>
                  <Text style={styles.mrWhiteInfoText}>
                    <Text style={styles.bold}>{mrWhitePlayer.name}</Text> was Mr. White with the word "{currentWordPair.mrWhite}"
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.congratulations}>
              <Text style={styles.congratulationsText}>
                🎉 Congratulations! You found Mr. White!
              </Text>
            </View>
          </View>
        )}

        <View style={styles.rulesSection}>
          <Text style={styles.rulesTitle}>
            <Ionicons name="information-circle" size={20} color="#1f2937" /> Game Rules
          </Text>
          <View style={styles.rulesList}>
            <Text style={styles.ruleText}>• Most players have the <Text style={styles.bold}>same word</Text></Text>
            <Text style={styles.ruleText}>• One player (Mr. White) has a <Text style={styles.bold}>different but related word</Text></Text>
            <Text style={styles.ruleText}>• Discuss your words without revealing them directly</Text>
            <Text style={styles.ruleText}>• Tap on a player's card to guess if they are Mr. White</Text>
            <Text style={styles.ruleText}>• Wrong guesses will eliminate that player from the cards</Text>
            <Text style={styles.ruleText}>• Find Mr. White to win the game!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.newGameButton} onPress={onNewGame}>
          <Text style={styles.newGameButtonText}>New Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#dcfce7',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  playerCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
  },
  playerIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  checkedCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
    borderWidth: 2,
  },
  mrWhiteCard: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  notMrWhiteCard: {
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
  },
  checkedIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mrWhiteIcon: {
    backgroundColor: '#fee2e2',
  },
  notMrWhiteIcon: {
    backgroundColor: '#f3f4f6',
  },
  checkedPlayerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  checkedPlayerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  mrWhiteStatus: {
    color: '#dc2626',
  },
  notMrWhiteStatus: {
    color: '#6b7280',
  },
  winSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  winHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  winIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#dcfce7',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  winTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  winSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  wordsReveal: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  wordsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  wordsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  normalWordCard: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  mrWhiteWordCard: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  wordCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  wordCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  mrWhiteInfo: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 8,
    padding: 12,
  },
  mrWhiteInfoText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  congratulations: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 16,
  },
  congratulationsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    textAlign: 'center',
  },
  rulesSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rulesList: {
    gap: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  newGameButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});