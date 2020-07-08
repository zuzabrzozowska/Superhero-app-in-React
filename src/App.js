import React, { useState, useEffect } from 'react';
import './App.css';
import { getHero, getSearchedHeroesByName } from './axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [heroList, setHeroList] = useState([]);
  const [initialHeroesIDs, setInitialHeroesIDs] = useState(['107', '730']); //czy potrzebne?
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState();


  const getInitialHeroes = async () => {
    const heroes = []; //throwaway array
    if(initialHeroesIDs) {
      for (const id of initialHeroesIDs) {
        const data = await getHero(id);
        heroes.push(data);
        setHeroList(heroes);
        if (data.error) {
          setErrorMsg(data.error)
          return;
        }
      }
    }
    setLoading(false);
  }
  
  useEffect(() => {
    getInitialHeroes();
  }, [])

  const updateHeroInput = event => {
    const value = event.target.value;
    setInputValue(value);
    
    setTimeout(() => {
      getSearchedHeroesByName(inputValue).then(response => {
        let res = response.data.results;
        if (res) {
          res = res.filter(item => {return (item.appearance.gender === "Female") });
          setResults(res);
        } 
      })
    }, 2000)
  }

  const findHeroInput = event => {
    event.preventDefault();

    if (inputValue && results) {
//dać to w return na dole
      results.map(item => {
        return (
          getSearchedHeroesByName(item).then(response => {
            console.log(results); //--> prawidłowa tablica kilku obiektów
            console.log(response.data); //--> error: not found
          })
        );
      })
      document.getElementById('form').reset();  
    }
  }

  return (
    <>
      <Router>
        <nav>
            <div className="container container__nav">
              <Link to="/">
                <p className="app-logo">superhero<span className="underline">ine</span><br/>database logo</p>
              </Link>
              <form id="form">
                <input onChange={updateHeroInput} type="text" value={inputValue}></input>
                <Link to={`/search/${inputValue}`}>
                  <button onClick={findHeroInput}>find heroes</button>
                </Link>
                <div className="results-box">
                  { errorMsg && <p>{errorMsg}</p>}
                  { results && <div>{results.map(item => <p>{item.name}</p>)}</div> }
                </div>
              </form>
            </div>
        </nav>
        {isLoading && <h1 className="about-hero__maintitle">...</h1>}
        {!isLoading && <main>
            <div className="container">

              <Switch>

                <Route exact path="/">
                  <h1 className="about-hero__maintitle">featured heroines</h1>
                  <div className="container__heroes">
                    {
                      heroList.map(hero => {
                        const {id, name} = hero.data;
                        return (
                          <div className="about-hero" key={id}>
                            <p className="about-hero__title">{name}</p>
                            <img className="about-hero__img" src={hero.data.image.url} alt="hero"></img>
                            <p className="about-hero__title">{hero.data.biography.alignment}</p>
                            <p>{hero.data.biography["full-name"]}, {hero.data.biography["alter-egos"]}</p>
                            <p>intelligence: {hero.data.powerstats.intelligence}</p>
                            <p>occupation: {hero.data.work.occupation}</p>
                          </div>
                        );
                      })
                    }
                  </div>
                </Route>
                <Route path="/search/:name">
                    <h1>TEST</h1>
                </Route>

                <Route path="/search/:id">
                </Route>
          
              </Switch>
            </div>
        </main>}
      </Router>
    </>  
  );

}


export default App;
