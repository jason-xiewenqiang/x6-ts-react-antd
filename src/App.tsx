import React from "react";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;
