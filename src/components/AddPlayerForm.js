import React, { useState } from 'react';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [advantage, setAdvantage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAddPlayer({
      name: name.trim(),
      advantage: parseInt(advantage) || 0,
      balance: 0
    });
    
    setName('');
    setAdvantage(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Agregar Jugador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ventaja Inicial</label>
          <input
            type="number"
            value={advantage}
            onChange={(e) => setAdvantage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Puede ser positivo o negativo"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Agregar Jugador
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;