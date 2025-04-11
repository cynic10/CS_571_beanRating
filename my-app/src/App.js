import React from 'react';

import logo from './logo.svg';
import './App.css';
import RankingTable from './components/RankingTable/RankingTable';

function App() {
  return (
    <div className="App">
      <h1 className="site-title">Coffee Bean Rating</h1>
      <RankingTable />
    </div>
  );
}


export default App;
