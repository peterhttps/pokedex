import React from 'react';
import './styles.css';
import Pokedex from './components/Pokedex';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <Pokedex />
    </div>
  );
}

export default App;
