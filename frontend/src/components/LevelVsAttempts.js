import { useEffect, useRef } from "react";
import * as d3 from "d3";

const LevelVsAttempts = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Dimensions of the chart
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f0f0f0");

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.level))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.attempts)])
      .range([height, 0]);

    // Define line generator
    const line = d3
      .line()
      .x((d) => xScale(d.level) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.attempts));

    // Append the line to the chart
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .attr("text-anchor", "middle")
      .text("Levels");

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .attr("dy", ".7em")
      .attr("text-anchor", "middle")
      .text("Avg. No. of attempts");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.level) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.attempts))
      .attr("r", 4)
      .style("fill", "orange");
  }, []);

  return <div ref={chartRef}></div>;
};

export default LevelVsAttempts;
