import './App.css';
import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardComponent from '../Dashboard/DashboardComponent';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../Footer/FooterComponent';
import SlaComponent from '../SlaDetails/SlaComponent';
import SloComponent from '../SloDetails/SloComponent';
import SliComponent from '../SliDetails/SliComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <div className="container">
          <DashboardComponent />
            <Switch> 
            <Route path = '/' exact component = {SlaComponent}></Route>
                  <Route path = '/sla' exact component = {SlaComponent}></Route>
                  <Route path = '/slo' exact component = {SloComponent}></Route>
                  <Route path = '/sli' exact component = {SliComponent}></Route>
                  <Route path = '/errorbudget' exact component = {SliComponent}></Route>
            </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
