import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddUser from './components/AddUser';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/add-user">
        <AddUser />
      </Route>
      <Route exact path="/add-game">
        <AddGame />
      </Route>
      <Route  path="/edit/:id">
        <EditGame />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

