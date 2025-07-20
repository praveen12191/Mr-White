import React from 'react';
import { Player } from '../types/game';
import { Eye, EyeOff } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  cardNumber: number;
  onClick: () => void;
  isSelected: boolean;
}

export function PlayerCard({ player, cardNumber, onClick, isSelected }: PlayerCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative h-32 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isSelected ? 'ring-4 ring-blue-500 scale-105' : ''}
        ${player.hasSeenWord 
          ? 'bg-gradient-to-br from-green-400 to-green-600 cursor-not-allowed' 
          : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        }
      `}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {player.hasSeenWord ? (
          <>
            <Eye className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">{player.name}</span>
          </>
        ) : (
          <>
            <EyeOff className="w-8 h-8 mb-2" />
            <span className="text-lg font-bold">Card {cardNumber}</span>
          </>
        )}
      </div>
      
      {/* Card pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-xl" />
      </div>
    </div>
  );
}