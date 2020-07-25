import React from 'react';
import './reset.css'; import './App.css'; 
import LandingPage from './LandingPage.js';
import Settings from './Settings.js';
import SearchResults from './SearchResults.js';
import HeroDetails from './HeroDetails.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  
  return (
    
      <Router>
        <main>
            <div className="container">
              <Switch>

                <Route exact path="/">
                  <LandingPage />
                </Route>

                <Route path="/settings">
                  <Settings />
                </Route>

                <Route path="/search/:name">
                  <SearchResults />  
                </Route>

                <Route path="/:id/:name">
                  <HeroDetails />
                </Route>
          
              </Switch>
            </div>
        </main>
      </Router>
    
  );

}


export default App;
