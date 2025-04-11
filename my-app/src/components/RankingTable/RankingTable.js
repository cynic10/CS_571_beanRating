import React, { useState, useEffect } from 'react';
import './RankingTable.css';
import Papa from 'papaparse';

const RankingTable = () => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('/data.csv')
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });
        setData(parsed.data);
      });
  }, []);

  const handleSort = (column) => {
    const isAsc = column === sortColumn ? !sortAsc : true;
    const sorted = [...data].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortAsc(isAsc);
    setData(sorted);
  };

  if (data.length === 0) return <div className="ranking-table">Loading...</div>;

  const columns = Object.keys(data[0]);

  return (
    <div className="ranking-table">
      <h2>Ranking Table</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                {col} {sortColumn === col ? (sortAsc ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
