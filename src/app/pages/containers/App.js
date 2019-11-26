import React from "react";
import { Route, Switch } from "react-router-dom";

import "../style/App.scss";

/**
 * Components & Containers
 */
import Home from "./Home";
import Navbar from "../../components/Navbar";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
