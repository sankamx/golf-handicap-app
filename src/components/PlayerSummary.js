import React from 'react';

const PlayerSummary = ({ players }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen Financiero</h2>
      <div className="space-y-3">
        {players.map(player => (
          <div key={player.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
            <div>
              <h3 className="font-medium text-gray-700">{player.name}</h3>
              <p className={`text-sm ${
                player.advantage > 0 ? 'text-red-600' : 
                player.advantage < 0 ? 'text-green-600' : 'text-gray-500'
              }`}>
                Ventaja: {player.advantage > 0 ? `+${player.advantage}` : player.advantage}
              </p>
            </div>
            <span className={`text-lg font-semibold ${
              player.balance > 0 ? 'text-green-600' : 
              player.balance < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {formatCurrency(player.balance)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSummary;