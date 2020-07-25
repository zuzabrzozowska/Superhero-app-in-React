import React, { useState } from 'react';
import { getHeroAppearence } from './requests';
import { Link } from 'react-router-dom';

function Nav() {
  const [results, setResults] = useState([]); //niepotrzebne tu?
  const [errorText, setErrorText] = useState(''); 
  const [loading, setLoading] = useState(true); //niepotrzebne?
  const [allHeroesIDs, setAllHeroesIDs] = useState([]); //niepotrzebne?
  const [btnType, setBtnType] = useState('');
  const [btnText, setBtnText] = useState('');
    
  const filterHeroes = event => {
    setBtnType(event.target.dataset.type);
    setBtnText(event.target.innerText);

    //how to get this out of this function?
    let ids = [];
    for (let i = 1; i <= 10; i++) {
      ids.push(i);
    }
    setAllHeroesIDs(ids);

    let objectArray = [];

    ids.forEach(id => {
      getHeroAppearence(id).then(data => {
        if (data.error) {
          setErrorText(data.error);
          return;
        }
        objectArray.push(data);
        if (btnText !== 'All' && btnText !== 'Other') {
          objectArray = objectArray.filter(item => {return (item[`${btnType}`] === `${btnText}`) });
        } else if (btnText === 'Other') {
          objectArray = objectArray.filter(item => 
            { return (
              item[`${btnType}`] !== 'Human' 
              && item[`${btnType}`] !== 'Alien' 
              && item[`${btnType}`] !== 'Mutant') 
            });
        }
      }) 
    })
    setTimeout(() => {
      setResults(objectArray);
    }, 5000)
    setLoading(false);
  }
  
    return (
        <nav>
            <div className="container container__nav">
              <h1 className="about-hero__title">Search Settings</h1>

                <label>I'm looking for</label>
                <div className="settings__btn-box">
                  <button data-type="gender" onClick={filterHeroes}>Female</button>
                  <button data-type="gender" onClick={filterHeroes}>Male</button>
                  <button data-type="gender" onClick={filterHeroes}>All</button>
                </div>
            
                <label>Race</label>
                <div className="settings__btn-box">
                  <button data-type="race" onClick={filterHeroes}>Human</button>
                  <button data-type="race" onClick={filterHeroes}>Alien</button>
                  <button data-type="race" onClick={filterHeroes}>Mutant</button>
                  <button data-type="race" onClick={filterHeroes}>Other</button>
                  <button data-type="race" onClick={filterHeroes}>All</button>
                </div>
           
                

                <label>Height (cm)</label><input type="range" min="150" max="250" name="height"></input>

                <Link to={`/search/${btnType}/${btnText}`}><button>Save</button></Link>
              
            </div>

            <Link to="/" className="link link-homepage"><i className="icon-homepage fas fa-arrow-circle-left"></i></Link>
        </nav>
    )
}

export default Nav;
