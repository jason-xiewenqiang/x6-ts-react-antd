import React from "react";
import Login from "./Login";
import Home from "./Home";
import Person from "./Person";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { useSelector } from 'react-redux';

const App = () => {
  const isLogin = useSelector((state: any) => state.login.isLogin);
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => isLogin ? <Redirect to="/home" /> : <Login/>}></Route>
        <Route path="/home" render={() => isLogin ? <Home/> : <Redirect to="/login" />}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/person" component={Person}></Route>
      </Router>
    </div>
  );
}

export default App;
