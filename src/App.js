import React, { useState, useEffect } from 'react';
import './App.css';
import { getHero } from './axios';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [heroList, setHeroList] = useState([]);
  const [myHeroesID, setMyHeroesID] = useState([]);
  const [inputValue, setInputValue] = useState('5');

  const fetchHeroes = () => {
    getHero(inputValue).then(response => {
      console.log(response.data);
      //setMyHeroesID(response.data);
      console.log(myHeroesID);
      setLoading(false);
    })
  }

  const getHeroByName = async () => {
    const heroes = []; //throwaway array
    
    for (const id of myHeroesID) {
      const data = await getHero(id);
      heroes.push(data);
      setHeroList(heroes);
    }
    setLoading(false);
  }
  
  const updateHeroInput = event => {
    const value = event.target.value;
    setInputValue(value);
  }

  const findHeroInput = event => {
    event.preventDefault();
    if (inputValue) {
      myHeroesID.push(Math.floor(inputValue));
    }
    if (myHeroesID.length > 3) { 
      myHeroesID.shift([0])
    }

    getHeroByName();
    document.getElementById('form').reset();
  }

  const deleteHero = id => {
    const myHeroes = heroList.filter(item => {
      return (item.data.id !== id);
    })
    setHeroList(myHeroes);
    const heroesIDs = myHeroesID.filter(item => {
      return (item !== Math.floor(id));
    })
    setMyHeroesID(heroesIDs);
  }
  
  useEffect(() => {
    fetchHeroes();
  }, [])

  useEffect(() => {
    fetchHeroes();
  }, [myHeroesID])


  return (
    <>
      <nav>
          <div className="container container__nav">
            <span>superhero app</span>
            <form id="form">
              <input onChange={updateHeroInput} type="text"></input>
              <button onClick={findHeroInput}>find hero by ID</button>
            </form>
          </div>
      </nav>
      <main>
          <div className="container">
            <h1 className="about-hero__maintitle">featured heroes</h1>
            <div className="container__heroes">
              {
                heroList.map(hero => {
                  return (
                    <div className="about-hero" key={hero.data.id}>
                      <button onClick={() => deleteHero(hero.data.id)} className="delete">&times;</button>
                      
                      <p className="about-hero__title">{hero.data.name}</p>
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
          </div>
      </main>
    </>  
  );

}

export default App;
