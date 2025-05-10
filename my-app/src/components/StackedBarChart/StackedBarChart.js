import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const categories = ['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity', 'Sweetness', 'Moisture'];

const StackedBarChart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    d3.csv("/datasets/preprocessed_stacked_data_with_year.csv").then(rows => {
      const parsed = rows.map(d => ({
        year: +d.Year,
        country: d.Country,
        ...categories.reduce((acc, cat) => {
          acc[cat] = +d[cat];
          return acc;
        }, {})
      }));
      setData(parsed);
      const years = [...new Set(parsed.map(d => d.year))].sort();
      setSelectedYear(years[0]);
    });
  }, []);

  const filteredDataFull = data.filter(d => d.year === selectedYear);
  const top5Data = filteredDataFull
    .map(d => ({
      ...d,
      totalScore: categories.reduce((sum, cat) => sum + d[cat], 0)
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5);

  const barWidth = 100;
  const barGap = 20;
  const totalBarSpace = barWidth + barGap;
  const width = 5 * totalBarSpace + 60 + 20;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(top5Data, d => d.totalScore)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);

  const stackGenerator = d3.stack().keys(categories);
  const layers = stackGenerator(top5Data);

  const years = [...new Set(data.map(d => d.year))].sort();

  return (
    <div className="stacked-bar-chart-container">
      <h2>Top 5 Countries' Score Composition</h2>
      
      <div className="controls">
        <label>
          Year:
          <select value={selectedYear || ""} onChange={(e) => setSelectedYear(+e.target.value)}>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </label>
      </div>

      <div className="stacked-bar-chart-scroll-wrapper">
        <svg width={width} height={height}>
          {layers.map((layer, i) =>
            layer.map(([y0, y1], j) => (
              <rect
                key={`${i}-${j}`}
                x={margin.left + j * totalBarSpace}
                y={yScale(y1)}
                height={yScale(y0) - yScale(y1)}
                width={barWidth}
                fill={color(layer.key)}
              />
            ))
          )}
          {top5Data.map((d, i) => (
            <text
              key={i}
              x={margin.left + i * totalBarSpace + barWidth / 2}
              y={height - 5}
              textAnchor="middle"
              fontSize="10"
            >
              {d.country}
            </text>
          ))}
          {yScale.ticks(5).map((tick, i) => (
            <text
              key={i}
              x={margin.left - 5}
              y={yScale(tick)}
              textAnchor="end"
              alignmentBaseline="middle"
              fontSize="10"
            >
              {tick.toFixed(1)}
            </text>
          ))}
        </svg>
      </div>

      <div className="legend">
        {categories.map(cat => (
          <div key={cat} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: color(cat) }}></span>
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;
