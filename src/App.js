import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/' className="logo">
              <img src={require('./images/bloc_jams_logo.png')} alt="blocjams logo" width="70"/>
            </Link>
            <Link to='/library' className="library">
              <img src={require("./images/library_icon.png")} alt="library_icon" width="50" />
            </Link>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/Library" component={Library} />
          <Route path="/Album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
