import { useState } from 'react';
import { Player, GamePhase } from '../types/game';
import { getRandomWordPair } from '../data/wordPairs';

export function useGame() {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [currentWordPair, setCurrentWordPair] = useState(getRandomWordPair());
  const [checkedCards, setCheckedCards] = useState<Set<string>>(new Set());

  const initializeGame = (count: number) => {
    const wordPair = getRandomWordPair();
    setCurrentWordPair(wordPair);
    
    const mrWhiteIndex = Math.floor(Math.random() * count);
    const newPlayers: Player[] = [];

    for (let i = 0; i < count; i++) {
      newPlayers.push({
        id: `player-${i}`,
        name: '',
        word: i === mrWhiteIndex ? wordPair.mrWhite : wordPair.normal,
        isMrWhite: i === mrWhiteIndex,
        hasSeenWord: false
      });
    }

    setPlayers(newPlayers);
    setGamePhase('cardPicking');
  };

  const updatePlayerName = (playerId: string, name: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId ? { ...player, name, hasSeenWord: true } : player
    ));
  };

  const canStartGame = () => {
    return players.every(player => player.hasSeenWord && player.name.trim() !== '');
  };

  const startDiscussion = () => {
    setGamePhase('discussion');
  };

  const checkCard = (playerId: string) => {
    setCheckedCards(prev => new Set([...prev, playerId]));
  };

  const resetGame = () => {
    setPlayers([]);
    setGamePhase('setup');
    setPlayerCount(4);
    setCheckedCards(new Set());
  };

  return {
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
  };
}