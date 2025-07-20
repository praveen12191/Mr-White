import React from 'react';
import { useGame } from './hooks/useGame';
import { GameSetup } from './components/GameSetup';
import { CardPicking } from './components/CardPicking';
import { Discussion } from './components/Discussion';

function App() {
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
        />
      );
    
    default:
      return null;
  }
}

export default App;