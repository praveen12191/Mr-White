import React from 'react';
import { Users, Play } from 'lucide-react';

interface GameSetupProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  onStartGame: (count: number) => void;
}

export function GameSetup({ playerCount, setPlayerCount, onStartGame }: GameSetupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerCount >= 4 && playerCount <= 10) {
      onStartGame(playerCount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MrWhitey</h1>
          <p className="text-gray-600">The ultimate word guessing game</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerCount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Players
            </label>
            <input
              type="number"
              id="playerCount"
              min="4"
              max="10"
              value={playerCount}
              onChange={(e) => setPlayerCount(parseInt(e.target.value) || 4)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter number of players (4-10)"
            />
            <p className="text-sm text-gray-500 mt-1">Minimum 4, Maximum 10 players</p>
          </div>

          <button
            type="submit"
            disabled={playerCount < 4 || playerCount > 10}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Each player picks a card to see their secret word</li>
            <li>• Most players get the same word, one gets a different word</li>
            <li>• Discuss and guess who has the different word</li>
            <li>• Reveal to see who was Mr. White!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}