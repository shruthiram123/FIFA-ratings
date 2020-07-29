import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main'


class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <Switch>            
          <Route path="/" component={Main}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
