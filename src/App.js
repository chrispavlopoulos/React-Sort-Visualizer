import React from 'react';
import logo from './logo.svg';
import './App.css';
import Array from './components/Array.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Array array={[1, 2, 3, 4, 5, 6, 7]} />
        
      </header>
    </div>
  );
}

export default App;
