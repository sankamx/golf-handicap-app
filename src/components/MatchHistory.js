import React from 'react';

const MatchHistory = ({ matches, players }) => {
  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Desconocido';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de Partidas</h2>
      {matches.length === 0 ? (
        <p className="text-gray-500">No hay partidas registradas</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugador</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventaja</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map(match => (
                <tr key={match.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{match.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{getPlayerName(match.playerId)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {match.result === 'W' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Ganado</span>
                    ) : match.result === 'L' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Perdido</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Empatado</span>
                    )}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                    match.advantage > 0 ? 'text-red-600' : 
                    match.advantage < 0 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {match.advantage > 0 ? `+${match.advantage}` : match.advantage}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                    match.result === 'W' ? 'text-green-600' : 
                    match.result === 'L' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {match.result === 'W' ? '+' : match.result === 'L' ? '-' : ''}
                    {formatCurrency(match.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MatchHistory;