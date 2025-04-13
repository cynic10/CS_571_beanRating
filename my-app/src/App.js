import React from 'react';
import './App.css';
import RankingTable from './components/RankingTable/RankingTable';
import RadarChart from './components/RadarChart/RadarChart';
import LineGraph from './components/LineGraph/LineGraph';

function App() {
  return (
    <div className="App">
      <h1 className="site-title">Coffee Bean Rating</h1>
      <div className="ranking-radar-container">
        <RankingTable />
        <RadarChart />
      </div>
      <div className="linegraph-container">
        <LineGraph />
      </div>
    </div>
  );
}

export default App;
