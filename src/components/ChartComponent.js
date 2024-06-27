// src/components/ChartComponent.js
import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  const [options, setOptions] = useState({
    chart: {
      id: 'main-chart',
      type: 'line',
      zoom: {
        enabled: true,
      },
      events: {
        click: (event, chartContext, config) => {
          const { dataPointIndex } = config;
          if (dataPointIndex !== -1) {
            const point = data[dataPointIndex];
            alert(`Timestamp: ${point.timestamp}, Value: ${point.value}`);
          }
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
  });

  const series = [
    {
      name: 'Value',
      data: data.map((point) => ({
        x: new Date(point.timestamp).getTime(),
        y: point.value,
      })),
    },
  ];

  const setTimeframe = (timeframe) => {
    let newMin;
    let newMax;
    const now = new Date().getTime();
    switch (timeframe) {
      case 'daily':
        newMin = now - 24 * 60 * 60 * 1000;
        break;
      case 'weekly':
        newMin = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case 'monthly':
        newMin = now - 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        newMin = null;
        newMax = null;
        break;
    }
    newMax = now;
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        min: newMin,
        max: newMax,
      },
    }));
  };

  const exportChart = () => {
    ApexCharts.exec('main-chart', 'exportChart', {
      type: 'png',
      filename: 'chart',
    });
  };

  return (
    <div>
      <button onClick={() => setTimeframe('daily')}>Daily</button>
      <button onClick={() => setTimeframe('weekly')}>Weekly</button>
      <button onClick={() => setTimeframe('monthly')}>Monthly</button>
      <button onClick={exportChart}>Export as PNG</button>
      <Chart ref={chartRef} options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ChartComponent;
