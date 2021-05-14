import React, { useEffect, useState } from 'react';
import './App.css';
import Tags from './components/Tags';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from './components/Navigation';
import TagPage from './components/TagPage';
import Groups from './components/Groups';
import Group from './components/Group';


function App() {

  // const [data, setData] = useState<ContextData | null>(null);
  // const [refreshInterval, setRefreshInterval] = useState(15000);

  // function getData() {

  //   //   apiGetData(id)
  //   //     .then(json => {
  //   //       setData({
  //   //         updated: new Date().toLocaleString('fi-FI'),
  //   //         dataPoints: sortByTime(json.Items, 'desc')
  //   //       })
  //   //     })
  // }

  // useEffect(() => {
  //   if (!data) {
  //     getData()
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (refreshInterval && refreshInterval > 0) {
  //     const interval = setInterval(getData, refreshInterval);
  //     return () => clearInterval(interval);
  //   }
  // }, [refreshInterval]);


  return (
    // <DataContext.Provider value={data}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/hallinta">
              <Tags enableSave />
            </Route>
            <Route path="/ryhmat">
              <Groups/>
            </Route>
            <Route path="/ryhma/:name" component={Group}>
            </Route>
            <Route path="/tag/:id" component={TagPage}>
            </Route>
            <Route path="/">
              <Tags />
            </Route>
          </Switch>
          <Navigation />
        </div>
      </Router>

    // </DataContext.Provider>
  );
}

export default App;
