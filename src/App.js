import React from 'react';
import './reset.css'; import './App.css'; 
import LandingPage from './components/LandingPage/LandingPage.js';
import Settings from './components/Settings/Settings.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import HeroDetails from './components/HeroDetails/HeroDetails.js';
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

                <Route exact path="/settings">
                  <Settings />
                </Route>

                <Route path="/settings/search/g/:gender/r/:race">
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
