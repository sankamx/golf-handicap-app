import React, { useState, useEffect } from 'react';
import players from './mock/players';
import initialMatches from './mock/matches';
import GolfPlayerList from './components/GolfPlayerList';
import AddPlayerForm from './components/AddPlayerForm';
import MatchForm from './components/MatchForm';
import MatchHistory from './components/MatchHistory';
import PlayerSummary from './components/PlayerSummary';

const App = () => {
  const [golfPlayers, setGolfPlayers] = useState(players);
  const [matches, setMatches] = useState(initialMatches);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState(initialMatches);

  useEffect(() => {
    const savedPlayers = localStorage.getItem('golfPlayers');
    const savedMatches = localStorage.getItem('golfMatches');
    
    if (savedPlayers) setGolfPlayers(JSON.parse(savedPlayers));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
  }, []);

  useEffect(() => {
    localStorage.setItem('golfPlayers', JSON.stringify(golfPlayers));
    localStorage.setItem('golfMatches', JSON.stringify(matches));
  }, [golfPlayers, matches]);

  useEffect(() => {
    if (selectedPlayer) {
      setFilteredMatches(matches.filter(match => match.playerId === selectedPlayer.id));
    } else {
      setFilteredMatches(matches);
    }
  }, [selectedPlayer, matches]);

  const handleAddPlayer = (newPlayer) => {
    const player = {
      ...newPlayer,
      id: golfPlayers.length > 0 ? Math.max(...golfPlayers.map(p => p.id)) + 1 : 1
    };
    setGolfPlayers([...golfPlayers, player]);
  };

  const handleAddMatch = (newMatch) => {
    const player = golfPlayers.find(p => p.id === newMatch.playerId);
    if (!player) return;

    let newAdvantage = player.advantage;
    if (newMatch.result === 'W') {
      newAdvantage -= 1;
    } else if (newMatch.result === 'L') {
      newAdvantage += 1;
    }

    const amount = newMatch.amount || 0;
    let newBalance = player.balance;
    if (newMatch.result === 'W') {
      newBalance += amount;
    } else if (newMatch.result === 'L') {
      newBalance -= amount;
    }

    const updatedMatch = {
      ...newMatch,
      id: matches.length > 0 ? Math.max(...matches.map(m => m.id)) + 1 : 1,
      advantage: newAdvantage,
      amount: amount
    };

    setMatches([...matches, updatedMatch]);

    setGolfPlayers(golfPlayers.map(p => 
      p.id === newMatch.playerId ? { 
        ...p, 
        advantage: newAdvantage,
        balance: newBalance
      } : p
    ));
  };

  const clearSelection = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Sistema de Golf con Ventaja</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <GolfPlayerList 
              players={golfPlayers} 
              onSelectPlayer={setSelectedPlayer} 
            />
            <AddPlayerForm onAddPlayer={handleAddPlayer} />
            <MatchForm 
              players={golfPlayers} 
              onSubmit={handleAddMatch} 
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <PlayerSummary players={golfPlayers} />
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedPlayer ? `Historial de ${selectedPlayer.name}` : 'Historial General'}
              </h2>
              {selectedPlayer && (
                <button
                  onClick={clearSelection}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ver todos
                </button>
              )}
            </div>
            <MatchHistory 
              matches={filteredMatches} 
              players={golfPlayers} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE