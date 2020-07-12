import React from 'react';
import './App.css'; 
import Nav from './Nav.js'; 
import OurInitialPage from './OurInitialPage.js';
import SearchResults from './SearchResults.js';
import HeroDetails from './HeroDetails.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  
  return (
    
      <Router>
        <Nav />
        <main>
            <div className="container">
              <Switch>

                <Route exact path="/">
                  <OurInitialPage />
                </Route>

                <Route path="/search/:name">
                  <SearchResults />  
                </Route>

                <Route path="/:id">
                  <HeroDetails />
                </Route>
          
              </Switch>
            </div>
        </main>
      </Router>
    
  );

}


export default App;
