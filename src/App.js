import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
const ENDPOINT = "http://localhost:4001";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/teachers"><Teachers/></Route>
        <Route path="/students"><Students/></Route>
        <Route path="/"><Students/></Route>
      </Switch>
    </Router>
  );
}

export default App;
