import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./LineGraph.css";

const LineGraph = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [yAxisOption, setYAxisOption] = useState("avgProduction");

  useEffect(() => {
    d3.csv("/datasets/line_graph_totalproduction_totalscores_by_countryandyear.csv").then((rows) => {
      const parsed = rows.map((d) => ({
        country: d[""] || d["Country"] || d[Object.keys(d)[0]].trim(),
        year: +d[Object.keys(d)[1]],
        avgProduction: +d[Object.keys(d)[2]],
        avgScore: +d[Object.keys(d)[3]],
      }));
      setData(parsed);
    });
  }, []);

  const countries = Array.from(new Set(data.map((d) => d.country)));

  const filteredData =
    selectedCountry === "All"
      ? data
      : data.filter((d) => d.country === selectedCountry);

  const dataByYear = Array.from(
    d3.group(filteredData, (d) => d.year),
    ([year, values]) => ({
      year: +year,
      value: d3.mean(values, (d) => d[yAxisOption]),
    })
  ).sort((a, b) => a.year - b.year);

  // Dimensions
  const width = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataByYear, (d) => d.year))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataByYear, (d) => d.value) * 0.95,
      d3.max(dataByYear, (d) => d.value) * 1.05,
    ])
    .range([height - margin.bottom, margin.top]);

  return (
    <div className="line-graph-container">
      <h2>Line Graph</h2>
      <div className="controls">
        
        <label>
          Country:
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="All">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>

        <label>
          Y-axis:
          <select value={yAxisOption} onChange={(e) => setYAxisOption(e.target.value)}>
            <option value="avgProduction">Average Production</option>
            <option value="avgScore">Average Score</option>
          </select>
        </label>
      </div>

      <svg width={width} height={height}>
        {/* X Axis */}
        {xScale.ticks().map((tick) => (
          <text
            key={tick}
            x={xScale(tick)}
            y={height - 5}
            fontSize="10"
            textAnchor="middle"
          >
            {tick}
          </text>
        ))}

        {/* Y Axis */}
        {yScale.ticks(5).map((tick) => (
          <text
            key={tick}
            x={margin.left - 10}
            y={yScale(tick)}
            fontSize="10"
            textAnchor="end"
            alignmentBaseline="middle"
            
          >
            {tick.toFixed(1)}
          </text>
        ))}

        {/* Line Path */}
        <path
          fill="none"
          stroke="#4e342e"
          strokeWidth="2"
          d={d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.value))
            .curve(d3.curveMonotoneX)(dataByYear)}
        />
      </svg>
    </div>
  );
};

export default LineGraph;
