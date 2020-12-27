import React, { useEffect, useState } from 'react';
import './App.css';
import { ContextData, DataPoint } from './types/dataTypes';
import { DataContext } from './context/data';
import { apiGetData } from './api/data';
import LatestByTag from './components/LatestByTag';
import Updated from './components/Updated';
import styled from 'styled-components'
import Temperature from './components/Temperature';
import { sortByTime } from './utils';


const Footer = styled.footer`
  position:absolute;
  bottom: 0;
  left: 20px;
`;

function App() {

  const [data, setData] = useState<ContextData | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(15000);

  function getData() {

    apiGetData()
      .then(json => {
        setData({
          updated: new Date().toLocaleString('fi-FI'),
          dataPoints: sortByTime(json.Items, 'desc')
        })
      })
  }

  useEffect(() => {
    if (!data) {
      getData()
    }
  }, [data])

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(getData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);


  return (
    <DataContext.Provider value={data}>
      <div className="App">
        <LatestByTag name="Olohuone" />
        <Temperature />
      </div>
      <Footer>
        <Updated />
      </Footer>
    </DataContext.Provider>
  );
}

export default App;
