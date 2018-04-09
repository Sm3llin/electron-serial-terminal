import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import App from './components/App';
import HelloApp from './components/HelloApp';
import PageNotFound from "./components/PageNotFound";

import "bootstrap/dist/css/bootstrap.css";

const pageTitle = require('electron').remote.app.getName();

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <App title={pageTitle}/>}/>
        <Route exact path='/hello' render={() => <HelloApp title={pageTitle}/>}/>
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
), document.getElementById('app'));

