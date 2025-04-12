import React from 'react';

import logo from './logo.svg';
import './App.css';
import RankingTable from './components/RankingTable/RankingTable';
import LineGraph from './components/LineGraph/LineGraph';

function App() {
  return (
    <div className="App">
      <h1 className="site-title">Coffee Bean Rating</h1>
      <RankingTable />
      <LineGraph />
    </div>
  );
}


export default App;
