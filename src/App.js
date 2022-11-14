import React from 'react';
import './App.css';
import { Submit_Page } from './Submit_Page.jsx';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Anotherpage } from './Another-page';
import { Loginpage } from './Loginpage';
import { Createaccount } from './Create-account';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Loginpage />
          <Createaccount />
        </Route>
        <Route exact path="/home" component={Submit_Page} />
        <Route exact path="/detail" component={Anotherpage} />
      </Switch>
    </>
  );
}

export default App;
