import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Edit from './Edit'
import Home from './Home';

export class Main extends Component {
    render() {
        return (
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Edit/:id" component={Edit}/>
          </Switch>  
        );
    }
}

export default Main