// src/components/RadarChart/RadarChart.js

import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    Papa.parse(process.env.PUBLIC_URL + '/data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data;
        if (!data || data.length === 0) return;

        const allColumns = Object.keys(data[0]);
        const attributes = allColumns.filter((col) => col !== 'total_score' && col !== 'country');

        const labels = attributes;
        const datasets = data.map((row, i) => {
          const values = attributes.map((attr) => parseFloat(row[attr]) || 0);
          return {
            label: row.country || `Country ${i + 1}`,
            data: values,
            fill: true,
          };
        });

        setChartData({
          labels,
          datasets,
        });
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      },
    });
  }, []);

  if (!chartData) {
    return <div>Loading Radar Chart...</div>;
  }

  // Configure the chart’s appearance and scale
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 3000, // Set a reasonable upper bound, or adjust based on your data
      },
    },
    plugins: {
      legend: {
        position: 'top', // 'top', 'bottom', 'left', 'right'
      },
    },
  };

  return (
    <div
      style={{
        width: '600px',
        height: '600px',
        margin: '0 auto', // center the chart
      }}
    >
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
