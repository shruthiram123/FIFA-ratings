import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Edit from './Edit'
import Add from './Add'
import Home from './Home';

export class Main extends Component {
    render() {
        return (
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Edit/:id" component={Edit}/>
              <Route exact path="/Add" component={Add}/>
          </Switch>  
        );
    }
}

export default Main