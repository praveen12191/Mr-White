import React from 'react';
import { Player } from '../types/game';
import { MessageCircle, Eye, Users, Crown, X } from 'lucide-react';

interface DiscussionProps {
  players: Player[];
  onCardCheck: (playerId: string) => void;
  checkedCards: Set<string>;
  currentWordPair: { normal: string; mrWhite: string };
}

export function Discussion({ players, onCardCheck, checkedCards, currentWordPair }: DiscussionProps) {
  const remainingPlayers = players.filter(player => !checkedCards.has(player.id));
  const mrWhiteFound = players.some(player => checkedCards.has(player.id) && player.isMrWhite);
  const mrWhitePlayer = players.find(player => player.isMrWhite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussion Phase</h1>
          <p className="text-gray-600">
            {mrWhiteFound 
              ? "🎉 Mr. White has been found!" 
              : "Discuss and click on a player's card to guess who is Mr. White!"
            }
          </p>
        </div>

        {!mrWhiteFound && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Click a Player to Guess Mr. White
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {remainingPlayers.map((player) => (
                <div
                  key={player.id}
                  onClick={() => onCardCheck(player.id)}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 text-center cursor-pointer hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{player.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show checked players */}
        {checkedCards.size > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Checked Players</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {players.filter(player => checkedCards.has(player.id)).map((player) => (
                <div
                  key={player.id}
                  className={`rounded-lg p-4 text-center border-2 ${
                    player.isMrWhite 
                      ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-300' 
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    player.isMrWhite ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {player.isMrWhite ? (
                      <Crown className="w-6 h-6 text-red-600" />
                    ) : (
                      <X className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{player.name}</h3>
                  <p className={`text-sm font-medium ${
                    player.isMrWhite ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {player.isMrWhite ? '👑 Mr. White!' : '❌ Not Mr. White'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mrWhiteFound && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Crown className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Complete!</h2>
              <p className="text-gray-600 mb-4">Mr. White has been successfully identified!</p>
              
              {/* Show the words */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Words Revealed:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Normal Players' Word:</h4>
                    <p className="text-2xl font-bold text-green-700">{currentWordPair.normal}</p>
                  </div>
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Mr. White's Word:</h4>
                    <p className="text-2xl font-bold text-red-700">{currentWordPair.mrWhite}</p>
                  </div>
                </div>
                {mrWhitePlayer && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      <strong>{mrWhitePlayer.name}</strong> was Mr. White with the word "{currentWordPair.mrWhite}"
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  🎉 Congratulations! You found Mr. White!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Game Rules
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>• Most players have the <strong>same word</strong></p>
            <p>• One player (Mr. White) has a <strong>different but related word</strong></p>
            <p>• Discuss your words without revealing them directly</p>
            <p>• Click on a player's card to guess if they are Mr. White</p>
            <p>• Wrong guesses will eliminate that player from the cards</p>
            <p>• Find Mr. White to win the game!</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}