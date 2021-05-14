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
import Humidity from './components/Humidity';
import Battery from './components/Battery';
import Tags from './components/Tags';
import { Home } from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './components/Navigation';


const Footer = styled.footer`
    position: fixed;
    top: 0;
    padding-left: 10px;
    background-color: #484848;
    width: 100%;
`;

function App() {

  const [data, setData] = useState<ContextData | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(15000);

  function getData() {

    //   apiGetData(id)
    //     .then(json => {
    //       setData({
    //         updated: new Date().toLocaleString('fi-FI'),
    //         dataPoints: sortByTime(json.Items, 'desc')
    //       })
    //     })
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
      <Router>
        <div className="App">
          <Switch>
            <Route path="/hallinta">
              <Tags enableSave />
            </Route>
            <Route path="/sijainti">
              <p>sijainti</p>
            </Route>
            <Route path="/">
              <Tags />
            </Route>
          </Switch>
          <Navigation />
        </div>
      </Router>

      {/* <LatestByTag name="Sauna" />
        <Temperature name="Sauna"/>
        <Humidity name="Sauna"/>
        <Battery /> */}
    </DataContext.Provider>
  );
}

export default App;
