import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import New from "./Components/New";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}
