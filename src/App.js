import React from "react"
import Login from "./components/Login/Login"
import "./App.css"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DashBoard } from "./components/DashBoard/DashBoard"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { Categories } from "./components/DashBoard/pages/Categories/Categories"
import { Items } from "./components/DashBoard/pages/Categories/Items"
import { Details } from "./components/DashBoard/pages/Details/Details"
import { Orders } from "./components/DashBoard/pages/Orders/Orders"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard' component={DashBoard} />
        <PrivateRoute
          exact
          path='/dashboard/categories'
          component={Categories}
        />
        <PrivateRoute
          exact
          path='/dashboard/categories/:categoryName'
          component={Items}
        />
        <PrivateRoute exact path='/details/:pageName' component={Details} />
        <PrivateRoute exact path='/dashboard/:orderType' component={Orders} />
        
      </Switch>
    </Router>
  )
}

export default App
