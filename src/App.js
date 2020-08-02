import React, {useState} from 'react';
import './reset.css'; import './App.css'; 
import Nav from './components/Nav/Nav.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import Settings from './components/Settings/Settings.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import HeroDetails from './components/HeroDetails/HeroDetails.js';
//import SettingsUser from './components/SettingsUser/SettingsUser.js';
import Favourites from './components/Favourites/Favourites.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getHeroAppearance } from './requests.js';

function App() {
  //const [favIDs, setFavIDs] = useState([]);
  //const [favHeroes, setFavHeroes] = useState([]);
    let favIDs = [];
    let favHeroes = [];

  const addHeroToFav = event => {
    favIDs = [];
    const {id} = event.target.dataset;
    
    favIDs.push(id);
    
    const fetchHeroes = async () => {
      for (const id of favIDs) {
        const data = await getHeroAppearance(id);
        favHeroes.push(data);
      }
    }
    fetchHeroes();
  }

  

  return (
    <>
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
                <Route path="/search/g/:gender/r/:race/maxHeight:height">
                  <SearchResults addHeroToFav={addHeroToFav} />  
                </Route>
                <Route path="/:id/:name">
                  <HeroDetails />
                </Route>
                <Route path="/favourites">
                  <Favourites favHeroes={favHeroes}/>
                </Route>
                {/*<Route path="/user">
                 // <SettingsUser />
                </Route>*/}
              </Switch>
            </div>
            <Nav/>
        </main>
      </Router>
    </>
  );
}

export default App;
