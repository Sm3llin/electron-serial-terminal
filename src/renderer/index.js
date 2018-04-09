import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import HelloApp from './components/HelloApp';
import PageNotFound from "./components/PageNotFound";

import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/hello' component={HelloApp}/>
        <Route component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
), document.getElementById('app'));

