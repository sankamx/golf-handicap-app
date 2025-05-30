import React, { useState } from 'react';

const GolfPlayerList = ({ players, onSelectPlayer }) => {
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const togglePlayer = (playerId) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Jugadores</h2>
      <div className="space-y-2">
        {players.map(player => (
          <div key={player.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-3 hover:bg-gray-50 transition-colors"
              onClick={() => togglePlayer(player.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">{player.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  player.advantage > 0 ? 'bg-red-100 text-red-800' :
                  player.advantage < 0 ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {player.advantage > 0 ? `+${player.advantage}` : player.advantage}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedPlayer === player.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedPlayer === player.id && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Saldo:</span>
                  <span className={`text-sm font-medium ${
                    player.balance > 0 ? 'text-green-600' : 
                    player.balance < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(player.balance)}
                  </span>
                </div>
                <button
                  onClick={() => onSelectPlayer(player)}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
                >
                  Ver historial
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GolfPlayerList;