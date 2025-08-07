import React from 'react';
import { useGame } from './hooks/useGame';
import { GameSetup } from './components/GameSetup';
import { CardPicking } from './components/CardPicking';
import { Discussion } from './components/Discussion';
import './App.css';

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
        <div className="App">
          <GameSetup
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            onStartGame={initializeGame}
          />
        </div>
      );
    
    case 'cardPicking':
      return (
        <div className="App">
          <CardPicking
            players={players}
            onPlayerUpdate={updatePlayerName}
            canStartGame={canStartGame()}
            onStartDiscussion={startDiscussion}
          />
        </div>
      );
    
    case 'discussion':
      return (
        <div className="App">
          <Discussion
            players={players}
            onCardCheck={checkCard}
            checkedCards={checkedCards}
            currentWordPair={currentWordPair}
          />
        </div>
      );
    
    default:
      return (
        <div className="App">
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
            </div>
          </div>
        </div>
      );
  }
}

export default App;