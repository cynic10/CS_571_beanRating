import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './RadarChart.css';

const categories = ['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity', 'Sweetness', 'Moisture'];

const RadarChart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [visibleCountries, setVisibleCountries] = useState({});
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    d3.csv("/datasets/rankingTable_radarChart_dataset.csv").then(rows => {
      const parsed = rows.map(d => ({
        country: (d[""] || d["Country"] || d[Object.keys(d)[0]])?.trim(),
        year: +d[Object.keys(d)[1]],
        Aroma: +d["Aroma"],
        Flavor: +d["Flavor"],
        Aftertaste: +d["Aftertaste"],
        Acidity: +d["Acidity"],
        Body: +d["Body"],
        Balance: +d["Balance"],
        Uniformity: +d["Uniformity"],
        Sweetness: +d["Sweetness"],
        Moisture: +d["Moisture"],
        Total: +d["Total"]
      }));
      setData(parsed);
      const years = [...new Set(parsed.map(d => d.year))].sort();
      if (years.length) setSelectedYear(years[0]);
    });
  }, []);

  useEffect(() => {
    if (!data.length || selectedYear === null) return;
    const list = data.filter(d => d.year === selectedYear).map(d => d.country);
    const init = {};
    list.forEach(c => { init[c] = true; });
    setVisibleCountries(init);
  }, [data, selectedYear]);

  useEffect(() => {
    if (!data.length || selectedYear === null) return;
    const filtered = data.filter(d => d.year === selectedYear && visibleCountries[d.country]);
    const width = 500, height = 500, margin = 50, radius = Math.min(width, height) / 2 - margin, levels = 5;
    const angleSlice = (Math.PI * 2) / categories.length;
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl.attr("width", width).attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 10]);
    for (let i = 1; i <= levels; i++) {
      svg.append("circle")
        .attr("r", (radius / levels) * i)
        .style("fill", "none")
        .style("stroke", "#CDCDCD")
        .style("stroke-dasharray", "2,2");
    }
    categories.forEach((cat, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(10) * Math.cos(angle);
      const y = rScale(10) * Math.sin(angle);
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .style("stroke", "#CDCDCD")
        .style("stroke-width", "1px");
      svg.append("text")
        .attr("x", x * 1.1)
        .attr("y", y * 1.1)
        .attr("dy", "0.35em")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .text(cat);
    });
    const color = d3.scaleOrdinal().domain(filtered.map(d => d.country)).range(d3.schemeCategory10);
    const radarLine = d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveLinearClosed);
    d3.groups(filtered, d => d.country).forEach(([country, records]) => {
      const rec = records[0];
      const coords = categories.map((cat, i) => {
        let v = rec[cat];
        if (cat === "Moisture" && v < 1) v *= 100;
        const angle = angleSlice * i - Math.PI / 2;
        return [rScale(v) * Math.cos(angle), rScale(v) * Math.sin(angle)];
      });
      const startCoords = coords.map(() => [0, 0]);
      const path = svg.append("path")
        .datum(coords)
        .style("fill", color(country))
        .style("fill-opacity", 0.2)
        .style("stroke", color(country))
        .style("stroke-width", "2px");
      if (shouldAnimate) {
        path.attr("d", radarLine(startCoords))
          .transition().duration(1000)
          .attrTween("d", () => {
            const interp = d3.interpolate(startCoords, coords);
            return t => radarLine(interp(t));
          });
      } else {
        path.attr("d", radarLine(coords));
      }
      const circles = svg.selectAll(`.radar-circle-${country}`)
        .data(coords)
        .enter()
        .append("circle")
        .attr("r", 3)
        .style("fill", color(country));
      if (shouldAnimate) {
        circles.attr("cx", 0).attr("cy", 0)
          .transition().duration(1000)
          .attr("cx", d => d[0])
          .attr("cy", d => d[1]);
      } else {
        circles.attr("cx", d => d[0])
          .attr("cy", d => d[1]);
      }
    });
    if (shouldAnimate) setShouldAnimate(false);
  }, [data, selectedYear, visibleCountries, shouldAnimate]);

  const years = [...new Set(data.map(d => d.year))].sort((a, b) => a - b);
  const countriesForYear = data.filter(d => d.year === selectedYear);
  const sortedCountries = [...countriesForYear].sort((a, b) => b.Total - a.Total);
  const toggle = country => setVisibleCountries(s => ({ ...s, [country]: !s[country] }));
  const legendColor = d3.scaleOrdinal().domain(sortedCountries.map(d => d.country)).range(d3.schemeCategory10);

  return (
    <div className="radar-chart-container">
      <h2>Average Coffee Profile by Country and Year</h2>
      <div className="chart-and-legend">
        <svg ref={svgRef}></svg>
        <div className="legend-wrapper">
          <div className="legend-controls">
            <label htmlFor="year-select">Year:</label>
            <select
              id="year-select"
              value={selectedYear || ""}
              onChange={e => {
                setShouldAnimate(true);
                setSelectedYear(+e.target.value);
              }}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <h3>Countries</h3>
          <ul>
            {sortedCountries.map(({ country, Total }) => (
              <li key={country} onClick={() => toggle(country)} className={!visibleCountries[country] ? "disabled" : ""}>
                <span className="legend-color" style={{ backgroundColor: legendColor(country) }}></span>
                {country} ({Total})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
