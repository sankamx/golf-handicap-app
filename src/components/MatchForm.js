import React, { useState } from 'react';

const MatchForm = ({ players, onSubmit }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('W');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlayerId || !date) return;
    
    onSubmit({
      playerId: parseInt(selectedPlayerId),
      date,
      result,
      amount: parseFloat(amount) || 0
    });
    
    setSelectedPlayerId('');
    setDate('');
    setResult('W');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Registrar Partida</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jugador</label>
          <select
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar jugador</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resultado</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="W"
                checked={result === 'W'}
                onChange={() => setResult('W')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Ganado (W)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="L"
                checked={result === 'L'}
                onChange={() => setResult('L')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Perdido (L)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="T"
                checked={result === 'T'}
                onChange={() => setResult('T')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Empatado (T)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej. 50.00"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Registrar Partida
        </button>
      </form>
    </div>
  );
};

export default MatchForm;