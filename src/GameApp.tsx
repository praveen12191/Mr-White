import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGame } from './hooks/useGame';
import { GameSetup } from './components/GameSetup';
import { CardPicking } from './components/CardPicking';
import { Discussion } from './components/Discussion';

export function GameApp() {
  const {
    playerCount,
    setPlayerCount,
    players,
    gamePhase,
    currentWordPair,
    initializeGame,
    updatePlayerName,
    canStartGame,
    startDiscussion,
    resetGame,
    checkCard,
    checkedCards
  } = useGame();

  const renderCurrentPhase = () => {
    switch (gamePhase) {
      case 'setup':
        return (
          <GameSetup
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            onStartGame={initializeGame}
          />
        );
      
      case 'cardPicking':
        return (
          <CardPicking
            players={players}
            onPlayerUpdate={updatePlayerName}
            canStartGame={canStartGame()}
            onStartDiscussion={startDiscussion}
          />
        );
      
      case 'discussion':
        return (
          <Discussion
            players={players}
            onCardCheck={checkCard}
            checkedCards={checkedCards}
            currentWordPair={currentWordPair}
            onNewGame={resetGame}
          />
        );
      
      default:
        return <View style={styles.container} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentPhase()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
});