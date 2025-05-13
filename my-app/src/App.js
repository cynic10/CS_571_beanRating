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
            <img src="/image/coffee-bean.png" alt="Coffee Bean" className="bean-icon" />
            <h1 className="site-title">beanRating</h1>
          </div>
          <nav className="header-links">
            <a href="https://github.com/cynic10/CS_571_beanRating" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.youtube.com/watch?v=uo2VmsI0Cgw" target="_blank" rel="noreferrer">Screencast</a>
          </nav>
        </div>
      </header>

      <div className="site-description">
        <p>
          Visualization of coffee bean ratings and productions across countries and regions. Data were gathered{' '}
          <a href="https://www.kaggle.com/datasets/mexwell/coffee-beans-rating" target="_blank" rel="noreferrer">here</a>.
        </p>
      </div>

      <div className="ranking-radar-section">
        <div className="ranking-container">
          <RankingTable />
          <p className="viz-description">
            A sortable table listing coffee bean ratings and production totals by country and year.
          </p>
        </div>
        <div className="radar-container">
          <RadarChart />
          <p className="viz-description">
            A radar chart comparing sensory attributes of coffee beans across countries for the selected year.
          </p>
        </div>
      </div>

      <div className="line-bar-section">
        <div className="bar-container">
          <StackedBarChart />
          <p className="viz-description">
            A stacked bar chart showing scoring composition of top 5 scoring countries over the years.
          </p>
        </div>
        <div className="line-container">
          <LineGraph />
          <p className="viz-description">
            A line graph illustrating trends in average coffee bean ratings across years.
          </p>
        </div>
      </div>

      <footer className="site-footer">
        <p>© The beanRating Team | Riya Deshpande, Phuong Nguyen, Kevin Dao</p>
      </footer>
    </div>
  );
}

export default App;
