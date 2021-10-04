import React from "react";
import Login from "./components/Login/Login";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
      </Switch>
    </Router>
  );
};

export default App;
