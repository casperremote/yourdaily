import React from "react";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "../utils/isAuthenticated";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            />
          )
        }
      />
    )
  }
  