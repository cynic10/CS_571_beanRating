import React from 'react';

import './App.css';
import RankingTable from './components/RankingTable/RankingTable';
// import RadarChart from './components/RadarChart/RadarChart';

function App() {
  return (
    <div className="App">
      <h1 className="site-title">Coffee Bean Rating</h1>
      <RankingTable />
  </div>  
  );
}


export default App;
