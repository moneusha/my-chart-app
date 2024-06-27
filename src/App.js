// src/App.js
import React, { useEffect, useState } from 'react';
import ChartComponent from './components/ChartComponent';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <h1>Chart Application</h1>
      {data.length > 0 ? <ChartComponent data={data} /> : <p>Loading data...</p>}
    </div>
  );
};

export default App;
