import React, { useState } from 'react';
import { Player } from '../types/game';
import { PlayerCard } from './PlayerCard';
import { ArrowRight, Eye } from 'lucide-react';

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

  const handleCardClick = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (player && !player.hasSeenWord) {
      setSelectedCard(playerId);
      setPlayerName('');
      setShowWord(false);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && selectedCard) {
      setShowWord(true);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pick Your Card</h1>
          <p className="text-gray-600">Each player should pick a card to see their secret word</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {players.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              cardNumber={index + 1}
              onClick={() => handleCardClick(player.id)}
              isSelected={selectedCard === player.id}
            />
          ))}
        </div>

        {/* Player List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Players Joined:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {players.filter(p => p.hasSeenWord).map((player) => (
              <div key={player.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">{player.name}</span>
              </div>
            ))}
          </div>
          {players.filter(p => p.hasSeenWord).length === 0 && (
            <p className="text-gray-500 text-sm">No players have joined yet</p>
          )}
        </div>

        {canStartGame && (
          <div className="text-center">
            <button
              onClick={onStartDiscussion}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              Start Discussion
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal for name input and word display */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              {!showWord ? (
                <form onSubmit={handleNameSubmit}>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Name</h3>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCard(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!playerName.trim()}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Secret Word</h3>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold py-6 px-4 rounded-lg mb-6">
                    {selectedPlayer?.word}
                  </div>
                  <p className="text-gray-600 mb-6">Remember this word and keep it secret!</p>
                  <button
                    onClick={handleWordSeen}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}