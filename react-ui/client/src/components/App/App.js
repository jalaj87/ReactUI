import './App.css';
import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardComponent from '../Dashboard/DashboardComponent';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../Footer/FooterComponent';
import SlaComponent from '../SlaDetails/SlaComponent';
import SloComponent from '../SloDetails/SloComponent';
import SliComponent from '../SliDetails/SliComponent';
import ErrorbudgetComponent from '../ErrorbudgetDetails/ErrorbudgetComponent';
import CreateSla from '../SlaDetails/CreateSla';
import CreateSlo from '../SloDetails/CreateSlo';
import CreateErrorBudget from '../ErrorbudgetDetails/CreateErrorBudget';

function App() {
  return (
    <div className="App">
      <Router>
      <DashboardComponent />
        <div className="container mt-2" style={{ marginTop: 40 }}>
          {/* <DashboardComponent /> */}
            <Switch> 
            <Route path = '/' exact component = {SlaComponent}></Route>
                  <Route path = '/sla' exact component = {SlaComponent}></Route>
                  <Route path = '/slo' exact component = {SloComponent}></Route>
                  <Route path = '/sli' exact component = {SliComponent}></Route>
                  <Route path = '/errorbudget' exact component = {ErrorbudgetComponent}></Route>
                  <Route path = '/createSla/:id' component = {CreateSla}></Route>
                  <Route path = '/createSlo/:id' component = {CreateSlo}></Route>
                  <Route path = '/createErrorBudget/:id' component = {CreateErrorBudget}></Route>
            </Switch>
        </div>
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
