import React from 'react';
import './App.css';
import RankingTable from './components/RankingTable/RankingTable';
import RadarChart from './components/RadarChart/RadarChart';
import LineGraph from './components/LineGraph/LineGraph';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';

function App() {
  return (
    <div className="App">
      <header className="site-header">
        <div className="header-content">
          <div className="brand">
            <img
              src="/image/coffee-bean.png"
              alt="Coffee Bean"
              className="bean-icon"
            />
            <h1 className="site-title">beanRating</h1>
          </div>
          <nav className="header-links">
            <a href="https://github.com/cynic10/CS_571_beanRating" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.youtube.com/watch?v=uo2VmsI0Cgw" target="_blank" rel="noreferrer">Screencast</a>
          </nav>
        </div>
      </header>

      <div className="ranking-radar-section">
        <div className="ranking-container">
          <RankingTable />
        </div>
        <div className="radar-container">
          <RadarChart />
        </div>
      </div>

      <div className="line-bar-section">
        <div className="bar-container">
          <StackedBarChart />
        </div>
        <div className="line-container">
          <LineGraph />
        </div>
      </div>

      <footer className="site-footer">
        <p>© The beanRating Team | Riya Deshpande, Phuong Nguyen, Kevin Dao</p>
      </footer>
    </div>
  );
}

export default App;
